# Story composition and colour correction, 15 November 2026

Tanya rejected PR29's maroon palette and competing story typography, requested a clear plan, then explicitly instructed implementation and live publication. This supersedes W16's berry/blush direction and the interim publication pause. Keep the animated turquoise line, real photography, phoenix, book artwork, colourful footer and entrance acknowledgement.

The homepage story now uses a single bounded video/text grid with one heading and consistent 17px reading text. The former oversized quotation and separate display closing are ordinary paragraphs; all original substantive wording remains. A turquoise detail holds the closing belief and a small bright pink underline marks the About link. Legacy story classes have been removed from the homepage so previous section-specific styles cannot keep changing the composition.

The rejected maroon family is removed from active shared CSS. Text and buttons use ink; turquoise, bright pink and gold remain small accents and part of the existing artwork. Large rose surfaces become warm neutral paper. The homepage books are more visible, and the former two-card block becomes a dedicated speaking photograph, introduction, booking link and short-reel link. The existing reflection and email invitation remain the return path. No new claims or testimonials are added.

Baseline and changed unit tests/build pass. Changed static contracts pass for 49 HTML pages, 2,805 local references and seven Netlify form instances across six routes. Local browser script remains unavailable because the matching Chromium executable is absent; required CI and manual hosted browser inspection must pass before merge. No dependency, backend, form contract, price, checkout destination or acknowledgement behaviour changes. No live forms or payments are submitted.

Publication and live verification are recorded in the standing decision register. The separate Free 2b ME Global website is outside this release.
