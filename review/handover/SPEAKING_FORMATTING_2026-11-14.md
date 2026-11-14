# Speaking formatting and footer review

Owner instructions, 14 November 2026: put Less Fixing after FREE 2B ME on a new line; repair the oversized keynote paragraph; review the entire Speaking page; remove repeated photography; centre Tanya, who is on the right of the AusMumpreneur photograph; simplify the footer.

## Applied corrections

- A deliberate heading break after FREE 2B ME: and indivisible Less Fixing. / More Living. phrases, with responsive wrapping.
- Separate the existing opening sentence from its supporting explanation. The lead remains serif; the explanation uses readable 17–18px Figtree. Align both columns to the top.
- Keep the full-width Women Changing the World participation photograph once; remove its adjacent decorative duplicate.
- Position the AusMumpreneur crop toward Tanya on the right and correct the alt text to describe her actual position.
- Replace the shared footer on 45 pages with six primary links, privacy and acknowledgement links, and two short related-site destinations. Remove the long service-scope paragraph and large decorative footer band. Existing pages remain available from main navigation and relevant journeys. The separate campaign reservation footer is already short and remains unchanged.

## Coordination

The owner is reviewing draft PR #24 and asked to fix that candidate. This supersedes historical starting-branch instructions pointing to older drafts. Work was isolated locally, then based on the current PR #24 head. The concurrent recognition update at 590a3a5 is retained. Deliver these corrections to the same draft preview using a normal fast-forward push. No main push, force push, merge to main, form submission, or production publication.

## Full-page design recommendations, not yet applied

The page repeats the philosophy and offer information across too many separately styled sections. The strongest material needs a clearer sequence and fewer competing statements.

1. Hero: use the existing approved cards promise as the main headline, with “Keynotes, MC and workshops with Tanya Hicks” as its small contextual label. Keep one short explanation, a speaking enquiry action and the reel action. Put the speaker kit in a quieter text link.
2. Proof: retain the concurrent international recognition update. Move a compact list of actual speaking credits near the reel so organisers can quickly see both the work and the evidence. Keep precise event and award attribution; do not place the Stevie award in a way that reads as an AusMumpreneur award.
3. Signature keynote: keep the title, reel and three practical audience takeaways. Consolidate “The central idea” into the introduction, and combine audience, format and access details into compact organiser information. Do not reintroduce the retired full recording or transcript.
4. Cards concept: retain its distinct concept status but present it as a secondary offer. Avoid making a proposed talk compete visually with the established signature keynote.
5. Formats: one section for keynote, MC/hosting, panels and workshops. “Speaking shaped for the room” currently adds a second format introduction without new booking information; fold that sentence into the formats section. Link professional learning to its own page.
6. Philosophy: retain one strong passage from the “What becomes possible”, “Noticing differently” and “For conference organisers” sections. Their repeated lists of identity, work, belonging, practice and systems lengthen the page without clarifying the offer. The strongest short statement is “A good question should keep working after the speaker has left the room.”
7. Topics: keep the six existing questions in accessible disclosures, but allow the questions and open answers a generous width. Use one properly composed photograph, rather than multiple arch/lozenge frames. Remove the decorative book-edge image from this speaking journey in a later design pass.
8. Booking: bring the enquiry section after the offers and evidence. Keep actual form contracts and fields. Consolidate repeated who/what/format information and the second closing enquiry navigation, preserving the response expectation and access information.

Suggested final order: hero; recognition and stage credits; short reel/signature keynote; cards concept; formats; tailored questions plus one philosophy statement; booking; acknowledgement; compact footer.

## Verification

Before and after: 18 unit tests and production build pass. After integration with the recognition update: 48 built HTML pages, 2,701 local references and seven Netlify form instances across six routes pass static contracts. Diff whitespace checks pass.

The local browser baseline was attempted before and after. The bundled browser is missing, and system Chromium fails at startup because socket operations are prohibited by this host. Browser checks must run in existing GitHub CI and the connected hosted preview; do not treat the local launch failure as a passing browser test. No checks were weakened and no dependencies changed.
