# Homepage update: more living

Status: implemented on local branch `codex/more-living-homepage`; not published.
Base: `6968300b951726bd244cdd08a8ca7979b5547532`.

The homepage now has one primary directory and one closing section. Duplicate
introductions and standalone philosophy blocks have been removed. Events,
MCing and workshops are a primary route. Empowerment addresses people of all
genders. LGBTQI+ belonging remains an explicit section.

Community partnerships includes Headspace Caloundra's Rainbow Social Group at
Neurodivergent Empowered Nest, with details supplied in the owner's screenshot:
free, ages 12–16, LGBTQIA+, questioning and allies; every second Monday,
3:30–4:30pm from 21 September 2026. Enquiries use Headspace's supplied phone.
The unseen effort diagram, future possibilities graphic and permission statement
use accessible HTML and existing book artwork. Book-series and award detail are
available in native expandable sections.

Existing phoenix and book artwork, navigation destinations, section IDs, book
content, recognition, Acknowledgement of Country and accessibility code remain.
No interior page, form, shared stylesheet, redirect or deployment setting changes.
New CSS is isolated to the homepage. All content uses normal document scrolling;
there is no fixed-height page wrapper, nested page scroller or wheel interception.

## Checks completed

- `python3 scripts/check-homepage.py`: all checks pass. Checks every existing
  homepage anchor and external/internal destination, local asset paths, unique
  IDs, one H1, unchanged original inline script, and guards against page caps.
- `node --check assets/js/home-more-living.js`: passes.
- `python3 scripts/check-homepage-content.py`: balanced HTML, no repeated
  substantial paragraphs/headings, user corrections, accessible references.
- `git diff --check`: passes.

## Release gates still open

GitHub rejected branch creation with HTTP 403, “Resource not accessible by
integration”. No remote write or publication succeeded.

Browser verification could not run: the connected browser blocked the local
preview URL. Source checks are not a substitute for rendered checks. Before
merging, verify at 320px, 390px and desktop widths: scroll from hero to footer;
open and exit the acknowledgement; use both interactive choice groups and
the MC accordions; check keyboard focus, larger text and high contrast. Check
normal loading and disabled JavaScript. The choice buttons intentionally stay
hidden without JavaScript, leaving their default content and links usable.

Preserve normal document scrolling in future edits. Never port an embedded
preview's max-height or scroll container into the website.

## Apply elsewhere

Use the supplied patch on a clean branch at the stated base, or review/rebase
it against a newer main. Run `git apply --check enough-homepage-update.patch`
before applying. The patch changes only the homepage and adds its isolated CSS,
JavaScript, regression check and this review note. Do not overwrite unrelated
changes. This repository auto-deploys main, so complete the browser gates first.
