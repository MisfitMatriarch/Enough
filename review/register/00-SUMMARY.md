# Whole-person website pass: summary and open questions

Updated 26 October 2026. The detailed registers are 01 to 04 (page, current wording, issue, proposal, status). Suggestions for the next level are in 05.

## Applied

- **Homepage**
  - Opening explanation now covers personal acceptance and the people, places and support around a person.
  - *All of this is me* adds writing, building, parenting, dancing and singing, and "I'm still growing, and already someone worth embracing."
  - New section *All of you belongs here* after the awards.
  - Recognition copy: "never a measure of anyone's worth".
  - Paris caption: "The unphotographed days count too."
  - People section names limits outside the person.
  - Community leads with interests and relationships; partner groups hosted at The Nest; Headspace named as running its group.
  - Founder story adds MC, hockey, writing, dancing and singing.
  - Book series uses "For your life" / "For your practice" and links each title.
  - "Explore frameworks and tools" no longer promises worksheets.
  - Internal links no longer marked as external.
- **About**
  - Whole-person paragraphs: ordinary life, acceptance with help, the conditions that limit people.
  - New "MC and speaker" entry and exact credentials.
  - Organisations' responsibility added.
  - Canon Belief heading.
  - Title and meta updated; portrait alt text describes the image.
- **Media and media kit:** credentials placed after the stakes, Autistic capitalised, tags lead with belonging and identity, kit matches the page, the "overcome" social preview removed.
- **Recognition:** date range corrected to 2020; copy says the awards celebrate the work and never made anyone worth including; the closing values unphotographed days.
- **The Nest:** meta and hero lead with what people come for.
- **Speaking**
  - Signature keynote names why settings ask people to hide.
  - Audience take-aways (Tanya's wording).
  - MC, keynote, panel, workshop and professional learning distinguished, each with its own typed enquiry.
  - Full keynote film linked.
- **Keynote film page:** no longer a second "signature" keynote; enquiry instead of "Book"; NATCA 2026, 23 minutes; only existing fallbacks promised.
- **Professional pages:** grounded questions where they clarify the page:
  - Who decides what matters?
  - Can the person say no?
  - What resources and time does it take?
  - What can the organisation change?
  - Would the person say it helped?

  Professional Learning's "separate enquiry route" corrected to the same form.
- **Sovereignty Conditions Audit:** report card no longer writes one fixed sentence for everyone; new card asks the person; stale "Conference Mini" text removed; accessible-text link labelled correctly; enquiry buttons use the form.
- **Books**
  - One label pair everywhere.
  - Each pair's connection sentence on both book pages and the expo cards.
  - Every book links to its companion; "read either or both".
  - "Reserve now".
  - "The FREE 2B ME library".
  - "Practical leverage" removed to match the approved description.
  - og:image on book pages; pre-order thank-you has its own meta and noindex.
  - Reservation links, field names and all consent wording unchanged.
- **Film review:** draft 2 brief reframed around embracing all of yourself; review page and homepage preview rebuilt from the current homepage.
- **House style:** spaced hyphens, capitalisation and US spellings cleared from changed public files.

## Completion decisions, 26 October 2026

Tanya has asked for completion. Routine wording, navigation refinements and optional brand additions are not 23 separate release gates.

- Keep the approved visual design, Book Tanya header, all-genders public positioning and eight-book distinctions. Preserve existing published contact and family choices without adding personal details.
- Use confirmed facts already on the site and supplied by Tanya. Do not invent an ordinary-day story, accreditation, workshop scope, credentials, dates or testimonials to fill a space. Omit optional additions when the fact is not established.
- Less fixing. More living. remains the signature phrase. What would make you more free to be you? remains the broad organising question. The ledger reflection is one optional route and its pending approval must not block other existing resources, pages or films.
- The professional card now includes responsibility for changing practice or conditions. It preserves evidence, safeguarding and chosen learning/treatment.
- All 16 additional audio review copies have been supplied. See `docs/FILM_AUDIO_HANDOFF_2026-10-26.md`; do not ask Tanya to prepare them again.

### Remaining substantive release work

1. Finish homepage film draft 2, speaking reel and About story, with complete verified speech and final-original rendering. Keep edits in review pending approval. Resolve unclear wording using a clean alternative recorded passage where possible.
2. Verify actual Netlify form detection, delivery and notifications. A successful local UI check alone is not proof of operational receipt. Do not send an unlabelled test or enrol anyone in marketing.
3. Any claim of external accreditation or authorisation must have its awarding body and scope verified. Otherwise describe only the internal learning and observed-practice process already documented.
4. Obtain final content/film review before merge. Leave optional testimonials, new personal disclosures and additional programmes out until supplied.

### Verification of the finishing changes in this session

- JavaScript syntax, the existing 11 tests and production build pass.
- Browser verification was attempted, but no Chromium binary is available here and the browser download failed. Do not report these latest finishing changes as browser-verified in this session. The earlier checks below remain attributed to the earlier session.

## Verification

**Automated, in the session:**
- 11 of 11 tests pass; build OK.
- 38 built pages, 0 broken links or anchors.
- No duplicate IDs; one H1 per page.
- No review, docs or footage material in `dist/`.

**Browser, in the session:**
- No sideways scroll at 320, 390, 768 or 1440px. The only flag is a decorative wash on About, unchanged.
- Larger-text and high-contrast modes apply with no sideways scroll on the main pages at 390 and 1280px.
- All 8 `?book=` preselects work; the expo page offers 8 titles.
- Enquiry type preselection works.
- Both subscription forms require their own unticked consent; the book-announcement wording is unchanged.
- The audit generates 8 cards.
- Sentence chooser and speaking disclosures work by keyboard; reflection focus ring visible.
- No page errors.

**Needs human review:** tone and meaning of every changed passage; the film with sound; phone reading.
