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

## Outstanding

`free-to-be-me-logo-light.svg` / `.png` - transparent, full-colour phoenix, charcoal
lettering, ~1024px+. Until it exists the light slot points at the reversed asset, so the
mark reads faint on warm white. Swapping it is one line: `assets/css/nav.css`, the
`--brand-mark-light` declaration.
