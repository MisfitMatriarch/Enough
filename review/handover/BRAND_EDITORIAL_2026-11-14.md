# Tanya Hicks editorial update and unfinished-edit review

14 November 2026. Candidate branch: `codex/tanya-brand-editorial-20261114`.
Base: published `main` at `f0a35af8fe0a475367f5a3c9c2e34fd0fa14dc0b` (PR #23).

## Owner direction and scope

Tanya requested the proposed website improvements and polished formatting, clarified that the brand is not just about autism, then asked for investigation of unfinished edits. This candidate strengthens the broader personal brand: identity, relationships, ambition, change, belonging, strengths and joy. The cards message and “Less fixing. More living.” remain central. Neurodivergent practice has its proper place within the wider story.

The current published baseline includes the latest portrait, navigation, films, course decisions and PR #23 wording. Historical branch-start instructions in AGENTS.md point to older candidates; starting this isolated branch from current main preserves those later decisions. The older dirty checkout has not been modified.

## Applied

- Home: clearer hierarchy, square real portrait, direct speaking/books actions, original moving topic ribbon and a contrasting personal-story section, personal film, one Life/Work choice, readable featured books, later organisation links and optional reflection/subscription.
- Books: more direct introduction, two readable starting covers and access to all eight titles. Existing descriptions, prices and reservation implementation remain.
- Speaking: broader introduction, organiser jump links, separately labelled signature keynote and new cards concept, compact accessible topic disclosures and a two-page PDF kit. Existing short reel remains.
- Media: PDF kit with the existing text download retained as a separate accessible format.
- Recognition: the Gold award identifies Tanya Hicks / Neurodivergent Empowered, matching the official AusMumpreneur 2025 winners list.
- Country acknowledgement: remove only “No treaty was ever signed.” from 45 public source pages. Victoria’s statewide Treaty was signed on 13 November 2025 and commenced on 12 December 2025. The approved factual correction supersedes the historical freeze for this sentence only; other acknowledgement wording remains.

References: https://ausmumpreneur.com/2025-ausmumpreneur-awards-winners/ ; https://www.firstpeoplesrelations.vic.gov.au/victorias-statewide-treaty

## Outstanding branches and working copy

| Item | Current evidence | Decision |
|---|---|---|
| Older local branch `codex/approved-positioning-and-speaker-journey` | 46 of its 47 changed files exactly match current published source. The only different file is Home, where the older copy includes musical-note emoji. | No missing 47-file release. Retain current text-only homepage headline for stable line boxes; keep the words and uppercase YOURS. Do not overwrite the older working copy. |
| PR #21, remove course access notices | Current main already removes these notices and retains four exact Stripe destinations and A$2,700 course pricing. | Already incorporated. No duplicate merge needed. |
| PR #20, author-site separation | Author focus, speaking reel, organiser download and separated organisation destinations exist in current main. The new candidate improves this journey further. | Retain the useful direction. Do not restore the older design wholesale. |
| PR #19, Global professional gateway | Its canonical-domain migration would turn this repository into free2bme.global. | Conflicts with the current three-domain architecture. Do not merge into the Tanya site. |
| PR #11, homepage/release controls | Earlier layout and controls predate current wording and the full-keynote retirement. Current main has the expanded quality workflow and retirement regression. | Historical. Keep current controls and current content. |
| PR #10, handover references | References an earlier draft baseline. | Historical documentation, not a missing website feature. This note supplies the current baseline. |

No older PR has been closed, merged or altered.

## Earlier brand suggestions: would they add value now?

This revisits `review/register/05-cultworthy-suggestions.md` against current source, rather than treating its October status labels as current facts.

| Earlier suggestion | Assessment and action |
|---|---|
| A1 / C1: repeatable phrase and sign-off | The cards idea plus “Less fixing. More living.” now provide the signature. A competing new slogan would weaken recognition. Keep “All of me has value” within the personal story; no new film edit or music use. |
| A2 / B3: everyday question and practitioner card | Useful established resources already exist. Keep the practitioner card within professional routes instead of expanding the homepage. |
| A3 / E1: downloadable sentence and rotating line | Already exists on For your life, including the image-save control. Preserve that discoverable route; do not duplicate it on the homepage. |
| A4: public language glossary | Potentially helpful for practitioner learning, but not a high-priority personal-site conversion improvement. Best considered within Global with selected approved definitions. |
| B1 / B2: optional cost reflection and Room List | The existing free reflection already provides a private practical next step. Its homepage invitation now includes what visitors want more of and less of. A second printable should only follow a genuinely different use case. |
| B4: post-talk team kit | High-value future addition, once tied to the delivered keynote and its actual discussion questions. The organiser PDF added here solves the immediate booking-information gap; it is not represented as a post-talk workbook. |
| C2 / C4: community stories and a public participation promise | Could strengthen belonging, but depend on actual moderation, consent and handling arrangements. No collection flow or operational promise invented. |
| C3: “founding readers” | A possible launch campaign, but unnecessary to make current reservations clear. No reader identity or reward added without a launch plan. |
| D1 / D2: organiser feedback and examples of the work in use | Highest-value remaining credibility additions. Require real quotes/accounts and permission. Existing films, event credits and sourced awards provide evidence meanwhile. |
| D3: whole-person photography | Useful and already supported by the real Paris writing, speaking and London book photographs. These are retained and better presented. No stock/AI substitute or new private disclosure. |
| E2 / E3: phoenix animation and meaningful thank-you pages | Existing thank-you copy retained. Additional animation is unnecessary; the original moving topic ribbon is retained at Tanya’s explicit request, including its reduced-motion behaviour; existing access controls remain. |

Unverified operational receipt/notification routing and retention arrangements from the October handover remain distinct from this visual/content release. No form has been submitted and no real reservation data accessed. Older book subtitle/cover decisions are not silently reopened.

## Verification and publication

- Before and after: all 18 unit tests pass; production build passes.
- After: 48 HTML pages, 3,515 local references and seven Netlify form instances across six routes pass contract checks. `git diff --check` passes.
- Two-page PDF rendered and visually inspected, with readable text and working link annotations.
- Local Playwright baseline attempted before and after; this host cannot launch Chromium because process socket operations are denied. This is not a passed browser check. Unchanged browser suites run in GitHub Actions, followed by a manual hosted-preview review.
- Form names/fields, function code, reservation code, dependencies and four Stripe URLs are unchanged. No live submissions, main push, merge, protection changes or production deployment.

Record final preview, current-head CI and responsive evidence below before requesting publication.

### Owner correction during preview review

Tanya explicitly requested retaining the moving topic ribbon and said the plain personal-story text block looked too basic. Restore the original ribbon markup and existing motion behaviour. Give the story a deep-teal chapter, cream and blush typography, a distinct pull quote and a large closing statement while retaining all original words and the short film. The supporting genius/joy line moves into the story closing. This supersedes the initial static-band proposal.
