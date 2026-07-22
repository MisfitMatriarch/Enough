# SESSION HANDOVER — tanyahicks.com

**Last updated:** 2026-07-22
**Live commit:** `6bd85f0` on `main`
**Read this first before touching anything.**

---

## What this repo is

- **Repo:** `MisfitMatriarch/Enough` → serves **https://tanyahicks.com** (Tanya Hicks' personal site).
- **Host:** Netlify. **Auto-deploys on push to `main`.** No build step — static HTML/CSS/JS. Live ~30–60s after push.
- **There is no staging.** Pushing `main` publishes to the public site. Work on a branch, verify, then merge with `--ff-only` and push.
- Do **not** confuse with `The-Nest` (a different site) or `sparklyaliensinc.com`.

### Confirm you are current every session
```bash
cd ~/Enough && git fetch origin && git status -sb
git ls-remote origin refs/heads/main   # remote HEAD should match your local main
```

---

## Page architecture (which CSS drives what)

| Page(s) | Styling |
|---|---|
| `index.html` (homepage) | **Inline `<style>`** — its own full editorial system |
| `work-with-tanya/index.html` | **Inline `<style>`** — its own (the enquiry form page) |
| All 16 interior pages (`books/*`, `frameworks/*`, `speaking/*`, `professional-learning/`, `research/`, `systems-change/`) | **`assets/css/hub.css`** (shared) |
| `books/index.html` also loads | **`assets/css/paired-library.css`** (the paired-book cards) |
| `books/it-shouldnt-be-this-hard/index.html` | **Bespoke, self-contained** light-themed interactive page — its OWN styles/JS. **Deliberate exception** — do NOT force the dark site nav/theme onto it. |

**Editing the shared look = edit `hub.css` once → all 16 interior pages change.** The homepage and Work-With-Me have their own inline styles (change them there too if you touch shared tokens).

---

## Design system (keep consistent across the three style sources)

- **Fonts (self-hosted, SIL OFL, in `assets/fonts/`):**
  - `cormorant-garamond-400.woff2`, `cormorant-garamond-500.woff2` — **Cormorant Garamond**, display only (headings, statements, book titles).
  - `figtree-var.woff2` — **Figtree** variable 300–900 — body + all interface text.
  - `html{font-synthesis:none}`, `font-display:swap`, preload Figtree + Cormorant-500 above the fold.
  - **Gotcha:** subset fonts lack `→` and `☰`. Arrows resolve via the system stack; the hamburger is CSS-drawn.
- **Type scale:** CSS custom props `--fs-*` (fluid `clamp()`). **Every `clamp()` calc needs spaces around `+`** (`6vw + 18px`, not `6vw+18px`) — no space = invalid CSS = silent fallback. This bit us once.
- **Colour roles:** ink grounds; cream primary text; soft/muted greys for elaboration; **gold = sovereignty/concepts**; **teal = links/actions**. Don't add pink/purple.
- **Nav (identical on every page, `aria-current` on the active one):**
  `Home · Human Sovereignty · Books · Frameworks and Tools · Speaking · Professional Learning · About · Work With Me`
  On interior pages: Home→`/`, Human Sovereignty→`/#question`, About→`/#about`. **"Frameworks and Tools" (spelled out), "Work With Me" everywhere.**
- **Footer (identical):** `Human Sovereignty · Books · Frameworks and Tools · Speaking · Professional Learning · Work With Me`.

---

## Copy rules (HARD — Tanya is very exacting here)

- **Canonical hero, character-for-character** (hero + the 3 meta descriptions):
  > People cannot truly become their authentic selves unless they have sovereignty over their own lives.
  Do NOT revert to "authentically themselves". "their authentic selves" is the locked concept, used site-wide.
- **House style:** NO em dashes (plain hyphens only). **Australian spelling** (-ise, colour, behaviour, organisation, programme, practise=verb/practice=noun). **"Autistic" capitalised, identity-first.** **Curly apostrophes `’`** in prose (not straight `'`).
- **Terminology:** `neuroaffirming` (one word); `neurodiversity-affirming` (hyphenated compound modifier); `Behaviour Support` / `Positive Behaviour Support` capitalised.
- **Keynote facts:** event = **NATCA 2026**, length = **23 min**. Keep consistent (homepage tag + transcript).
- **Do not make unrequested copy changes.** When in doubt, flag it — don't rewrite. (Tanya reverted an over-eager copy pass this session; the rule is: fix only what's asked/objectively wrong, surface the rest.)

---

## Enquiry form (WORKING — do not break)

- `work-with-tanya/index.html` — a **Netlify Form** named **`book-tanya`** (hidden `form-name` input + `data-netlify`).
- Netlify emails submissions to **tanya@neurodivergentempowered.com** (from `formresponses@netlify.com`, subject "From TanyaHicks website"). **Confirmed delivering 2026-07-22.**
- If you change the form: keep `name="book-tanya"` and the hidden `form-name` field, or submissions/notifications break.

---

## Verifying like this session did (headless Chrome + pymupdf available)

- **Screenshots / render checks:** `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --disable-gpu --hide-scrollbars --window-size=W,H --virtual-time-budget=NNNN --screenshot=out.png URL`.
- **True mobile (390px):** headless clamps its own window to **500px minimum**, so a `--window-size=390` screenshot is really 500 cropped. For a genuine 390 test, load the page in a **390px-wide iframe inside a same-origin page** (serve the repo with `python3 -m http.server`) and measure `scrollWidth`/`scrollX`/overflow inside the iframe. Cross-origin (file:// parent, http:// iframe) is blocked — serve the probe page from the same http server.
- **Overflow test that matters:** `w.scrollTo(400,0); w.scrollX===0` means no horizontal scroll (clip works even when `scrollWidth` still reports wide).
- **Fonts loaded:** `document.fonts.check('40px "Cormorant Garamond"')`.
- Verify against the **live URL** after deploy, and always confirm the deploy landed (poll for a known new string) before claiming done.

---

## Current state (all live, verified)

- Homepage rebuilt to Tanya's brief: sovereignty hero over the crack film → central question + 10 conditions → corridor thesis → "I teach the conditions" → outward → seed film → Practice Library → NATCA 2026 keynote → frameworks → speaking → About → where the work lives → closer.
- Whole site on one type system, one nav, one footer, "Work With Me" throughout.
- Mobile: **no horizontal scroll on any page**, including the interactive starting-line graphic (`it-shouldnt-be-this-hard`, made mobile-friendly by hiding the floating runner labels ≤560px and relying on tap-to-reveal).
- Proofread + typographically consistent (curly apostrophes, "people and families", NATCA 2026 / 23 min, neurodiversity-affirming).

## Open / to-know

- **Delete two test form submissions** ("SITE TEST", "SITE TEST 2") from Netlify → Forms → book-tanya.
- Homepage frameworks heading says **"Turning ideas into practice"** while the Frameworks page says **"From principle to practice"** — a deliberate leftover from a copy-lock, not a bug. Only change if Tanya asks.
- `it-shouldnt-be-this-hard` prose was covered by objective sweeps (spelling, em dashes) but **not** a word-by-word read of its ~2300 lines.
- Two Code sessions may share this repo — `git fetch` + rebase/ff-only before every commit; stage only your own files; never `git add -A` blindly if the other session is mid-edit.

---
*Update this file whenever you ship something material, and bump the "Last updated" + "Live commit" at the top.*
