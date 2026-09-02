# Light-system preview bundle

Stable screenshots of the `light-system` branch, committed so the visual result can be
reviewed without a running local server and without deploying to production.

`main` is untouched. Nothing here is live.

| File | View |
|---|---|
| `01-desktop-hero.jpg` | Home - hero, into "Find your way in" |
| `02-desktop-ecosystem.jpg` | Home - the nine ecosystem objects |
| `03-desktop-what-can-change-into-dark.jpg` | Home - "What can change", into the dark statement band |
| `04-desktop-dark-statement.jpg` | Home - the dark manifesto section |
| `05-desktop-the-nest.jpg` | The Nest - hero and the six defining conditions |
| `06-mobile-390-hero-routes-ecosystem.jpg` | 390px - hero, routes, ecosystem |
| `07-mobile-390-change-dark-nest.jpg` | 390px - what can change, dark band, Nest |
| `08-sovereignty-audit-tool-preserved.jpg` | The Sovereignty Conditions Audit, moved not deleted |
| `09-desktop-continuity.jpg` | Home - "There is no requirement to graduate from belonging" |
| `10-desktop-close-and-footer.jpg` | Home - the closing promise, three routes out, and the footer |
| `11-mobile-390-unified-header.jpg` | 390px - one header across home, The Practice and The Nest |
| `12-mobile-390-menu-open.jpg` | 390px - the FREE 2B ME Menu panel open |
| `13-desktop-header-and-buttons.jpg` | Desktop - full nav, magenta primary, teal active |
| `14-final-mobile-header-light-logo.jpg` | FINAL 390px - light phoenix mark across three pages |
| `15-final-mobile-menu-open.jpg` | FINAL 390px - menu open |
| `16-final-desktop-header-light-logo.jpg` | FINAL desktop - header with the light phoenix mark |

Desktop captures are 1328px wide. Mobile captures are rendered at a true 390px viewport.

## Locked decisions

- **Mobile navigation:** Option B, the FREE 2B ME Menu. Not the wrapped editorial band -
  nine routes at 44px targets cost roughly 39% of a 390x844 screen even when refined.
- **Menu labelling:** panel wordmark is FREE 2B ME; the first route stays Home. The brand
  identity and the destination label do different jobs.
- **Buttons:** 18px radius, magenta primary, charcoal outline secondary, aqua as accent.
- **Logo:** two explicit surface-context assets. Light surfaces use
  `free-to-be-me-logo-light`, dark surfaces keep the existing reversed asset. The header
  composition is phoenix brandmark + Tanya Hicks, not the full arced lockup.

## Logo - resolved

Exported from the master Canva design "logo" (DAF-IW4Ykdk), page 1 - the approved
light-background lockup with charcoal lettering. Page 4 is the reversed version that
was already in the repo.

Four assets now exist:

| File | Use |
|---|---|
| `free-to-be-me-phoenix-light.png` | header on light surfaces (1010x859) |
| `free-to-be-me-phoenix-dark.png` | header on dark surfaces (385x322) |
| `free-to-be-me-logo-light.png` | full arced lockup, light (1632x1632) |
| `free-to-be-me-logo.png` | full arced lockup, reversed |

The header marks are the phoenix only, cropped from the approved artwork - no
recolouring, no CSS filters, brand colours byte-identical to the source. The crop was
located by the saturated-pixel bounding box, since the arced lettering is monochrome
and the phoenix is the only part carrying colour.

Canva's export API offers PDF/JPG/PNG/PPTX/GIF/MP4 - no SVG. PNG at 1632px is the
highest-fidelity export available through it.

Note: the dark slot is wired and correct but no current surface renders a header on a
dark background, so it is not exercised today.
