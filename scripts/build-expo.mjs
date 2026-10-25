import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
export const reflectionCopy = ['What would make you more free to be you?', 'More of this:', 'Less of this:', 'Something that would help:', 'WORDS YOU CAN BORROW', '“What would help me take part is…”', '“Could we try a different way?”', '“I’d like support with this, while keeping a say.”', 'Keep making room for you.'];

export function renderPage(settings, { pdfSize = null } = {}) {
  const books = settings.books.filter(book => book.approved);
  const founders = settings.founders.filter(founder => founder.approved === true);
  if (founders.length > 3) throw new Error('The expo permits up to three approved profiles.');
  const hasPdf = settings.reflection.approved === true;
  const card = book => `<article class="book"><img src="${escape(book.cover)}" width="1024" height="1536" alt="${escape(book.title)} book cover" loading="lazy"><div>${book.question ? `<p class="reader-question">${escape(book.question)}</p>` : `<p class="reader-question">Companion to ${escape(books.find(b => b.id === book.companionOf)?.title || '')}</p>`}<h3><a href="/books/${escape(book.id)}/">${escape(book.title)}</a></h3><p>${escape(book.description)}</p><p class="price">${typeof book.priceAUD === 'number' ? `A$${book.priceAUD} · Pay at launch` : 'Price confirmed before payment is requested.'}</p>${settings.features.reservationsEnabled ? `<label class="select-book"><input form="reservation" type="checkbox" name="titles" value="${escape(book.id)}"> Reserve ${escape(book.title)}</label>` : ''}</div></article>`;
  return `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>More room for me | FREE 2B ME</title><meta name="description" content="Make room for yourself with a free reflection sheet and explore books by Tanya Hicks. Reserve now and pay at launch.">
<link rel="canonical" href="${escape(settings.canonicalUrl)}"><meta property="og:title" content="More room for me | FREE 2B ME"><meta property="og:description" content="Less fixing. More living. A reflection for you, and books that make room for your life."><meta property="og:url" content="${escape(settings.canonicalUrl)}"><meta property="og:type" content="website"><meta property="og:image" content="https://free2bme.global/assets/brand/free-2b-me-author-cover.png">
<link rel="icon" href="/assets/brand/phoenix-dark-120.png"><link rel="preload" href="/assets/fonts/figtree-var.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/css/f2bm-tokens.css"><link rel="stylesheet" href="/assets/css/expo.css"><script src="/assets/js/expo.js" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a><header class="expo-header"><a class="brand" href="/" aria-label="FREE 2B ME home"><img src="/assets/brand/phoenix-dark-120.png" width="72" height="72" alt="Original FREE TO BE ME phoenix"><span>FREE 2B ME<small>by Tanya Hicks</small></span></a><a href="/books/">Explore the library</a></header>
<main id="main"><section class="hero" aria-labelledby="hero-title"><div class="wrap"><p class="eyebrow">FREE 2B ME</p><h1 id="hero-title">Less fixing.<br>More living.</h1><p class="question">What would make you more free to be you?</p><p class="intro">Take a moment for yourself. ${hasPdf ? 'Download your free reflection sheet' : 'Explore your free reflection prompts'}, find a book that speaks to you${founders.length ? ', and meet the featured local businesses' : ''}.</p><a class="button" href="${hasPdf ? escape(settings.reflection.url) : '#reflection'}" ${hasPdf ? 'download data-track="pdf_link_click"' : ''}>${hasPdf ? 'Download my free reflection sheet' : 'Explore my free reflection prompts'}</a><p class="small">No email needed.</p><nav class="page-nav" aria-label="On this page"><a href="#books">Find my book</a>${founders.length ? '<a href="#businesses">Meet the featured businesses</a>' : ''}</nav></div></section>
<section id="reflection" class="section wrap" aria-labelledby="reflection-title"><p class="eyebrow">A moment for you</p><h2 id="reflection-title">More room for me</h2><p class="measure">A reflection to help you notice what you want more of, what you want less of, and what would make life feel more like yours. Use it in whatever way works for you. You do not need to complete every prompt.</p>${hasPdf ? `<div class="actions"><a class="button" href="${escape(settings.reflection.url)}" download data-track="pdf_link_click">Download the reflection sheet</a><a href="${escape(settings.reflection.url)}" target="_blank" rel="noopener" data-track="pdf_link_click">Open the reflection sheet <span class="small">(opens a new tab)</span></a></div><p class="small">PDF · One A4 page${pdfSize ? ` · ${Math.ceil(pdfSize / 1024)} KB` : ''}</p>` : ''}
<div class="reflection-text"><p class="question">${reflectionCopy[0]}</p><div class="prompts">${reflectionCopy.slice(1,4).map(line => `<p>${escape(line)}<span class="writing-space" aria-hidden="true"></span></p>`).join('')}</div><h3>Words you can borrow</h3>${reflectionCopy.slice(5,8).map(line => `<p class="borrow">${escape(line)}</p>`).join('')}<p class="closing">Keep making room for you.</p></div><p class="small">Your reflection stays with you. This page does not collect your answers.</p><button class="text-button" id="print-reflection" type="button" hidden>Print these reflection prompts</button></section>
<section id="books" class="section books-section" aria-labelledby="books-title"><div class="wrap"><p class="eyebrow">Books by Tanya Hicks</p><h2 id="books-title">Find your book</h2><p class="stand">Reserve your copy today. No payment until launch.</p><p>Choose the books that speak to you. You can reserve more than one.</p><div class="book-grid">${books.filter(book => book.audience === 'reader').map(card).join('')}</div>${books.some(book => book.audience === 'professional') ? `<details class="professional"><summary>Books for professional practice</summary><p>Optional companion reading for people supporting others. FREE 2B ME includes the people receiving support and the people doing the supporting.</p><div class="book-grid">${books.filter(book => book.audience === 'professional').map(card).join('')}</div></details>` : ''}
${settings.features.reservationsEnabled ? `<div class="reservation-wrap"><h3>Your book reservation</h3><p id="selection-summary" aria-live="polite">Choose your titles above.</p><form id="reservation" hidden><div class="field"><label for="reservation-name">Your name</label><input id="reservation-name" name="name" autocomplete="name" maxlength="120" required></div><div class="field"><label for="reservation-email">Email address</label><input id="reservation-email" name="email" type="email" autocomplete="email" maxlength="254" required></div><div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off"></label></div><p id="reservation-terms">This is a reservation, not a purchase. No payment is taken now. We will contact you about your selected books when they launch, with the confirmed price and next steps. You can change or cancel your reservation by contacting us.</p><label class="marketing"><input type="checkbox" name="marketing-consent">${escape(settings.marketingConsentWording)}</label><p class="small">Optional. Your reservation does not depend on joining marketing.</p><p class="small">Read <a href="#privacy">how we use your details</a>.</p><p id="reservation-error" class="error" role="alert" hidden></p><button class="button" type="submit" aria-describedby="reservation-terms">Reserve my selected books</button></form><div id="reservation-success" tabindex="-1" role="status" hidden></div><p id="reservation-fallback">You can also <a href="/books/pre-order/">reserve using the existing book reservation page</a>.</p></div>` : `<p>For book enquiries, <a href="mailto:${escape(settings.contactEmail)}">contact Tanya</a>.</p>`}</div></section>
${founders.length ? `<section id="businesses" class="section wrap" aria-labelledby="businesses-title"><p class="eyebrow">Local connections</p><h2 id="businesses-title">Meet the featured businesses</h2><div class="founder-grid">${founders.map(founder => `<article><img src="${escape(founder.image)}" alt="${escape(founder.imageAlt)}" width="240" height="240" loading="lazy"><h3>${escape(founder.business)}</h3><p>${escape(founder.name)}</p><p>${escape(founder.makesPossible)}</p>${founder.stall ? `<p data-event-only data-event-end="${escape(settings.event.endsAt)}">Find them at ${escape(founder.stall)}.</p>` : ''}<a href="${escape(founder.contactUrl)}" data-track="founder_link_click" data-business-id="${escape(founder.id)}">Visit ${escape(founder.business)}</a></article>`).join('')}</div></section>` : ''}
<section class="section wrap" aria-labelledby="speaking-invitation"><p class="eyebrow">For organisers and teams</p><h2 id="speaking-invitation">Bring this conversation<br>into your room.</h2><p class="measure">Explore an event, workshop or professional learning conversation with Tanya. What would you like to make possible for your people?</p><a class="button" href="/work-with-tanya/#enquiry" data-track="enquiry_link_click">Talk with Tanya about your event</a></section>
<section id="privacy" class="section wrap privacy"><h2>Your details and your choices</h2><p>Your name, email and chosen titles are used to manage your reservation and contact you about those books. Optional marketing consent is recorded separately. We do not collect your reflection answers.</p><p>Reservation records are held privately in Netlify storage and accessed by authorised staff. Netlify hosts this website and processes technical requests. Our own reservation handler does not log your contact details. Storage may be outside Australia.</p><p>To ask about your details, request a correction or deletion, change your reservation, or withdraw marketing consent, email <a href="mailto:${escape(settings.contactEmail)}">${escape(settings.contactEmail)}</a>. Please include the email you used for your reservation. We keep reservation details while needed to manage your selected books and related enquiries.</p></section>
<section class="country wrap"><h2>Acknowledgement of Country</h2><p>FREE 2B ME acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of the lands and waters on which this work is made, and Elders past, present and emerging. Sovereignty was never ceded.</p></section></main>
<footer class="wrap"><p>FREE 2B ME by Tanya Hicks</p><nav aria-label="Footer"><a href="/">Home</a><a href="/books/">Books</a><a href="/work-with-tanya/" data-track="enquiry_link_click">Work with Tanya</a><a href="mailto:${escape(settings.contactEmail)}">Contact Tanya</a><a href="#privacy">Privacy</a></nav><p class="small">© Tanya Hicks. All rights reserved.</p></footer></body></html>`;
}

// Source-only material that must never be served: notes, reviews, previews, tooling and private exports.
export const internalDirectories = ['.git','node_modules','dist','.netlify','content','netlify','review','tests','scripts','docs','private-exports','footage'];
const internalFile = /\.(md|markdown|patch|diff|py|mjs|sh|zip|docx?|sha256|log)$/i;

// Fails if anything internal reached the publish directory. Run after every build.
export function findInternalFiles(dir) {
  const found = [];
  const walk = current => {
    for (const entry of readdirSync(current, { withFileTypes:true })) {
      const full = resolve(current, entry.name);
      const rel = relative(dir, full).split(sep).join('/');
      if (entry.isDirectory()) {
        if (internalDirectories.includes(entry.name)) found.push(rel + '/');
        else walk(full);
      } else if (internalFile.test(entry.name)) found.push(rel);
    }
  };
  walk(dir);
  return found;
}

export function build(settings) {
  if (settings.features.onlineReflectionEnabled || settings.features.paidPlanEnabled) throw new Error('Future tools require a separate completed implementation before enabling.');
  if (new URL(settings.canonicalUrl).protocol !== 'https:') throw new Error('Use an HTTPS canonical URL.');
  for (const founder of settings.founders.filter(item => item.approved === true)) {
    for (const key of ['id','name','business','image','imageAlt','makesPossible','contactUrl']) if (!founder[key]) throw new Error(`Approved founder is missing ${key}.`);
    if (new URL(founder.contactUrl).protocol !== 'https:') throw new Error('Founder contact links must use HTTPS.');
  }
  for (const book of settings.books.filter(item => item.approved)) {
    if (!existsSync(resolve(root, `.${book.cover}`))) throw new Error(`Missing book cover: ${book.id}`);
  }
  const pdfPath = resolve(root, settings.reflection.sourceFile);
  const pdfSize = settings.reflection.approved ? statSync(pdfPath).size : null;
  mkdirSync(resolve(root, 'free2bme'), { recursive:true });
  writeFileSync(resolve(root, 'free2bme/index.html'), renderPage(settings, { pdfSize }));
  rmSync(resolve(root, 'dist'), { recursive:true, force:true });
  mkdirSync(resolve(root, 'dist'));
  const excluded = new Set(internalDirectories);
  for (const entry of readdirSync(root, { withFileTypes:true })) {
    if (excluded.has(entry.name) || entry.name.startsWith('.')) continue;
    if (entry.isDirectory() || /\.(html|css|xml|txt)$/.test(entry.name) || entry.name === '_redirects') cpSync(resolve(root,entry.name),resolve(root,'dist',entry.name),{ recursive:true });
  }
  if (settings.reflection.approved) {
    const destination = resolve(root,'dist',`.${settings.reflection.url}`);
    mkdirSync(resolve(destination,'..'), { recursive:true });
    cpSync(pdfPath,destination);
  }
  const leaked = findInternalFiles(resolve(root,'dist'));
  if (leaked.length) throw new Error(`Internal files reached dist: ${leaked.join(', ')}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build(JSON.parse(readFileSync(resolve(root,'content/expo.json'),'utf8')));
  console.log('Static site and expo page built in dist.');
}
