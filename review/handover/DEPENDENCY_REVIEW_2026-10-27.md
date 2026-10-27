# Dependency repair and remaining release checks

27 October 2026. Current branch: `codex/dependency-hardening-comparison`, continued from full-site draft `df5bd8e`. The original visual draft is retained, including the replacement for Tanya’s rejected statement-box screenshot. No publication is authorised.

## Authority and scope

Tanya explicitly requested: “Fix the dependency issues and complete the remaining checks you can. Keep the form tests unsubmitted and don’t publish anything until I approve the final draft.” This authorises the targeted dependency update despite the original handover’s no-upgrades rule. It does not silently clear the reservation-code approval boundary or individual photo/content approvals.

## Dependency findings fixed

- Exact `@netlify/blobs` version updated from `10.5.0` to `10.7.13`, retaining version 10 rather than moving unnecessarily to version 11. The locked transitive chain now uses `@netlify/otel@6.0.6`, core `2.8.0`/`2.9.0` and trace SDK `2.9.0`; the Jaeger propagator is absent.
- Before: eight affected package entries, six moderate and two high. These represent dependency chains for two underlying advisories, not eight independent exploits. After: **zero reported vulnerabilities**. A fresh Node 22 locked install and production-only audit confirm this.
- The required `Site quality` workflow now runs `npm audit --omit=dev --audit-level=low` immediately after `npm ci`, before installing the separate browser test tools. Audit failures remain failures.
- All 568 built static files have identical SHA-256 hashes to the starting draft. No public wording, visual assets, form fields, redirects, Netlify settings or reservation implementation changed in this dependency pass.

Sources: [Netlify package changelog](https://github.com/netlify/primitives/blob/main/packages/blobs/CHANGELOG.md), [OpenTelemetry Baggage advisory](https://github.com/open-telemetry/opentelemetry-js/security/advisories/GHSA-8988-4f7v-96qf), [Jaeger propagator advisory](https://github.com/advisories/GHSA-45rx-2jwx-cxfr). A clean advisory audit is not proof that every runtime behaviour is correct.

## Newly reproduced release blocker

The previous eleven unit tests inject simple stores. New tests in `tests/blobs-contract.test.mjs` exercise the actual installed Netlify SDK with an injected in-memory HTTP transport, dummy credentials and reserved `.invalid` hosts. They neither submit website forms nor connect to Netlify storage.

The SDK sends the conditional write header correctly and supports JSON reads, concurrent retries and conflict rejection. However, an HTTP 403 conditional-write rejection returns `modified: true`. The existing reservation handler consequently returns HTTP 200 with `saved: true` despite an absent reservation or consent record. This is a reproduced failure mode, not evidence that an actual customer has lost data. The inspected latest `11.1.6` package also contains the same status-handling branch, so another version bump does not resolve it.

The vendor tracks this behaviour in [netlify/primitives issue #741](https://github.com/netlify/primitives/issues/741). The tests deliberately expect HTTP 503 when a write cannot be confirmed. They are active release guards, not skipped, weakened or relabelled as passes.

Prepared fix: `prepared-reservation-verification.patch`. It changes only `netlify/lib/reservations.mjs`: after a claimed reservation write, read back and verify its fingerprint; before success, read back and verify the consent record’s reservation ID, choice, version and wording. Strong consistency is already configured by the untouched function entry point. Failed confirmation enters the existing safe HTTP 503 path; retries remain idempotent. This adds storage reads per new reservation and per consent confirmation and must be reviewed as a runtime change. It does not alter namespaces, fields, record shape, routing or retention.

The exact proposal has been exercised as a separate local copy against all six new SDK tests and the original eleven tests: **17/17 pass on that proposed copy**. It is **prepared, not applied**, pending Tanya’s specific approval under the original handover’s reservation-code restriction. The actual entry point and handler remain unchanged. Do not call the candidate release-ready or disable these tests to obtain a green check.

## Completed checks

| Check | Actual result |
| --- | --- |
| Fresh Node 22 locked install and advisory audit | Pass; zero reported vulnerabilities |
| Original unit tests | 11/11 pass |
| Actual-SDK regression tests on unchanged handler | 3/6 pass; 3 expose false success or failed consent-retry behaviour |
| Proposed fix in separate local copy | 17/17 tests pass, including all 6 SDK cases; not an applied-code result |
| Production build and internal-file exclusion | Pass; 568 static file hashes unchanged |
| Original unmodified browser baseline | 150/150 assertions pass; 18 captures |
| All-page link, asset, anchor and form contracts | Pass; 44 HTML pages, 3,224 local references, 7 form instances, 6 names |
| Responsive and prepared-form checks | 560/560 pass across 320, 390, 768 and 1400px; no submissions or API requests |
| Automated WCAG 2.1 A/AA checks | 45/45 page states have zero detected violations; human checks remain separate |
| Production hold | Homepage SHA-256 unchanged; `main` remains locked and protected with `Site quality` required |

The first after-change screenshot attempt hit local disk exhaustion and is not counted as a pass. Its separate rerun completed. Evidence lives outside the publish directory at `/Users/kingit/Documents/ChatGPT/Enough-dependency-comparison-2026-10-27/`.

## Still held

1. Apply and verify the prepared storage confirmation fix only after its specific approval. The current real-SDK failures are a release blocker even though the advisory findings are fixed.
2. Keep all seven synthetic enquiry payloads unsubmitted. Real Netlify form detection, notification routing and recipient receipt still need authenticated review and separate submission authority.
3. Retain pending photo permissions, especially the child on stage, Kianni’s About wording, human caption checks, and book subtitle/cover approvals until Tanya identifies exactly which are cleared.
4. A separate restricted automation identity is still needed for a genuine separation from Tanya’s administrator identity. Do not claim the present lock alone creates a human-only approval boundary.
5. Show and approve the final desktop/mobile candidate before any explicit unlock/publication instruction. Production smoke checks necessarily wait until that authorised release.

The comparison and recommended next design pass are in `FREE2BME_COMPARISON_2026-10-27.md`. They are advice, not newly published wording. The complete visual gallery remains `/Users/kingit/Documents/ChatGPT/Enough-final-draft-2026-10-27/REVIEW.html`.

Undo: close the new draft PR to abandon this dependency follow-up without changing production. Revert its commit on the review branch to restore the prior locked dependency tree. Never push a revert to `main`, force-push, unlock or merge without Tanya’s explicit publication instruction.
