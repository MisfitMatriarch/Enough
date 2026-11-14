# Website copy consolidation, 14 November 2026

Continues the published editorial and Speaking work from main `8d0e749e05b0520de95094fd5e964120ad234b0b` (PR #24). The owner requested removal of duplicated wording across the website and a further review once live. This follow-up uses a new branch from that published state, preserving the restored watercolour footer band and the moving homepage ribbon.

## Result

- Consolidated the Books page into the featured opening and one eight-book catalogue. Removed the duplicate title list, repeated collection explanation and third feature of the first book. Preserved both collection anchors, every book and each reservation destination.
- Shortened repeated homepage introductions and route descriptions. The founder chapter now introduces the organisations rather than repeating the personal story. The two organisation cards use two desktop columns.
- Removed repeated belonging and support explanations from the Life and Work pages, and repeated questions from About.
- Simplified both professional-learning entry routes and all four program pages. Retained the audience, practical example, complete topic list, scope statement, price and exact Stripe destination for each program.
- Removed repeated reading-order and payment explanations from the individual book pages. Reservation terms remain beside the reservation button. Educational scope and access information remain available.
- Consolidated repeated statements in Practitioner Pathway, Frameworks, The Practice and organisational work. Formal practice stages and substantive scope boundaries remain unchanged.
- Kept the reusable short biography and stage introduction. The complete media biography is available in a native keyboard-accessible disclosure. Removed the duplicated contact section and excess quotation list.

The main reading flow across 24 HTML pages drops from 14,893 to 11,568 words (3,325 fewer), excluding navigation, forms, scripts and disclosures in both versions. This includes moving the full media biography into a disclosure rather than deleting it. Necessary recurring navigation, purchase information and book titles remain.

## Verification before preview

- All 18 existing unit and integration tests pass.
- Production build passes.
- All-page contracts pass: 48 HTML pages, 2,866 local references, seven Netlify form instances across six routes.
- Form markup, shared footers and Stripe destinations compared with the published baseline and remain exact.
- `git diff --check` passes.
- Local browser script could not launch because its Chromium executable is absent. The unchanged hosted Site quality workflow provides desktop/phone, responsive, accessibility and visitor-journey validation before merge; direct preview review follows.

No dependency, backend, reservation, form-contract, hosting or security-setting changes. No production form submissions.
