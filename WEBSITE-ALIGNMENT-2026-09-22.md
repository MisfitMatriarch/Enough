# Website alignment and audit implementation

Updated 22 September 2026. Source changes only; not a deployment confirmation.

## Implemented

- Shared homepage-derived navigation, Book Tanya action, typography, colours, heading spacing, mobile column rules and footer wording across 32 active page templates. Historical redirects and the keynote transcript remain intact.
- Homepage H1 now Less fixing. More living.; supporting message retained once. Restored supplied first-person founder account and exact inheritance statement. Removed unchosen Human Systems Architect title. Retained person/all-genders invitation and all explicitly approved photo placements. No removed directory or hidden-cost section restored.
- Eight book detail pages now have their matching cover, A$39 reservation action and explicit payment-at-launch wording. Book 1's obsolete standalone layout, duplicate award ticker, placeholder cover and buried booking form replaced with the shared site template. Other book pages retain subject matter and scope, remove source-material inventories and describe related reading as optional. No new subtitles invented.
- Speaking describes MC/hosting, keynotes, panels, participant workshops and professional learning. Owner-selected speaking hero used.
- Work with Tanya contains the Netlify speaking-booking enquiry form with enquiry type, contact details, timing, audience, budget, purpose and optional access information. Email alternative and separate thank-you route provided. This is an enquiry, not a confirmed booking.
- Media biographies include MCing, inclusion and the eight-book library's development status. Plain-text media kit and existing event photograph linked as actual downloads; photographer credit/permission still needs confirmation for republication.
- Nest wording now identifies one real-life expression of the work and distinguishes individual disability support from the ordinary activity. Sparkly Aliens described as a distinct not-for-profit, with availability checked at source.
- Professional Learning includes a separate participant-workshop enquiry route; Pathway retains five named stages and has a current-availability enquiry.
- Deeper Architecture clarifies six public groupings versus eight working steps. Research distinguishes future doctoral direction from candidature. Capstone status still requires owner verification.
- Recognition uses owner-reported AusMumpreneur Bronze and Top 100 from supplied audit. Sunshine Coast Australia Day entries corrected to nominees. Stale aggregate tally removed; archive retained. Filter buttons use aria-pressed and include nominees/other recognition. No external awards register verification performed.
- Broad word-mark registration claim removed from destination footers; homepage's logo-specific owner-approved wording retained.
- Acknowledgement retained with Escape dismissal, focus containment, return focus, and session-only persistence protected against unavailable storage. Existing enlarged text, contrast and reduced-motion controls retained.
- Updated sitemap and marked July handover historical.

## Audit recommendations intentionally not restored

- Old publication hold: superseded by owner's explicit approval to publish.
- Women-only homepage invitation: later instruction is person/people; women-specific event audiences can still be named appropriately.
- Duplicate route directory, repeated quotes and hidden-cost section on homepage: user explicitly removed them.
- New events, programmes, testimonials, MC reels or service capacity claims: no supporting material supplied. No invented evidence.
- Broader newsletter subscription: existing book-only consent remains book-only. Enquiries and reservations have their own purposes.

## Verification completed

- Parsed 35 HTML pages; active pages have one H1, no duplicate IDs, and no missing local asset/page/anchor references.
- All 33 inline JavaScript blocks parse, plus new external script syntax checks.
- Existing homepage checks pass for structure, duplicate copy and requested corrections.
- Executed reservation logic: correct book preselection, multi-book quantities/price, unknown selection fallback and empty-order blocking.
- Executed all seven recognition filters plus reset: 44 entries total; 12 gold, 6 silver, 5 bronze, 18 finalists, 2 nominees, 1 other recognition. These are record counts, not independently validated award totals.
- git diff whitespace check passes.

## Still outstanding before calling this fully verified/live

1. Render actual desktop/mobile pages and inspect crops, typography, zoom, keyboard and contrast. Source checks do not establish visual quality. Local cloud-browser preview was previously blocked; no screenshot proof exists for this revision.
2. Deploy via authorised access to existing Netlify site. GitHub connector write requests returned HTTP 403; git push lacked authentication. Fetch succeeded and origin/main had no commits ahead of the local branch during this pass.
3. Confirm Netlify detects book-preorders and speaking-booking, configure notifications, and test a clearly labelled submission and email delivery after deployment. No user records submitted during development.
4. Reconcile unresolved external award details/recipients and confirm capstone status with authoritative records. No fabricated medals or doctorate claims.
5. Confirm book descriptions against current manuscripts as they are reviewed. V19 first-book wording review is the next task; this pass did not certify all eight manuscripts.

## Next task

Review uploaded FREE2BME_V19_ILLUSTRATED_MANUSCRIPT(1).docx bit by bit for wording alignment. Preserve original. Begin with front matter and Author's Note; present exact existing wording, reason and proposed replacement. Do not apply a global rewrite or assume distress must be removed from the book. Its wider invitation should also make room for desire, identity, joy, support, choice and participation.
