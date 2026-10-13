(() => {
  'use strict';
  const track = (name, details = {}) => {
    // No vendor is installed by this page. An existing analytics adapter may consume these events.
    document.dispatchEvent(new CustomEvent('f2bm:analytics', { detail: { event: name, ...details } }));
  };
  track('expo_page_view');
  document.querySelectorAll('[data-track]').forEach(link => link.addEventListener('click', () => track(link.dataset.track, link.dataset.businessId ? { businessId: link.dataset.businessId } : {})));
  document.querySelectorAll('[data-event-only]').forEach(element => { if (Date.now() > Date.parse(element.dataset.eventEnd)) element.hidden = true; });
  const print = document.getElementById('print-reflection');
  if (print) { print.hidden = false; print.addEventListener('click', () => window.print()); }
  const form = document.getElementById('reservation');
  if (!form || !globalThis.crypto?.randomUUID) return;
  form.hidden = false;
  const choices = [...document.querySelectorAll('input[name="titles"]')];
  const error = document.getElementById('reservation-error');
  const success = document.getElementById('reservation-success');
  const submit = form.querySelector('button[type="submit"]');
  let requestId = null;
  let lastPayload = null;
  let submitting = false;
  function summary() {
    const selected = choices.filter(input => input.checked);
    document.getElementById('selection-summary').textContent = selected.length ? `${selected.length} ${selected.length === 1 ? 'title selected' : 'titles selected'}. No payment now.` : 'Choose your titles above.';
  }
  choices.forEach(input => input.addEventListener('change', summary));
  const params = new URLSearchParams(location.search);
  const chosen = choices.find(input => input.value === params.get('book'));
  if (chosen) chosen.checked = true;
  const sources = ['photo-card', 'takeaway', 'stage'];
  const source = sources.includes(params.get('source')) ? params.get('source') : 'direct';
  summary();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting) return;
    error.hidden = true;
    const titles = choices.filter(input => input.checked).map(input => input.value).sort();
    if (!titles.length) { error.textContent = 'Please choose at least one book above.'; error.hidden = false; choices[0]?.focus(); return; }
    if (!form.reportValidity()) return;
    const body = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), titles, source, marketingConsent: form.elements['marketing-consent'].checked, website: form.elements.website.value };
    const snapshot = JSON.stringify(body);
    if (snapshot !== lastPayload) { requestId = crypto.randomUUID(); lastPayload = snapshot; }
    submitting = true;
    submit.disabled = true;
    submit.textContent = 'Saving your reservation…';
    try {
      const response = await fetch('/api/expo-reservations', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ ...body, requestId }), signal: AbortSignal.timeout(20000) });
      let data;
      try { data = await response.json(); } catch { throw new Error(response.status === 429 ? 'Please wait a minute before retrying.' : 'We could not confirm your reservation. Please retry or contact Tanya.'); }
      if (!response.ok || data.saved !== true || !Array.isArray(data.titles)) throw new Error(data.error || 'We could not confirm your reservation. Please retry or contact Tanya.');
      success.textContent = `Your reservation is saved for: ${data.titles.join(', ')}. No payment has been taken. We will contact you about these books when they launch. To change or cancel, contact Tanya using the email below.`;
      success.hidden = false;
      form.hidden = true;
      choices.forEach(input => { input.disabled = true; });
      success.focus();
      track('reservation_success', { titleIds: titles });
      // Personal details live only in this page's memory until submitted, then clear the form.
      form.reset();
    } catch (failure) {
      error.textContent = failure.name === 'TimeoutError' ? 'We could not confirm whether your reservation saved. Please retry using this form; the same request will not create a duplicate.' : failure.message;
      error.hidden = false;
    } finally {
      submitting = false;
      submit.disabled = false;
      submit.textContent = 'Reserve my selected books';
    }
  });
})();
