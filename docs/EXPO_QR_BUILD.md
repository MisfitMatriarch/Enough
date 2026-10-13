# FREE 2B ME expo page

The new destination is `/free2bme/` on `free2bme.global`. This repository remains the existing Netlify website. The homepage and existing book and enquiry forms are unchanged.

## Build and review

Run `npm ci`, `npm test`, then `npm run build`. Netlify uses `netlify.toml` to publish `dist` and bundle the new reservation function. Static website directories and existing redirects are copied into `dist`; source code, private configuration, tests and review files are excluded. The tracked `free2bme/index.html` is generated from `content/expo.json` by `scripts/build-expo.mjs`.

Book covers, descriptions and A$39 prices are reused from the existing book library. All eight titles already have reservation actions in that library. Optional professional reading is expandable. Reservations collect name, email and one or more titles. No payment is taken. The form shows success only after saving the reservation and the separate consent record. Retries use one request ID; concurrent writes use conditional creation. No contact details or reflections go to analytics.

## Configuration

Edit `content/expo.json` and rebuild. An approved founder requires `id`, `name`, `business`, `image`, `imageAlt`, `makesPossible`, an HTTPS `contactUrl`, and `approved: true`. `stall` is optional and hides after the expo through the page script. Remove stall text from configuration after the event as well, for visitors without JavaScript. No profiles are currently supplied, so the founder section and navigation link are absent.

The reflection wording is available as HTML and printable without an email. The PDF is a draft in `review/more-room-for-me.pdf`. Rebuild it with the bundled Python runtime using `scripts/create-reflection.py`. Once Tanya approves it, set `reflection.approved` to true. The build then copies the PDF into the public assets and displays the download/open links and size. Until then the draft PDF is excluded from deployment. The future reflection tool and paid plan remain false; the build refuses to publish if either is enabled before a separate implementation.

## Private reservations and staff access

The server uses Netlify Blobs with strong consistency and conditional writes. Production stores are `expo-reservations-production` and `expo-consents-production`. Preview stores include their deploy ID and cannot touch production records. The public endpoint only accepts POST requests from the same website origin. It validates title IDs against approval settings, bounds the request body, applies a honeypot and declares a Netlify rate-limit rule of 20 requests per domain/IP per minute. Check the deploy log confirms that rule is accepted.

Authorised staff can inspect/download reservations and consent JSON in the site's authenticated Netlify Blobs dashboard. A local staff export utility is available as `node scripts/export-expo-reservations.mjs`, using private environment variables `NETLIFY_SITE_ID` and `NETLIFY_AUTH_TOKEN`. It writes a private CSV to the ignored `private-exports` directory and protects cells from formula injection. Never commit or upload exports to public assets. There is no public listing, export or deletion endpoint. These records do not appear in the existing Netlify Forms dashboard and its form email notifications do not apply. No transactional email service is configured for this new pathway; the page does not claim an acknowledgement was emailed. Use the approved contact email for changes, cancellation, access or deletion requests. Review the new privacy notice before production use and set the staff retention process for completed/cancelled reservations and consent records.

Only the hosting platform receives technical traffic data. Page analytics are DOM events under `f2bm:analytics` for an existing adapter to consume; no analytics vendor or remote beacon is added. PDF click events mean link clicks, not completed downloads. Reservation successes contain title IDs only, and count reservations rather than revenue.

## Before printing the QR

1. Review and approve the PDF and any founder profiles.
2. Merge the tested branch through the normal repository process, then inspect Netlify's deployment and rate-limit logs.
3. Verify `https://free2bme.global/free2bme/` and the approved PDF on iPhone Safari and Android Chrome, including keyboard, screen-reader, 200% zoom and 320 px layout checks.
4. Submit a clearly labelled test reservation from a deployment preview; inspect its private preview store and separate consent. Verify retries, failure messages and no payment. Check a production test after deployment and remove test records through authorised staff access.
5. Generate SVG and high-resolution PNG QR assets with `scripts/create-expo-qr.py` only after the public destination works. The script refuses to generate until the PDF is approved and the published page and PDF respond correctly. It requires Python with `qrcode` and Pillow. Scan an actual-size printed proof on two phones. Print the short URL beside it. Do not claim the QR was verified without these checks.

Local validation covers request validation, private read rejection, saving, concurrent/retried submissions, failed storage, consent recovery and content approval gates. It does not certify Netlify runtime persistence, domain routing, mobile browser layout, notification delivery or a printed QR scan.

Primary implementation references: https://docs.netlify.com/build/data-and-storage/netlify-blobs/ and https://docs.netlify.com/build/functions/api/ and https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/
