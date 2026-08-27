#!/usr/bin/env node
// Book 1 identity guard - tanyahicks.com
//
// Locked 2026-08-27. Book 1 is FREE 2B ME: Less fixing. More living., canonical at
// /books/free-2b-me/, paired with Access Before Intervention.
//
// The repeated identity is DELIBERATE: the ecosystem is FREE 2B ME, the foundational
// book is FREE 2B ME, and the book carries the ecosystem's master promise as its
// subtitle. This guard exists partly to stop someone "tidying" that repetition away by
// renaming one of them.
//
// Historical references stay legal where their historical status is unmistakable, so
// the preserved source page and explicit provenance lines are exempt by path/context.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const TITLE = 'FREE 2B ME';
const SUBTITLE = 'Less fixing. More living.';
const ROUTE = '/books/free-2b-me/';
const COMPANION = 'Access Before Intervention';

// Preserved historical source - redirects publicly, kept for provenance.
const EXEMPT_PATHS = ['books/it-shouldnt-be-this-hard/', 'preview-v2.html', 'preview-restructured.html', 'preview-v2.html.bak'];
// Lines that are unmistakably historical are allowed to name retired titles.
const HISTORICAL_MARKERS = ['Historical source titles', 'historical_source_titles', 'source_reservoirs', 'ENOUGH is now', 'Related pairs'];

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules' || name === 'assets') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(html|xml|json)$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(ROOT);

for (const abs of files) {
  const rel = relative(ROOT, abs);
  if (EXEMPT_PATHS.some(e => rel.startsWith(e) || rel === e)) continue;
  const text = readFileSync(abs, 'utf8');

  // JSON registers are checked structurally below, not by line. Pretty-printed provenance
  // arrays put each retired title on its own line with no marker beside it, so a line scan
  // cannot tell a historical record from current copy here.
  if (rel.endsWith('.json')) continue;

  text.split('\n').forEach((line, i) => {
    if (HISTORICAL_MARKERS.some(m => line.includes(m))) return;
    const at = `${rel}:${i + 1}`;
    if (/Book 1\s*[—-]\s*title (forthcoming|unresolved)/i.test(line)) fail(at, 'retired Book 1 placeholder appears as current copy');
    if (/be this hard/i.test(line)) fail(at, 'retired title "It Shouldn\'t Be This Hard" appears as current copy');
    if (/books\/it-shouldnt-be-this-hard/.test(line) && !/301|redirect/i.test(line)) fail(at, 'link points at the historical Book 1 route');
  });
}

// The register is the governing projection - check it explicitly.
const books = JSON.parse(readFileSync(join(ROOT, 'data/books.json'), 'utf8'));
const p1 = books.pairs?.[0];
if (p1?.person?.title !== TITLE) fail('data/books.json', `Book 1 title must be "${TITLE}", found "${p1?.person?.title}"`);
if (p1?.person?.subtitle !== SUBTITLE) fail('data/books.json', `Book 1 subtitle must be "${SUBTITLE}", found "${p1?.person?.subtitle}"`);
if (p1?.person?.slug !== 'free-2b-me') fail('data/books.json', `Book 1 slug must be "free-2b-me", found "${p1?.person?.slug}"`);
if (p1?.practice?.title !== COMPANION.toUpperCase() && p1?.practice?.title !== COMPANION) fail('data/books.json', `foundational companion must be "${COMPANION}"`);
if (books.library?.shared_promise !== SUBTITLE) fail('data/books.json', `master promise must be "${SUBTITLE}" - do not alter it to avoid matching the book subtitle`);
if ((p1?.person?.historical_source_titles || []).length === 0) fail('data/books.json', 'historical titles must be recorded separately from current title fields');

// Retired titles are permitted ONLY in the provenance fields - never in current copy.
const PROVENANCE_FIELDS = new Set(['historical_source_titles', 'source_reservoirs', 'anthology_sources']);
(function scanCurrent(node, path) {
  if (typeof node === 'string') {
    if (/be this hard/i.test(node)) fail('data/books.json', `retired title appears in current field "${path}"`);
    return;
  }
  if (Array.isArray(node)) return node.forEach((v, i) => scanCurrent(v, `${path}[${i}]`));
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (PROVENANCE_FIELDS.has(k)) continue;
      scanCurrent(v, path ? `${path}.${k}` : k);
    }
  }
})(books, '');

// The canonical page must exist, carry the subtitle, and self-canonicalise.
const bookPage = readFileSync(join(ROOT, 'books/free-2b-me/index.html'), 'utf8');
if (!bookPage.includes(SUBTITLE)) fail('books/free-2b-me/index.html', 'canonical Book 1 page is missing the subtitle');
if (!bookPage.includes(`<link rel="canonical" href="https://tanyahicks.com${ROUTE}">`)) fail('books/free-2b-me/index.html', 'canonical link is wrong or missing');
if (!bookPage.includes(COMPANION)) fail('books/free-2b-me/index.html', `must name its foundational companion, ${COMPANION}`);

// Every historical route resolves to the canonical one in a single hop.
const redirects = readFileSync(join(ROOT, '_redirects'), 'utf8');
for (const r of ['/books/it-shouldnt-be-this-hard/', '/books/book-1/', '/books/enough/', '/enough/', '/designed-for-more/']) {
  const rule = redirects.split('\n').find(l => l.trim().startsWith(r));
  if (!rule) fail('_redirects', `no rule for historical route ${r}`);
  else if (!rule.includes(ROUTE)) fail('_redirects', `${r} must resolve to ${ROUTE} in one hop`);
}

if (failures.length) {
  console.error('BOOK 1 IDENTITY GUARD: FAIL\n' + failures.map(f => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log(`BOOK 1 IDENTITY GUARD: PASS (${files.length} files checked)`);
