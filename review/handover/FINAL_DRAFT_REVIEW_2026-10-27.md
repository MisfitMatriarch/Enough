# Tanya Hicks website: final design draft for review

27 October 2026. Branch: `codex/site-polish-final-review`, continued from `d267ea4` on `codex/homepage-brand-release-controls`. This is the current review candidate, including the unpublished menu and book work. Nothing in this note authorises publication, unlocking `main` or changing Netlify settings.

## Tanya’s current instructions

Keep the homepage direction, improve the rejected oversized statement boxes, and bring the rest of the site to the same professional standard. Keep Tanya’s identity and approved wording. Show desktop and mobile before publication. Prepare labelled form tests, **do not submit them**. Some content permissions are approved, but Tanya has not yet specified which; do not assume any individual item is cleared.

## Design changes

- The homepage story is now an editorial film-and-text layout. Six equally weighted sentence cards have been removed. The words remain intact, with a lead, supporting paragraphs and a closing statement.
- The existing portrait, phoenix, watercolour book artwork, teal, magenta and paper palette remain Tanya’s identity. Small labels, cards, type sizes and spacing are more restrained across the site.
- The speaking opening now pairs its existing text with a real panel photograph and a visible enquiry button. Its content and films are unchanged.
- The library opens with the actual covers. Book cards and the reflection page use existing optimised WebP covers rather than multi-megabyte master PNGs. Master artwork is retained. No cover subtitles have been edited or newly approved.
- Enquiry forms have consistent readable labels, focus treatments and paper panels. Their exact form markup, names, fields, hidden values and destinations are unchanged.
- The legacy Systems Change shell now uses the shared navigation, footer and identical Acknowledgement of Country. Its main content is unchanged.
- The browser-only Conditions Audit uses the same paper and teal palette. Its opening hierarchy is clearer. Tool wording and behaviour are preserved, and its questions and generated snapshot are accessibility-tested.
- Low-contrast footer, status, award, optional-field and supporting text has been darkened.
- A branded `404.html`, missing journey/reflection sitemap entries, transcript canonical and noindex directives for all enquiry success pages are included. The reflection canonical and sharing image now use `tanyahicks.com`; no DNS or host settings changed.

## Checks and evidence

Run the unmodified `review/handover/check-site.js` before and after, with the unit tests and production build. It still performs 150 assertions and 18 desktop/phone captures.

The `Site quality` workflow also runs:

1. `python3 scripts/check-site-contracts.py`: 44 built HTML files, local assets/links/anchors, six Netlify form names in seven instances, and the frozen original field contracts from `d267ea4`. It also checks success-page noindex, required sitemap entries, the reflection canonical and the branded 404 file. Deliberately broken links, renamed form fields and removed noindex directives were correctly rejected in temporary fixtures.
2. `node scripts/check-release.cjs`: all 44 HTML routes at 320, 390, 768 and 1400px; one main/H1 except the intentional legacy redirect; no overflow; all speaking and book query selections; nine pages with combined larger text, contrast and reduced-motion modes. The seven prepared local forms are filled and inspected for browser validity and expected field data, **without clicking submit**. The test blocks outbound writes and reservation API requests. 560 checks.
3. `node scripts/check-accessibility.cjs`: automated WCAG 2.1 A/AA scans of 43 rendered pages plus the audit’s questions and generated snapshot. This is not a claim of full accessibility conformance or a human screen-reader audit. Axe’s incomplete results are retained for human review.

The original baseline is not weakened. No reservation functions, reservation stores, package manifest/lockfile, redirects or Netlify settings are changed. The production build still excludes internal files.

Local evidence: `/Users/kingit/Documents/ChatGPT/Enough-final-draft-2026-10-27/`. This directory is outside the checkout and publish output. Before-view images reuse the previously verified captures of the same starting commit `d267ea4`; the new before-check log records the fresh baseline run. Disk exhaustion interrupted earlier screenshot export attempts. After removing an unused local browser-test download, the original baseline was rerun successfully: all 150 assertions and 18 captures completed. The fresh Node 22 tests/build, 560 release checks and 45 accessibility states also pass. Earlier interrupted attempts are not counted as passes.

## Prepared form tests: no submission authority

`form-test-plan.json` contains seven labelled synthetic payloads, one per form location. It uses a reserved `.invalid` address, empty honeypots, and no real client data. It excludes `/api/expo-reservations` entirely.

After explicit permission to submit and Netlify sign-in, verify form detection and the intended notification recipients, submit each labelled case, verify both the correct success page and receipt in the configured recipient inbox, and record the result. A success page alone does not prove delivery. Do not delete records without the appropriate authority. Do not treat the prepared payloads or passing local validity checks as live delivery evidence.

The Netlify Forms dashboard currently presents a login screen in the available browser. No sign-in, notification configuration or live form submission was performed.

## Publication remains held

- Tanya must specify the cleared photo permissions, especially the child on stage, Kianni’s comfort with the About wording, caption listen-through, working book subtitles/hooks and cover artwork alignment. “Some approved” is not an item-by-item approval. The singing remains excluded from the reel.
- Live Netlify form detection, routing and recipient receipt remain unverified; Tanya requested preparation only. Hosted candidate checks now pass: 52 HTTP checks on the PR #12 Netlify preview, including all built page routes, the branded genuine 404, six legacy redirects and exclusion of internal files. This verifies the preview host; production smoke checks still wait for publication authority.
- The unchanged dependency audit reports eight affected package entries: six moderate and two high. The high entries concern the OpenTelemetry Jaeger propagator/SDK chain. Assess and patch under a separately authorised dependency change, or record a justified release decision; do not silently call these fixed or harmless. No dependency upgrades are permitted by the current handover.
- `main` stays protected and locked, with the GitHub Actions `Site quality` check required, administrator enforcement and force-push/deletion protections. GitHub Pages remains disabled. The shared administrator identity still prevents a genuine human-only approval boundary; a separate restricted automation identity is an owner setup task.
- Netlify settings and response-header policy have not been changed. Post-release production verification is necessarily deferred until explicit publication authority.

## Verified hosted draft

The isolated review URL is https://deploy-preview-12--misfitmatriarchenough.netlify.app. The code candidate `6954cb8` passed GitHub Actions branch run `40434327521`, including `Site quality`. The PR run was still in progress when this note was written; do not count it as passed. Verify the latest PR head status before any publication decision and record the result in the PR and local review report. The live homepage response retains SHA-256 `5b778d8689a25fa95fcd8038763f97a61a04f342ad640b83be6fbfb1e70428ae`; `main` remains at `a66b79f` and locked. Both former GitHub Pages URLs still return 404. Later documentation-only commits should retain identical built output and pass the required checks at their own head.

## Review and undo

Review the current branch and the desktop/phone captures before deciding on publication. Closing its draft PR abandons this candidate without changing production. Reverting the new candidate commit on this review branch undoes this pass and keeps the earlier draft history. Do not rewrite history or push a revert to `main` without publication authority.
