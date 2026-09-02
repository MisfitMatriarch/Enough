# Mobile navigation - two options, no decision made

Judged at a true 390x844 viewport against the nine tests. The current wrapped nav does
not pass three of them, so both options are here rather than a default to a hamburger.

## Measured

| | Header height | Page title starts at | Rows |
|---|---|---|---|
| Current (interior pages) | 192px | 302px - **36%** of screen | 3, ragged 4/2/3 |
| Option A - editorial band | 175px | 326px - **39%** of screen | 3, balanced 4/2/3 |
| Option B - FREE 2B ME Menu | 69px | 202px - **24%** of screen | panel |

Option A's first draft spent its budget on spacing and reached 43% - worse than the nav
it was meant to improve. The version here is its most compact honest form. Nine links at
44px touch targets cannot get far below a third of a phone screen while staying visible.

## Files

- `00-current-state-390.jpg` - homepage (hamburger) beside an interior page (wrapped), as shipped
- `01-option-a-vs-b-390.jpg` - the two options side by side
- `02-option-b-menu-open-390.jpg` - Option B's panel open
- `option-a-editorial-band.html` - live prototype
- `option-b-free2bme-menu.html` - live prototype

Neither is wired into the site. The real pages are unchanged apart from one genuine bug
fix found while prototyping (see below).

## Bug fixed in the real stylesheet

`nav.bar{padding:12px 0}` out-specified `.wrap{padding:0 15px}`, so on mobile the nav
links ran flush to the screen edge while every other element sat inset. Now sets only
vertical padding, so `.wrap` keeps supplying the gutter.
