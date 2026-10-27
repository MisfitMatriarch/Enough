# Release controls and homepage draft

Tanya authorised this work on 27 October 2026: start the release controls and homepage brand pass, keep Tanya’s own branding, and show desktop and mobile drafts before publishing anything.

## Applied repository settings

- GitHub Pages was disabled. It previously published the root of `main` at `https://misfitmatriarch.github.io/Enough/`, including a rendered copy of the handover. The Pages API now returns 404. Netlify was not changed.
- `main` is protected and **locked** while the draft is under review. Its commit remains `a66b79f20118746e805f45dd22fccf6442ddcc2b`.
- Protection applies to administrators. Force pushes and branch deletion are disabled, conversations must be resolved, and the required status is **`Site quality`**, with the branch required to be up to date.
- Pull requests are required, with zero approving reviews for now. Existing agent-created PRs are authored under Tanya’s `MisfitMatriarch` identity, and GitHub does not allow an author to approve their own PR. Requiring one approval without addressing that identity issue would strand the owner’s PRs.

The lock makes production changes a separate deliberate step. It does **not** create a human-only security boundary while an agent shares the owner’s administrative credentials. Use a separate restricted automation identity and owner-controlled administrative access before claiming that review approvals technically distinguish Tanya from an agent.

## Quality workflow in the draft

`.github/workflows/site-quality.yml` runs on PRs and pushes to the working branches, with read-only repository permissions and no deployment step. It uses pinned action commits and Node 22 to run:

1. `npm ci`.
2. The existing unit tests.
3. The production build, including the internal-file guard.
4. `python3 scripts/check-site-contracts.py`, which checks all built HTML pages, local assets and anchors, duplicate IDs and the six existing Netlify form routes.
5. The unchanged `review/handover/check-site.js`, including desktop and phone screenshots retained as a workflow artifact for seven days.

Playwright `1.62.1` is installed as local CI tooling without saving it to `package.json` or changing the dependency lockfile. Application dependencies, form names and fields, reservation functions and stored reservation data are unchanged.

The workflow is part of the unpublished draft. `main` stays locked even after a successful check. No successful build or CI job is an instruction to publish.

## Homepage draft

- Tanya’s name and FREE 2B ME family identity replace the small “by Tanya Hicks” header treatment consistently across the 39 shared headers.
- The homepage opening uses the existing portrait artwork, established roles, signature phrase and two immediate Life/Work actions.
- The palette, phoenix, watercolour, fonts and approved three-item menu remain. Books and speaking remain under both journeys, with no duplicate homepage sections added.
- Dropdown arrow hit areas are 44 by 44 CSS pixels.
- No book wording, Practice step 4, acknowledgement wording, films, forms or service facts were changed.

## Review and release procedure

1. Tanya reviews the desktop and mobile candidate and requests any changes. Work remains on a separate branch and draft PR; do not merge to `main`.
2. Before an explicitly authorised release, agree the exact candidate commit, complete the release-relevant form and content checks, record the current Netlify production deployment and its rollback route, and verify the required quality status on that candidate.
3. Only after Tanya explicitly authorises publication may the owner deliberately remove the branch lock while retaining PR and quality protections, merge the approved candidate and verify the resulting production deployment. Do not use an administrative bypass as a shortcut.
4. Check the live homepage, both journeys, menu, assets, redirects and authorised form delivery. If a critical route fails, restore the recorded known-good deployment and investigate on the working branch.

Operational form delivery, recipient notifications, a complete caption listen-through, outstanding artwork/permission decisions and a separate automation identity remain outside the completed draft checks. Do not claim they were verified by a local build or browser baseline.

## Evidence and undo

Local before/after logs, review screenshots and settings read-backs are saved at `/Users/kingit/Documents/ChatGPT/Enough-homepage-draft-2026-10-27/`. They are outside the site checkout and publish output.

Close the draft PR to discard the code candidate. The old production site is still running. The owner can manage the branch lock and Pages settings separately; do not re-enable the extra publication or weaken protections as part of undoing a visual change.

## Full-site follow-up

The current review branch is `codex/site-polish-final-review`. Its required `Site quality` workflow also checks all 44 HTML routes at four widths, the seven original form field contracts, prepared form validity without submission, and automated WCAG 2.1 A/AA results. Read `FINAL_DRAFT_REVIEW_2026-10-27.md` for the remaining release gates. The production lock remains in place.
