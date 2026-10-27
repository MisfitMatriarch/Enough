// Exercise the installed SDK, with an injected transport and synthetic data only.
// No network client or Netlify environment credentials are used.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { makeReservationHandler } from '../netlify/lib/reservations.mjs';

const settings = JSON.parse(readFileSync(new URL('../content/expo.json', import.meta.url)));
const payload = () => ({ requestId: randomUUID(), name: 'SYNTHETIC SDK TEST', email: 'sdk-test@example.invalid', titles: ['free-2b-me'], marketingConsent: false, source: 'direct', website: '' });
const request = body => new Request('https://draft.example.invalid/api/expo-reservations', { method: 'POST', headers: { origin: 'https://draft.example.invalid', 'content-type': 'application/json' }, body: JSON.stringify(body) });

function fixture(failures = {}) {
  const values = new Map(), calls = [];
  const fetch = async (input, options) => {
    const url = new URL(input), headers = new Headers(options.headers);
    assert.equal(url.origin, 'https://blobs.example.invalid');
    assert.ok(url.pathname.startsWith('/synthetic-site/'));
    calls.push({ method: options.method, key: url.pathname, conditional: headers.get('if-none-match') });
    if (options.method === 'get') {
      if (failures.failedRead) return new Response(null, { status: 403 });
      return values.has(url.pathname) ? Response.json(values.get(url.pathname)) : new Response(null, { status: 404 });
    }
    assert.equal(options.method, 'put');
    assert.equal(headers.get('content-type'), 'application/json');
    assert.equal(headers.get('if-none-match'), '*', 'conditional create must reach the actual SDK transport');
    if (failures.failedWrite === true || (failures.failedWrite && url.pathname.includes(`synthetic-${failures.failedWrite}/`))) return new Response(null, { status: 403 });
    if (values.has(url.pathname)) return new Response(null, { status: 412 });
    values.set(url.pathname, JSON.parse(options.body));
    return new Response(null, { status: 200, headers: { etag: 'synthetic-etag' } });
  };
  const store = name => getStore({ name: `synthetic-${name}`, siteID: 'synthetic-site', token: 'synthetic-not-a-credential', consistency: 'strong', edgeURL: 'https://blobs.example.invalid', uncachedEdgeURL: 'https://blobs.example.invalid', fetch });
  const reservations = store('reservations'), consents = store('consents');
  return { values, calls, reservations, handler: makeReservationHandler({ settings, getStores: () => ({ reservations, consents }) }) };
}

test('installed SDK preserves JSON reads and atomic conditional writes', async () => {
  const { reservations, values } = fixture();
  assert.equal(await reservations.get('test-key', { type: 'json' }), null);
  assert.deepEqual(await reservations.setJSON('test-key', { synthetic: 1 }, { onlyIfNew: true }), { modified: true, etag: 'synthetic-etag' });
  assert.deepEqual(await reservations.setJSON('test-key', { synthetic: 2 }, { onlyIfNew: true }), { modified: false });
  assert.deepEqual(await reservations.get('test-key', { type: 'json' }), { synthetic: 1 });
  assert.equal(values.size, 1);
});

test('installed SDK supports concurrent reservation retries and rejects conflicting request IDs', async () => {
  const { handler, values } = fixture(), body = payload();
  const replies = await Promise.all([handler(request(body)), handler(request(body)), handler(request(body))]);
  assert.ok(replies.every(reply => reply.status === 200));
  assert.equal(values.size, 2, 'one reservation plus one separate consent');
  assert.equal((await handler(request({ ...body, email: 'different@example.invalid' }))).status, 409);
  assert.equal(values.size, 2);
});

test('installed SDK read failures cannot report a saved reservation', async () => {
  const { handler, values } = fixture({ failedRead: true });
  const response = await handler(request(payload()));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).saved, undefined);
  assert.equal(values.size, 0);
});

test('installed SDK rejected reservation writes cannot report a saved reservation', async () => {
  const { handler, values } = fixture({ failedWrite: 'reservations' });
  const response = await handler(request(payload()));
  assert.equal([...values.keys()].filter(key => key.includes('synthetic-reservations/')).length, 0);
  assert.equal(response.status, 503, 'a storage rejection must not be reported as saved');
  assert.equal((await response.json()).saved, undefined);
});

test('installed SDK rejected consent writes cannot report success', async () => {
  const { handler, values } = fixture({ failedWrite: 'consents' });
  const response = await handler(request(payload()));
  assert.equal(values.size, 1, 'only the synthetic reservation was saved');
  assert.equal(response.status, 503);
  assert.equal((await response.json()).saved, undefined);
});

test('retry repairs a rejected consent write without duplicating the reservation', async () => {
  const failures = { failedWrite: 'consents' };
  const { handler, values } = fixture(failures), body = payload();
  assert.equal((await handler(request(body))).status, 503);
  failures.failedWrite = false;
  assert.equal((await handler(request(body))).status, 200);
  assert.equal(values.size, 2);
});
