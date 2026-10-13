# Expo import validation — 13 October 2026

Imported `FREE2BME_Expo_Build.patch` from the supplied archive onto the existing Enough checkout, based on main commit `6a5080827eff644df9ab5103f0ee7d1edb1e1979`. Target destination: `https://free2bme.global/free2bme/`.

## Approval settings

`reflection.approved`, `features.onlineReflectionEnabled` and `features.paidPlanEnabled` remain false. The build excludes the draft reflection PDF from public output and renders no PDF download links. HTML reflection prompts and printing remain available. No payment is taken for book reservations.

## Passed

- `npm ci --cache /tmp/free2bme-npm-cache`: 60 packages installed from the lockfile with normal integrity and TLS checks. The default cache was outside the writable workspace; no dependency or lockfile changes were needed.
- `npm test`: 10 tests passed, none failed or skipped.
- `npm run build`: static output generated successfully in `dist`.
- Netlify Blobs dependency import and syntax checks for the Expo client script and function passed.
- Chromium at 1440, 390 and 320 px: no horizontal overflow or JavaScript errors; eight reservation options; book preselection; separate, unchecked marketing consent; simulated failed storage preserves entered details; simulated retry uses the same request ID; simulated success displays confirmation. Requests were intercepted locally: no live records were submitted.
- Existing homepage, book pages, enquiry forms and redirects are unchanged in Git. Existing page HTML and redirects copied into `dist` match their source bytes.

## Existing homepage test failures, separate from the Expo suite

Both failures were present before the import and remain unchanged:

1. `python3 scripts/check-homepage.py` fails at line 43: `Existing deep-link target removed`. Its pinned historical baseline expects IDs `ecosystem`, `ledger-cost`, `ledger-title`, `living`, `living-title` and `promise-title`, absent from the current homepage. The September handover explicitly says removed homepage sections must not be restored.
2. `python3 scripts/check-homepage-content.py` fails at line 37 because it expects `Every second Monday, 3:30–4:30 pm, starting 21 September 2026.` Main commit `6a50808` intentionally removed the start-date clause during fact correction. The test still expects that old wording.

Neither legacy test nor homepage content was altered to make these checks pass.

## Deployment checks still required

Local validation does not establish live Netlify Blobs persistence, rate-limit enforcement, free2bme.global domain routing, physical iPhone/Android rendering or printed QR scanning. No deployment, production submission or notification delivery was performed. The PDF and future tools remain off pending owner review. Follow `EXPO_QR_BUILD.md` for authorised deployment checks.
