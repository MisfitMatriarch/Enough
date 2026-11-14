# Featured recognition correction, 14 November 2026

Tanya rejected the two emerging-business awards shown on the PR #24 speaking preview and asked for stronger recognition. This is a focused continuation of that preview, based on `d0f72dae9aed76381da1e6fcea44d1fc53c33966`. It supersedes that pair as the featured selection, not their inclusion in the full historical record.

Speaking now leads with Tanya's individual international recognition:

- 2026 Big Idea, first place, Women Changing the World Global Awards, Paris. Current organiser results: https://wcwawards.com/winners-2026.
- 2025 Woman in Education, Children's Education, first place, Women Changing the World Global Awards, London. Current organiser results: https://wcwawards.com/winners.
- 2024 Gold Stevie, Female Executive of the Year, Government or Non-Profit, 10 or Less Employees, as CEO of Sparkly Aliens Inc. Exact category and attribution are in Tanya's September 2026 awards record and media kit, consistent with her supplied December 2024 results. The former Stevie results URL now redirects to its homepage; no claim of current primary-source medal verification is made. The card links to the accurately attributed entry in the site's full record.

The homepage's featured recognition now uses the 2026 Big Idea win. The media and speaking references use the full Stevie category and recipient context instead of the loose 'Global Female Executive' label. No shortlisted category has been promoted to a win.

Design: three responsive award cards, a prominent deep-teal lead card, serif category titles, readable dates and recipient details, and direct results/details links. Existing forms, films, transactions and the moving homepage ribbon are retained.

Validation before and after: 18/18 unit tests and production build pass. After-change contracts pass for 48 HTML pages, 3,516 local references and seven Netlify form instances across six routes. Local baseline browser execution is blocked by the missing bundled Chromium executable; hosted preview inspection and final-commit CI must be recorded separately. No production publication or form submission. Undo with a revert of this focused commit on the draft branch.
