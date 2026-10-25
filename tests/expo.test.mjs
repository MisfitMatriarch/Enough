import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { makeReservationHandler } from '../netlify/lib/reservations.mjs';
import { renderPage } from '../scripts/build-expo.mjs';
const settings = JSON.parse(readFileSync(new URL('../content/expo.json', import.meta.url)));

function store() {
  const values = new Map();
  return { values, get: async key => values.get(key) || null, async setJSON(key, value, options) { if (options.onlyIfNew && values.has(key)) return { modified:false }; values.set(key,value); return { modified:true }; } };
}
function setup(custom = settings) {
  const reservations = store(), consents = store();
  return { reservations, consents, handler:makeReservationHandler({settings:custom,getStores:() => ({reservations,consents})}) };
}
const payload = () => ({ requestId:randomUUID(), name:'TEST Person', email:'test@example.invalid', titles:['free-2b-me','you-make-sense'], marketingConsent:false, source:'stage', website:'' });
const req = (body, extra = {}) => new Request('https://free2bme.global/api/expo-reservations', { method:'POST', headers:{origin:'https://free2bme.global','content-type':'application/json',...extra},body:JSON.stringify(body) });

test('multiple books reserve without payment or marketing consent, with separate consent storage',async()=>{
  const {handler,reservations,consents}=setup(); const body=payload(); const response=await handler(req(body));
  assert.equal(response.status,200); const result=await response.json(); assert.equal(result.saved,true); assert.equal(result.titles.length,2);
  const record=[...reservations.values.values()][0]; assert.deepEqual(record.titleIds,['free-2b-me','you-make-sense']); assert.equal(record.marketingConsent,undefined); assert.equal([...consents.values.values()][0].optedIn,false); assert.equal(record.payment,undefined);
});
test('same request retried or submitted concurrently creates one reservation',async()=>{
  const {handler,reservations}=setup(); const body=payload(); const replies=await Promise.all([handler(req(body)),handler(req(body)),handler(req(body))]);
  assert.ok(replies.every(r=>r.status===200)); assert.equal(reservations.values.size,1);
});
test('reusing request ID with different data is rejected',async()=>{
  const {handler,reservations}=setup(); const body=payload(); await handler(req(body));
  assert.equal((await handler(req({...body,email:'changed@example.invalid'}))).status,409); assert.equal(reservations.values.size,1);
});
test('a storage failure never returns success',async()=>{
  const handler=makeReservationHandler({settings,getStores:()=>{throw new Error('private storage unavailable');}});
  const response=await handler(req(payload())); assert.equal(response.status,503); assert.equal((await response.json()).saved,undefined);
});
test('consent failure is repaired on retry without duplicating a saved reservation',async()=>{
  const {handler,reservations,consents}=setup(); const original=consents.setJSON; const body=payload();
  consents.setJSON=async()=>{throw new Error('temporary');}; assert.equal((await handler(req(body))).status,503); assert.equal(reservations.values.size,1);
  consents.setJSON=original; assert.equal((await handler(req(body))).status,200); assert.equal(reservations.values.size,1); assert.equal(consents.values.size,1);
});
test('unknown, duplicate or empty titles and invalid contact data are rejected',async()=>{
  const {handler,reservations}=setup();
  for(const change of [{titles:[]},{titles:['not-a-book']},{titles:['free-2b-me','free-2b-me']},{email:'invalid'},{name:''},{marketingConsent:'yes'},{requestId:'invalid'}]) assert.equal((await handler(req({...payload(),...change}))).status,400);
  assert.equal(reservations.values.size,0);
});
test('unapproved titles and disabled reservations cannot bypass server configuration',async()=>{
  const custom=structuredClone(settings);custom.books[0].approved=false;const {handler}=setup(custom);
  assert.equal((await handler(req(payload()))).status,400);custom.features.reservationsEnabled=false;assert.equal((await handler(req(payload()))).status,503);
});
test('reads and cross-origin submissions expose no reservation data',async()=>{
  const {handler}=setup();assert.equal((await handler(new Request('https://free2bme.global/api/expo-reservations'))).status,405);
  assert.equal((await handler(req(payload(),{origin:'https://unrelated.example'}))).status,403);
});
test('body size and honeypot checks reject abuse',async()=>{
  const {handler}=setup(); assert.equal((await handler(req({...payload(),website:'bot'}))).status,400);
  assert.equal((await handler(req({...payload(),name:'x'.repeat(10000)}))).status,413);
});
test('PDF and founder links are absent until approved; future offers are absent',()=>{
  const html=renderPage(settings);assert.ok(!html.includes(settings.reflection.url));assert.ok(!html.includes('id="businesses"'));assert.ok(!html.includes('My FREE 2B ME Plan'));assert.ok(!html.includes('checkout'));assert.ok(!html.includes('type="checkbox" name="marketing-consent" checked'));
  const custom=structuredClone(settings);custom.reflection.approved=true;const approved=renderPage(custom,{pdfSize:2000});assert.ok(approved.includes('download data-track="pdf_link_click"'));assert.ok(approved.includes('2 KB'));
});

test('internal documents and review material never reach the published build',async()=>{
  const { build, findInternalFiles } = await import('../scripts/build-expo.mjs');
  const { mkdtempSync, mkdirSync, writeFileSync, existsSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const planted = mkdtempSync(join(tmpdir(),'f2bm-dist-'));
  mkdirSync(join(planted,'docs')); mkdirSync(join(planted,'assets'));
  writeFileSync(join(planted,'assets','notes.md'),'x'); writeFileSync(join(planted,'assets','ok.css'),'x');
  assert.deepEqual(findInternalFiles(planted).sort(),['assets/notes.md','docs/']);
  build(settings);
  const dist = new URL('../dist/', import.meta.url).pathname;
  assert.deepEqual(findInternalFiles(dist),[]);
  for (const dir of ['docs','review','private-exports','footage','scripts','tests','content','netlify']) assert.equal(existsSync(join(dist,dir)),false,dir);
  assert.equal(existsSync(join(dist,'stay-connected','index.html')),true);
});
