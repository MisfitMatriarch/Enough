import { createHash } from 'node:crypto';

const reply = (status, data) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
const digest = value => createHash('sha256').update(value).digest('hex');
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function makeReservationHandler({ settings, getStores, now = () => new Date() }) {
  return async function handle(request, context = {}) {
    if (request.method !== 'POST') return reply(405, { error: 'Use the reservation form to submit your selection.' });
    if (!settings.features.reservationsEnabled) return reply(503, { error: 'Reservations are temporarily unavailable. Please contact Tanya.' });
    const origin = new URL(request.url).origin;
    if (request.headers.get('origin') !== origin) return reply(403, { error: 'Please submit your reservation from this website.' });
    if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, { error: 'Please use the reservation form.' });
    const declaredSize = Number(request.headers.get('content-length') || 0);
    if (declaredSize > 8192) return reply(413, { error: 'The reservation is too large.' });
    let input;
    try {
      // Bound the actual stream too; Content-Length cannot be trusted.
      const reader = request.body?.getReader();
      if (!reader) return reply(400, { error: 'Please complete the reservation form.' });
      let size = 0;
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 8192) { await reader.cancel(); return reply(413, { error: 'The reservation is too large.' }); }
        chunks.push(value);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return reply(400, { error: 'Please check the reservation form and try again.' }); }
    if (!input || typeof input !== 'object' || Array.isArray(input)) return reply(400, { error: 'Please check the reservation form.' });
    if (input.website) return reply(400, { error: 'Please try again or contact Tanya.' });
    const approved = new Map(settings.books.filter(book => book.approved).map(book => [book.id, book]));
    const ids = input.titles;
    const name = typeof input.name === 'string' ? input.name.trim() : '';
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    if (!uuid.test(input.requestId || '') || !name || name.length > 120 || /[\r\n\x00-\x1f]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !Array.isArray(ids) || !ids.length || ids.length > approved.size || new Set(ids).size !== ids.length || ids.some(id => !approved.has(id)) || typeof input.marketingConsent !== 'boolean') {
      return reply(400, { error: 'Enter your name, a valid email and at least one available book.' });
    }
    const titleIds = [...ids].sort();
    const source = ['photo-card', 'takeaway', 'stage', 'direct'].includes(input.source) ? input.source : 'direct';
    const payload = { name, email, titleIds, source, marketingConsent: input.marketingConsent, termsVersion: settings.reservationTermsVersion, consentVersion: settings.marketingConsentVersion };
    const fingerprint = digest(JSON.stringify(payload));
    const id = input.requestId.toLowerCase();
    try {
      const { reservations, consents } = getStores(context);
      const key = `reservation/${id}`;
      const existing = await reservations.get(key, { type: 'json' });
      if (existing && existing.fingerprint !== fingerprint) return reply(409, { error: 'This request has already been used for a different reservation. Start a new reservation.' });
      if (!existing) {
        const record = { id, name, email, titleIds, source, status: 'reserved', createdAt: now().toISOString(), termsVersion: settings.reservationTermsVersion, fingerprint };
        const result = await reservations.setJSON(key, record, { onlyIfNew: true });
        if (!result.modified) {
          const concurrent = await reservations.get(key, { type: 'json' });
          if (!concurrent || concurrent.fingerprint !== fingerprint) return reply(409, { error: 'This request has already been used for a different reservation. Start a new reservation.' });
        }
      }
      // Retry completes this separate consent write if it failed after the reservation saved.
      await consents.setJSON(`consent/${id}`, { reservationId: id, optedIn: input.marketingConsent, wording: settings.marketingConsentWording, version: settings.marketingConsentVersion, recordedAt: now().toISOString() }, { onlyIfNew: true });
      return reply(200, { saved: true, reservationId: id, titles: titleIds.map(bookId => approved.get(bookId).title) });
    } catch {
      // Do not log contact details or raw storage errors.
      return reply(503, { error: 'We could not confirm your reservation. Your details are still here. Please retry using this form or contact Tanya.' });
    }
  };
}
