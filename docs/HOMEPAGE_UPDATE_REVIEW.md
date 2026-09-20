# Homepage update: more living

Status: implemented on local branch `codex/more-living-homepage`; not published.
Base: `6968300b951726bd244cdd08a8ca7979b5547532`.

This is the first implementation pass of the reviewed homepage direction. It
adds MC/hosting and workshops, women's empowerment, LGBTQI+ belonging, and a
community partnerships entry. The main welcome addresses the reader as “you”.
The women's section remains specific to women, including trans women.

The community partnerships card intentionally has only its agreed heading and
an enquiry link. Detailed copy is still open; no new partnership or programme
is announced. Sparkly Aliens remains linked by name in the belonging section.

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
