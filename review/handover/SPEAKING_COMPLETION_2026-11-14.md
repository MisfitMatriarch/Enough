# Speaking completion and retained watercolour footer

14 November 2026. Continues PR #24 from `81d3dc249aea6b3d678f3bf63a71ee92a314462c`.

## Owner instruction

Tanya supplied a screenshot of the original colourful watercolour footer band and instructed: retain this and do the rest of the changes. This supersedes the earlier removal of that artwork, while retaining the concise footer navigation. It also authorises the outstanding Speaking page consolidation described in `SPEAKING_FORMATTING_2026-11-14.md`. Historical branch-start instructions refer to older drafts; this work continues the current PR #24 candidate so the recognition, typography, photography and homepage corrections are preserved.

## Applied

- Restored the original watercolour artwork below all 45 compact shared footers, with responsive image sources, decorative alternative text and normal document flow. The campaign reservation footer remains separate.
- Promoted the approved cards promise to the Speaking headline. Retained the musical notes, YOURS, professional descriptor and Less fixing. More living.
- Brought the existing attributed stage credits forward beside the recognition and short reel. Removed the unrelated award detail from the AusMumpreneur speaking credit; the precise Stevie record remains in the recognition cards.
- Kept the established signature keynote, short reel, captions, transcript and three practical takeaways prominent. Combined audience, format and access information into an accessible disclosure.
- Presented the cards keynote as a visually secondary concept, clearly labelled as in development.
- Combined keynotes, MC/hosting, panels and community workshops into one format section, with professional learning linked separately.
- Kept all six existing question-and-answer disclosures verbatim and widened them. Used one full-frame AusMumpreneur photo with Tanya visible on the right, and one strong philosophy passage. Removed repetitive philosophy sections, additional decorative photographs and the book-edge image.
- Moved the unchanged enquiry form directly after the offer/topic information. Retained the three-step process, 48-hour response wording, privacy link, email alternative, availability, agreed fees and access field.
- Preserved legacy section anchors, the homepage moving ribbon, personal-story design, award cards, all eight books, reservation code, short films and four exact Stripe checkout destinations.

Permissioned organiser quotations and a new post-talk resource remain future content work. No quotation, permission, outcome or undelivered workbook is invented or promised.

## Validation

Before and after: 18 unit tests pass, the production build passes, and static contracts pass. The final built contracts cover 48 pages, 2,902 local references and seven Netlify form instances across six routes. Whitespace checks pass. A source comparison confirms the homepage ribbon, speaking form and all six topic disclosures are unchanged.

The local browser baseline was attempted before and after; the installed Playwright browser executable is unavailable. This is a local verification limitation, not a passing check. Hosted preview and current-commit CI must be checked separately. No tests or dependencies were changed to work around this limitation.

No form submissions, production publication, branch protection changes, main push or merge are part of this change.
