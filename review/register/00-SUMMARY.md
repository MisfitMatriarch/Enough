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

## Held for Tanya (not applied)

1. Keynote take-aways in "In the room / Understanding / Afterwards" form (02-#3); MC audience line (02-#5).
2. **Practitioner Pathway authorisation:** who authorises, against what, and is it operating? Also "Work Authority" (02-#31, #53).
3. Panels: facilitator, panellist, or both? This decides the form option wording (02-#7, #66).
4. Participant workshop content (02-#8).
5. Rename "The deeper architecture" (banned word) to "Underneath the Practice"? (02-#46)
6. Add NATCA 2026 to "Where I have stood up and said it"?
7. **Keynote film:** does the Drive film have captions? Is a trailer or written summary planned?
8. **Public email:** sparkly@ or tanya@? The transcript footer still uses tanya@.
9. **Netlify forms:** confirm `speaking-booking` notifications reach you, and that `free2bme-updates` is detected.
10. **"Book Tanya" header label:** the destination is an enquiry. Keep, or "Work with Tanya"?
11. **Navigation:** "Learning" goes to a homepage section; "Events & Speaking" lists no events; footer "The Nest in Australia" goes off-site while /the-nest/ is orphaned; /research/ is orphaned. Restructure?
12. **About:** an ordinary good day; more on hockey; may Tammy / Yoga Nrg be named; role at Neurodivergent Empowered; one or two more contradictions in your own words (01 Q1–3, 11, 12).
13. **Family detail in third-party bios:** "single mother of a transgender daughter" (01 Q4).
14. Kianni Jackson context (01 Q5).
15. Contribution at The Nest: what people make or share (01 Q6).
16. **Partner responsibilities:** confirm Headspace runs its group and handles sign-ups (01 Q7); preferred lower-case "headspace"? (Q8)
17. Women's empowerment on the homepage, or all-genders framing deliberate? (01 Q9)
18. "FREE 2B ME Global" in the founder story (01 Q10).
19. **Practice That Holds:** "alive under pressure" or "alive in daily practice"? (03 Q6)
20. Should the expo page show the practice books without a click? (03 Q7)
21. Reader-style questions for the four practice books? Drafts are in 03 Q8, not used.
22. "I" on Be first to know vs "we" on reservations (03 Q9).
23. **Film:** confirm "accepting, getting the heart bigger" by ear; send audio-only copies of the other clips for movement 3 of the homepage film.

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
