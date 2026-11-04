import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
test('professional gateway retains the existing external application, proposal and referral routes', () => {
  const page = read('for-your-work/index.html');
  for (const route of ['therapist-collaboration', 'therapist-practice', 'therapist-practice-enquiry', 'referral']) {
    assert.ok(page.includes(`href="https://free2bme.au/${route}"`), route);
  }
  for (const pdf of ['therapist-collaboration-proposal.pdf?v=20261103-funding', 'therapist-practice-proposal.pdf?v=20261104-evidence']) {
    assert.ok(page.includes(`https://free2bme.au/assets/proposals/${pdf}`));
  }
  assert.doesNotMatch(page, /<form\b|supabase\.co/);
  assert.match(page, /https:\/\/free2bme\.global\/for-your-work\//);
});
test('domain redirects preserve paths and avoid redirecting the canonical domain to itself or Tanya', () => {
  const rules = read('_redirects').split('\n').filter(line => /^https?:/.test(line)).map(line => line.trim().split(/\s+/));
  for (const protocol of ['http', 'https']) for (const host of ['tanyahicks.com', 'www.tanyahicks.com']) {
    assert.ok(rules.some(([from, to, status]) => from === `${protocol}://${host}/*` && to === 'https://free2bme.global/:splat' && status === '301!'));
  }
  assert.ok(!rules.some(([from]) => from === 'https://free2bme.global/*'));
  assert.ok(!rules.some(([,to]) => to.includes('tanyahicks.com')));
});
