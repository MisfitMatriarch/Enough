# Instructions for AI agents (Codex, ChatGPT, Claude and others)

This repository is the public website **tanyahicks.com**. Netlify publishes the `main` branch automatically, so **anything merged or pushed to `main` goes live immediately**. There is no staging.

## Read this first, in full, before doing anything

**`review/handover/HANDOVER_2026-10-27.md`**

It records where the last agent (Claude Code) stopped, Tanya's latest decisions and what each one supersedes, which sources win when they conflict, what you may and may not change, the contracts you must not break, and how to prove your work.

## Standing website decisions

Before auditing or editing the website, read the [standing website decision register](https://chatgpt.com/library?file_id=libfile_d013685f9c3c81918f33caf5d222258b&account_id=personal). Preserve the broad Tanya Hicks positioning, the withdrawal of the four paid professional learning listings (25 November 2026) and the separate book and free resource pages. An older draft or crawl does not reopen an owner decision. Record any new owner decision and what it supersedes in the register.

## Locked colours, 15 November 2026

Tanya explicitly instructed: “KEEP LOCK THEM IN THE COLOURS”. Preserve the current ivory, ink, blue/turquoise, bright pink, pale blue and warm gold palette, original watercolour artwork and moving turquoise ribbon. Do not replace or neutralise this palette without a new explicit owner instruction. The specifically rejected dark 2026 speaking award card is the exception: use the existing pale blue surface with dark text and retain its gold top edge. This does not authorise other palette changes.

Keep “🎼 play YOURS right 🎼.” together on one line wherever that musical phrase appears. Fit it within the available width on phones instead of breaking between the music signs.

## Where the current work is

- `main` is the live site.
- Start new work on a new branch from current `main`. The October branch and PR #8 references below are historical, and their useful changes have reached production through later releases.
- **15 November 2026 owner instruction:** implement the whole-site review and publish it; investigate older drafts, retain useful work and close superseded PRs without breaking the site. See `review/handover/WHOLE_SITE_REFINEMENT_2026-11-15.md` for scope and draft disposition.
- The original handover remains the historical record. Current owner decisions and the standing website decision register supersede its old branch and draft-only directions.

## Current review and release controls (27 October 2026)

- **28 October owner correction:** the full keynote must not appear on the website. The removal branch `codex/remove-full-keynote` starts from published `main` at `d8013fe`. Remove the full presentation, its full transcript and all public links/claims; retired URLs redirect to Speaking. Never restore these from older branches or handovers. Keep the short homepage film, Acceptance story on About, and short speaking reel. Tanya's removal instruction authorises this focused correction to the live site; it does not authorise unrelated publication or form submissions.
- The current full-site review candidate is `codex/visitor-journey-polish`, continued from `43896ac` on `codex/dependency-hardening-comparison`. Read `review/handover/VISITOR_JOURNEY_REVIEW_2026-10-27.md` for the applied comparison improvements and remaining gates. The dependency/reservation fix and earlier full-site visual work are retained. Start overlapping work from this candidate.
- Tanya subsequently authorised fixing dependency issues and completing available checks, without submitting forms or publishing. This narrowly supersedes the no-upgrades rule for this dependency repair. Tanya then explicitly approved applying and testing the reservation verification fix in `netlify/lib/reservations.mjs`. It is now applied and the actual-SDK regressions pass. The function entry point, storage namespaces, record formats and real records remain untouched. Retain these regression tests and check the latest `Site quality` result before any release; a clean advisory audit alone is not release readiness.
- Tanya authorised the comparison improvements and an enquiry response window of 48 hours. Enquiry ownership/access and retention details are still unconfirmed.
- Tanya authorised prepared synthetic enquiry tests only, with no submissions. Some content approvals are cleared but not yet specified; retain individual pending flags.
- `main` is protected and locked for Tanya’s desktop/mobile draft review. Do not unlock it, merge, push to it or publish without her explicit publication instruction. The required status is `Site quality`; its Node 22 workflow is in `.github/workflows/site-quality.yml` on the review branch.
- The unintended GitHub Pages site was disabled. Netlify remains the production host. `review/` is excluded from Netlify’s build, but this GitHub repository is public, so internal notes are not private files.
- Read `review/handover/RELEASE_CONTROLS_2026-10-27.md` for the applied settings, identity limitation and release procedure.

## Non-negotiable limits

1. Confirm the current state against actual files before editing. Proceed with work already authorised by Tanya; otherwise present the proposed change for approval.
2. Work on a **new branch** (for example `codex/<short-task-name>`) created from current `main`. Keep publication separate from implementation and verification.
3. **Never push or merge to `main`, and never deploy.** Only Tanya authorises publishing, explicitly.
4. Never force-push or rewrite history. No dependency upgrades, broad refactors or unrelated clean-up.
5. Do not touch `netlify/functions/` (the book reservations store real people's names and emails), Netlify settings, form names or form fields.
6. Before and after every change, run `npm test`, `npm run build` and `node review/handover/check-site.js`, and report the real results. Never weaken a check to get a pass. Never claim a browser check you did not run.
7. Australian spelling ("program", not "programme"), curly apostrophes, no em dashes. Never invent facts, testimonials, dates, endorsements or outcomes.

If anything here conflicts with Tanya's latest explicit instruction, her instruction wins. Name the conflict before acting on it.
