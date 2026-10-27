# Dependency repair and reservation verification

27 October 2026. Current branch: `codex/dependency-hardening-comparison`, continuing full-site draft `df5bd8e`. Review: [draft PR #13](https://github.com/MisfitMatriarch/Enough/pull/13), [isolated preview](https://deploy-preview-13--misfitmatriarchenough.netlify.app/). The complete visual candidate is retained. Nothing here authorises publication.

## Authority and applied scope

Tanya first authorised targeted dependency repair and available release checks, with no form submissions or production publication. She then explicitly approved the prepared reservation verification change: **“Apply and test the verification fix.”** That approval covers the read-back checks now applied in `netlify/lib/reservations.mjs`. It does not clear individual photo/content approvals, permit real-record access or authorise submitting website forms.

- Exact `@netlify/blobs` updated from `10.5.0` to `10.7.13`, retaining version 10. The locked chain now uses `@netlify/otel@6.0.6`, core `2.8.0`/`2.9.0` and trace SDK `2.9.0`; the Jaeger propagator is absent.
- The advisory audit fell from eight affected package entries (six moderate, two high, representing two underlying advisories) to **zero reported vulnerabilities**. The required workflow now runs `npm audit --omit=dev --audit-level=low` after the locked install and before installing browser test tooling.
- The reservation handler now verifies the stored reservation fingerprint after a claimed write, then verifies the separate consent record’s reservation ID, choice, version and wording before returning `saved: true`. Missing, contradictory or unreadable confirmation takes the existing HTTP 503 error path. Existing conflict handling and idempotent retries are retained.
- The function entry point in `netlify/functions/`, strong-consistency configuration, preview/production namespace separation, record formats, form names/fields, routing, retention and Netlify settings are unchanged. No real records were read or written.
- All 568 built static files have the same SHA-256 hashes as the starting visual draft. No public wording or design changed in this repair.

Sources: [Netlify changelog](https://github.com/netlify/primitives/blob/main/packages/blobs/CHANGELOG.md), [OpenTelemetry Baggage advisory](https://github.com/open-telemetry/opentelemetry-js/security/advisories/GHSA-8988-4f7v-96qf), [Jaeger propagator advisory](https://github.com/advisories/GHSA-45rx-2jwx-cxfr).

## Failure found and corrected

At pre-fix commit `b4982be`, the installed SDK reported `modified: true` when an injected transport rejected a conditional write with HTTP 403. The old handler consequently returned `saved: true` even with an absent reservation or consent record. Three new regression cases reproduced this, both locally and in GitHub Actions. It is evidence of a failure mode, not evidence that an actual customer lost data.

The vendor tracks the SDK behaviour in [netlify/primitives issue #741](https://github.com/netlify/primitives/issues/741). The inspected latest `11.1.6` package still contained the same status-handling branch. The site therefore confirms the records itself rather than relying only on the SDK’s write result. Strong consistency was already configured by the untouched function entry point. This adds a read after a new reservation write and a read for consent confirmation; if confirmation is unavailable, the caller receives the safe retry error instead of an unverified success.

`tests/blobs-contract.test.mjs` uses the actual installed SDK with injected in-memory HTTP transport, dummy credentials and `.invalid` hosts. It covers conditional headers/JSON, concurrent retries, conflicting request IDs, rejected reads, rejected reservation writes, rejected consent writes and consent repair on retry. No website form or real Netlify storage endpoint is contacted. These tests remain active and unchanged by the fix.

The patch in `prepared-reservation-verification.patch` is retained as the reviewed reference diff. **It has already been applied; do not apply it again.** The former separate-copy result was 17/17; the applied repository now also passes **17/17** on Node 22, including the three previously failing cases.

## Local verification after application

| Check | Actual result |
| --- | --- |
| Pre-fix tests | 14/17 pass, 3 reproduce the storage false-success bug |
| Applied Node 22 test suite | 17/17 pass; no skips or weakened assertions |
| Production dependency audit | Zero reported vulnerabilities |
| Production build and internal-file exclusion | Pass; all 568 static file hashes unchanged |
| Original unmodified browser baseline, before and after | 150/150 assertions and 18 captures in each run |
| All-page links, assets, anchors and frozen form contracts | Pass; 44 HTML pages, 3,224 local references, 7 form instances, 6 form names |
| Responsive and prepared-form checks | 560/560 pass at 320, 390, 768 and 1400px; no submissions or reservation API requests |
| Automated WCAG 2.1 A/AA checks | 45/45 page states with zero detected violations; human review remains separate |

Fresh application evidence is in `/Users/kingit/Documents/ChatGPT/Enough-dependency-comparison-2026-10-27/`, using `before-approved-fix*` and `approved-fix*` files. Earlier advisory investigation and separate-copy logs are historical evidence, not substitutes for the applied checks. Earlier disk-interrupted screenshot attempts are excluded from pass counts.

The prior GitHub runs at `b4982be` correctly failed on the three regressions. **Check the new commit’s `Site quality` status** in PR #13 and the current local verification record; do not treat the old failures or an older green run as the new result. Later CI stages were skipped at the failing old head, while the local checks above completed separately.

## Publication still held

1. Keep all seven prepared synthetic enquiry cases unsubmitted. Real Netlify form detection, routing and recipient receipt still need authenticated review and separate submission authority. A passing local form or hosted thank-you page does not prove delivery.
2. Retain pending photo permissions, especially the child on stage, Kianni’s About wording, human caption checks, and working book subtitles/cover artwork until Tanya specifies which are cleared. The singing remains excluded from the reel.
3. A separate restricted automation identity is still an owner setup task for a genuine separation from Tanya’s administrator identity. Do not claim the current lock alone creates a human-only approval boundary.
4. Keep `main` locked and protected. Show and approve the final desktop/mobile candidate before any explicit unlock or publication instruction. Production smoke checks wait until that authorised release.

The comparison and recommended design follow-up are in `FREE2BME_COMPARISON_2026-10-27.md`. The illustrated comparison is `/Users/kingit/Documents/ChatGPT/Enough-dependency-comparison-2026-10-27/COMPARISON.html`; the full visual gallery is `/Users/kingit/Documents/ChatGPT/Enough-final-draft-2026-10-27/REVIEW.html`.

Undo: closing draft PR #13 abandons this candidate without changing production. Revert the verification follow-up commit on the review branch to undo the handler change; the regression checks should then fail again, correctly blocking release. Do not force-push, unlock or push a revert to `main` without Tanya’s explicit publication instruction.
