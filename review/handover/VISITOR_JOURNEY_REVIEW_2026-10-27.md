# Visitor journey and brand refinement draft

27 October 2026. Branch `codex/visitor-journey-polish`, based on the verified reservation/dependency candidate `43896ac`. Tanya authorised applying the FREE2BME comparison improvements, keeping her identity, and showing desktop and mobile before any publication. She confirmed the enquiry response window as **48 hours**. Do not silently turn this into two business days.

## Applied improvements

- A distinct Enquire action accompanies the existing Life, Work and About navigation. The mobile header keeps both journey menus visible, including at 320px. The action opens the full enquiry page so its guidance is available before the form.
- The homepage opening includes direct book, speaker/MC and professional learning links within its existing hero. The Life/Work route structure remains, without separate duplicate Books or Speaking homepage sections.
- The speaking page surfaces two sourced 2025 AusMumpreneur results: Gold for Emerging Non-Profit Business and Silver for Emerging AusMumpreneur of the Year. Both link to the organiser’s [official winners list](https://ausmumpreneur.com/2025-ausmumpreneur-awards-winners/). A small sourced recognition note also sits within the existing Meet Tanya section. No new testimonials or provider-scope claims were invented.
- Speaking and general enquiry pages explain three next steps: the enquiry, a reply within 48 hours, and agreement on fit, access, dates, scope and fees. Their thank-you pages use the same response window. All eight form blocks, including the generated reservation form, remain byte-for-byte identical to `43896ac`; seven are the frozen Netlify form instances and one is the separate JavaScript reservation form.
- The enquiry opening uses a compact two-column text layout on desktop. Shared card spacing, heading measures, supporting type and image crops follow the same paper/teal system. Tanya’s portrait, phoenix, watercolour, magenta, gold, serif headings and sans-serif supporting text remain.
- `/privacy/` explains the actual enquiry, book/update and reflection flows, the hosting supplier, browser display preferences and the existing privacy contact. Shared footers, the reflection and transcript link to it. The page is in the sitemap. It does not invent a fixed retention period or a named enquiry handler.
- Public introductions have a small optional Listen control when the browser exposes a speech voice. It reads headings and introduction paragraphs, never form values. Keyboard start, Escape stop, completion reset, and the unavailable-voice fallback are tested. This uses a browser/device voice, not a recording or imitation of Tanya’s voice. Real audio pronunciation and human screen-reader checks remain separate.
- Existing films and verified recognition provide evidence of activity. A calendar feed would need current event data and an owner; no unsupported activity feed or future event claims were added.

## Guardrails and evidence

The book/manuscript wording, official Practice step 4, Acknowledgement of Country, existing films/captions, reservation implementation, dependencies, form fields/names/destinations, redirects and Netlify settings are not changed by this pass. No real reservation records or live API endpoints are accessed. Form tests remain local and unsubmitted.

The unchanged original baseline runs before and after. Node 22 runs the 17 tests and production build. All-page contract checks cover the new privacy page, so there are now 45 HTML pages. The existing release and accessibility checks discover routes automatically. The new `scripts/check-visitor-journey.cjs` checks enquiry access at 320/1400px, privacy links, three-step guidance and the approved response window, keyboard speech behaviour, exclusion of form text from speech and the unavailable-voice fallback. Its speech transport is simulated; it cannot send audio or submit forms. The required CI workflow includes this check.

Evidence and review captures are outside the site output at `/Users/kingit/Documents/ChatGPT/Enough-visitor-draft-2026-10-27/`. `REVIEW.html` presents desktop/mobile screenshots of the twelve principal pages and links to the detailed enquiry, recognition and privacy views. Results belong to their recorded source commit; verify current-head `Site quality` before any release decision. No build or passing CI result authorises publication.

## Still to confirm before publishing

Tanya supplied a response window, but not the enquiry access/ownership and retention arrangements. The privacy draft uses verified site behaviour and a contact route; confirm those operational details before treating it as a complete publication notice. Netlify notification routing and actual recipient receipt remain unverified because Tanya has not authorised submissions.

Keep the individual photo permissions, Kianni’s About wording, caption listen-through and working book subtitle/cover decisions pending until Tanya identifies the approvals. The separate restricted automation identity remains an owner setup item. Keep `main` protected and locked until an explicit instruction to publish the exact approved candidate.

Review the complete desktop/mobile draft first. Closing this pass’s draft PR discards it without changing production. Revert this pass on its review branch to restore the previous candidate; never force-push or push a revert to `main` without publication authority.

## Recorded local results

The applied candidate passes 17 Node 22 tests and the production build/internal-file guard; the original before/after browser baseline passes all 150 assertions with 18 captures each. Page contracts pass for 45 pages and 3,374 local references. All 572 responsive/prepared-form checks, 447 visitor-journey checks and 46 automated accessibility states pass. The source form-markup comparison confirms all eight form blocks are byte-identical to the preceding candidate. The initial baseline attempt found the local server was stopped; after starting the local-only server, the full baseline completed. The interrupted connection attempt is not counted as a pass. Current-head CI, hosted preview status, production-hold read-backs and source identity are recorded in the PR and local verification record.
