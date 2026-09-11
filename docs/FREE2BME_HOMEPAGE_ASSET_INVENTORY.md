# FREE 2B ME homepage — visual asset inventory and section map

Compiled 2026-09-11 from the transferred packages. Nothing here is written from the brief alone:
every row was opened, measured and viewed. Contact sheet: `FREE2BME_asset_contact_sheet_2026-09-11.jpg`.

## Packages opened

| package | SHA-256 (first 16) | verdict |
|---|---|---|
| `FREE2BME_Visual_Implementation_Handoff_2026-09-11.zip` | `d10848e141 49de294c` — matches the hash you gave | **incomplete**: v4-era snapshot |
| `FREE2BME-Code-Handoff-Homepage-FINAL-2026-09-10.zip` | `acdcf5a9fa1b31cc` | **superset** — the real asset source |
| `FREE2BME-homepage-desktop-1464px-v6-final.png` | 1464 x 10284 | accepted desktop proof — opened, all 9 bands |
| `FREE2BME-homepage-mobile-390px-v6(1).png` | 390 x 14365 | accepted mobile proof — opened, all 10 bands |

The 11 Sep package is missing, against the 10 Sep one: the phoenix logo file, **all 12 text-free
`abstract-ch*` crops**, `CODE-HANDOFF-FREE2BME-HOMEPAGE.md` and `ROUTE-VERIFICATION.md`.
Implementation therefore reads assets from the 10 Sep FINAL package.

## Governing renderer

`static-app.js` (10 Sep 20:26) is newer than the proof PNGs (19:45) and already applies three of
your corrections: text-free artwork crops, the supplied logo file, and no repeated "FREE 2B ME"
beside the footer logo. It names an asset per section — that map is reproduced below verbatim,
not inferred.

## Asset inventory and section map

| filename | dimensions | size | background | homepage section | status |
|---|---|---|---|---|---|
| `fb-cover.png` | 2034 x 773 | 2.97 MB | opaque | Hero — phoenix brand opening | approved |
| `abstract-ch2(2).png` | 1024 x 1044 | 2.09 MB | opaque | A different place to begin | approved |
| `abstract-ch3(2).png` | 1024 x 1044 | 2.10 MB | opaque | Something for me · also the navy leadership statement wash | approved |
| `abstract-ch4(2).png` | 1024 x 1044 | 2.08 MB | opaque | Supporting someone | approved |
| `abstract-ch7(2).png` | 1024 x 1044 | 2.18 MB | opaque | The FREE 2B ME Practice | **source file corrupt — rebuilt** |
| `abstract-ch6(2).png` | 1024 x 1044 | 1.99 MB | opaque | Books and tools | approved |
| `abstract-ch8(2).png` | 1024 x 1044 | 1.96 MB | opaque | Learning — Practitioner Pathway | approved |
| `abstract-ch11(1).png` | 1024 x 1044 | 2.02 MB | opaque | Learning — Professional Learning | approved |
| `abstract-ch13(1).png` | 1024 x 1044 | 1.98 MB | opaque | Learning — Practice Library and Tools | approved |
| `abstract-ch5(2).png` | 1024 x 1044 | 1.99 MB | opaque | Organisations and systems | approved |
| `abstract-ch10(2).png` | 1024 x 1044 | 2.11 MB | opaque | Speaking and media | **source file corrupt — rebuilt** |
| `abstract-ch9(2).png` | 1024 x 1044 | 2.07 MB | opaque | The Nest gateway | approved |
| `tanya-profile.png` | 1254 x 1254 | 3.40 MB | opaque | Tanya's story — the real photograph | approved |
| `book-cover.png` | 1024 x 1536 | 2.65 MB | opaque | Books and tools — Book 1 cover | approved |
| `free-to-be-me-logo.png` (handoff) | 520 x 500 | 0.30 MB | **opaque, cream baked in** | — | **superseded, do not use as supplied** |
| `free-to-be-me-logo.png` (repo `assets/`) | 512 x 550 | 0.07 MB | **transparent** | logo on navy grounds | approved |
| `free-to-be-me-logo.png` (`~/Downloads/nest_branding/assets/`) | 2000 x 2000 | 0.41 MB | **transparent** | master for the above | approved |
| `ch2..ch13` masters (11 files) | 1024 x 1536 | ~3.3 MB each | opaque | **none — chapter names printed in the artwork** | unused in public pages |
| `brand/chapter-1.png` | 1024 x 1536 | 3.1 MB | opaque | real Chapter 1 book artwork (the bridge). Not mapped to a homepage section by the v6 renderer | approved, unmapped |
| `brand/brand-cover-art.png` | 1024 x 1536 | 3.0 MB | opaque | not referenced by the v6 renderer | unused |
| `brand/chapter-4,7,9,11.png` | 1024 x 1536 | — | opaque | byte-identical duplicates of `brand-v2/ch*` | superseded |
| `favicon.svg`, `file.svg`, `globe.svg`, `window.svg` | — | <1 KB | — | scaffold leftovers | unused |

Total supplied weight: **88.4 MB**. None of it ships at that size.

## The abstract crops are derivatives, and the derivation is proven

`abstract-chN` = `chN` cropped to `(0, 492, 1024, 1536)`. Checked against `ch2`: mean absolute
pixel difference **0.0** — pixel-identical. The crop removes the printed chapter title band, which
is why the abstracts are text-free and the masters are not.

## The two corrupt files

`abstract-ch7(2).png` and `abstract-ch10(2).png` have no IEND chunk — they are truncated in the
source zip and fail to decode. Rebuilt from their masters using the derivation above. The rows that
did survive in each truncated file match the rebuild exactly (968 of 1044, and 334 of 1044), so the
rebuilds reproduce the approved artwork rather than substituting for it.

## The logo — resolved

Supplied 11 Sep, `~/Downloads/logo (1)/`:

| file | size | transparency | lettering | use |
|---|---|---|---|---|
| `Logo TM.png` | 5250 x 5250 | 93.3% transparent | **dark** | cream grounds — header, footer, recognition signature |
| `2.png` | 5250 x 5250 | 93.3% transparent | white | navy and dark grounds |
| `logo (1).png` | 6250 x 6250 | 93.3% transparent | white | larger master of the above |

Nothing is keyed, recoloured or derived. The 520 x 500 file inside the code handoff has cream baked
in as an opaque rectangle and is superseded by these; the `mix-blend-mode: multiply` workaround in
the v6 CSS goes with it.

## Palette, measured from the chapter plates

Measured across the seven Book 1 plates supplied 11 Sep, at full resolution, by clustering every
pigment pixel. Not taken from any interface source. This language carries across all eight books, so
the proportions are part of the system, not a rendering of one page.

| measured | share of pigment | role |
|---|---|---|
| `#1db8cf`, `#64cce1`, `#a4e1ee`, `#0b829b` | **62.6% aqua family** | the lead colour |
| `#f84f97`, `#faa4c9` | **24.6% pink family** | the counterweight, never the lead |
| `#dcac66`, `#f5daaa` | **9.5% gold** | seams and flecks only |
| `#d1a7e4` | **3.2% violet** | a whisper, never a field |
| `#fdfcf9` paper | **36.4% of every plate** before any pigment | the breathing space is structural |

Aqua leads pink by about two and a half to one, gold stays under a tenth, violet is a trace. A page
that reverses those ratios stops looking like the books even if every hex is correct.

The interface tokens run deeper than the paint, and that is right: `#082b58` navy, `#d20f69`
magenta and `#6d329d` violet carry type and rules where contrast has to be met, while washes and
tints behind content are sampled from the pigment values above. Both sets are written to
`assets/css/f2bm-tokens.css`.

**Resolution ceiling.** Every plate is 1024 x 1536, including the copies supplied on 11 Sep, which
are the same artwork re-encoded rather than larger masters. Nothing full-bleed at desktop width can
be served without upscaling, which is why the accepted proof uses these in bands and panels. If
larger originals exist they are worth having.

## Missing — required before the affected work can proceed

1. **The v2 Code handoff (SHA-256 `cd2dbbdc8e61164c7decdd50f23b21170798e3dd49d834e84e49cefc667313f6`)
   is not on this machine.** It carries your replaced first-person founder story. That copy will not
   be written from the summary.
2. No photography exists for The Nest or The Practice. Both are served by watercolour artwork, per
   the map above. There is no real-life community imagery in any package.
3. Award badge files exist at `assets/awards/` (39 PNGs). The 10 Sep handoff forbids generic award
   badges, so Recognition is built from the verified totals instead: 12 Gold, 6 Silver, 4 Bronze,
   21 Finalists. Sunshine Coast 2026 entries are nominees and are not counted as finalists.
