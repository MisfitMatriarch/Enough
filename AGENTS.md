# Instructions for AI agents (Codex, ChatGPT, Claude and others)

This repository is the public website **tanyahicks.com**. Netlify publishes the `main` branch automatically, so **anything merged or pushed to `main` goes live immediately**. There is no staging.

## Read this first, in full, before doing anything

**`review/handover/HANDOVER_2026-10-27.md`**

It records where the last agent (Claude Code) stopped, Tanya's latest decisions and what each one supersedes, which sources win when they conflict, what you may and may not change, the contracts you must not break, and how to prove your work.

## Where the current work is

- `main` is the live site.
- Unpublished work: branch **`claude/confident-galileo-jsna30`**, draft pull request **#8** (https://github.com/MisfitMatriarch/Enough/pull/8). Start new work from that branch, not from `main`, or you will miss the newest menu, homepage and book changes.
- The original handover is also available on `main`; newer follow-up notes are listed below.

## Current review and release controls (27 October 2026)

- The homepage brand pass and release workflow are on `codex/homepage-brand-release-controls`, based on the unpublished draft plus the handover refresh. Review that branch before starting overlapping work.
- `main` is protected and locked for Tanya’s desktop/mobile draft review. Do not unlock it, merge, push to it or publish without her explicit publication instruction. The required status is `Site quality`; its Node 22 workflow is in `.github/workflows/site-quality.yml` on the review branch.
- The unintended GitHub Pages site was disabled. Netlify remains the production host. `review/` is excluded from Netlify’s build, but this GitHub repository is public, so internal notes are not private files.
- Read `review/handover/RELEASE_CONTROLS_2026-10-27.md` for the applied settings, identity limitation and release procedure.

## Non-negotiable limits

1. Your first reply is **read-only**. Confirm the current state against the actual files and say what you would change and what is uncertain. Edit nothing until Tanya approves.
2. Work on a **new branch** (for example `codex/<short-task-name>`) created from `claude/confident-galileo-jsna30`, and deliver a **draft** pull request.
3. **Never push or merge to `main`, and never deploy.** Only Tanya authorises publishing, explicitly.
4. Never force-push or rewrite history. No dependency upgrades, broad refactors or unrelated clean-up.
5. Do not touch `netlify/functions/` (the book reservations store real people's names and emails), Netlify settings, form names or form fields.
6. Before and after every change, run `npm test`, `npm run build` and `node review/handover/check-site.js`, and report the real results. Never weaken a check to get a pass. Never claim a browser check you did not run.
7. Australian spelling ("program", not "programme"), curly apostrophes, no em dashes. Never invent facts, testimonials, dates, endorsements or outcomes.

If anything here conflicts with Tanya's latest explicit instruction, her instruction wins. Name the conflict before acting on it.
