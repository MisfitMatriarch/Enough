# Acknowledgement at the entrance only

## Current owner instruction

On 15 November Tanya asked to remove the repeated Acknowledgement of Country block from every page because it belongs at the entrance to the website. This supersedes the recent choice to remove the entrance and retain full page sections.

The same conversation clarifies that Free 2b ME Global is the public brand and Tanya Hicks is its legal owner. That distinction is recorded for the wider audit; this focused change does not redesign the brand, rewrite the acknowledgement or alter legal claims.

## Implementation

- Convert the 45 shared page sections to native dialogs, outside ordinary page flow.
- Apply the same entrance-only behaviour to the generated reflection page and its source snapshot.
- Show the acknowledgement on the first page entered in a tab visit, then remember dismissal with the existing `f2bm-aoc` session key.
- Preserve a footer link to reread it. Native dialog behaviour provides modal focus containment and Escape; closing returns focus to the originating link or main content.
- Without JavaScript, the footer anchor reveals the text and a Back to page link returns to content. If session storage is unavailable, do not repeatedly interrupt navigation.
- Preserve the existing acknowledgement wording, including the shorter existing reflection-page wording. Keep all form names, fields, checkout destinations and reservation functions unchanged.

## Validation

Before and after: 18 unit tests and production build pass. The after-change source/asset/form check passes for 48 HTML pages, 2,865 local references and seven Netlify form instances across six routes.

The local browser baseline could not launch: the bundled browser was absent, the browser download failed, and installed Chromium is blocked from creating its process socket in this environment. No checks were weakened. The required GitHub Site quality workflow runs the unchanged desktop/phone checks and a new entrance regression covering first entry, subsequent pages, footer reread, Escape, focus return, accessibility and the no-JavaScript fallback.

No live forms, reservations or payments were submitted. Publication must use the existing PR and Site quality protections; no administrative bypass or protection change.
