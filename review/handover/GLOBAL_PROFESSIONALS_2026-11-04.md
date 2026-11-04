# FREE 2B ME Global professional gateway

Prepared on `codex/free2bme-global-professionals`, from current main `a584c9a`. The newer published main contains the visitor-journey candidate, course pages and full-keynote removal; no older branch was restored.

## Changes

The Work page adapts `professionals.html` from MisfitMatriarch/the-nest at `8f5c246330723f87c2215e451b9eda70015f6225`. The two arrangements, geographic/Australian scope, application, proposals, PDFs and participant referral are retained. Global typography, phoenix, paper, teal, magenta and gold are used. Service delivery is attributed to Neurodivergent Empowered. Global books, learning, Practice and speaking remain available below.

The generic opening is adapted for Global. The blanket statement that NDIS changes reduce therapy funding is omitted rather than independently asserted. Payment wording points to the proposal, rather than making an unconditional Global payment promise. Proposal/eligibility terms were inspected in source, not independently certified.

All form destinations remain absolute free2bme.au URLs. Its referral code sends to the existing Supabase leads endpoint; its application uses the existing therapist-practice-enquiry edge function with begin/upload/complete actions. These implementations, fields and stores were not copied or changed. No participant or applicant records were read or written. Live receipt and document delivery have not been tested. The public sites remain inaccessible from this environment's current network policy, so source inspection is not a live-site verification.

## Domain activation, separate from this code draft

The redirect file now sends both Tanya domain forms and protocols to https://free2bme.global with the original path; Netlify normally passes query parameters through. Existing historical redirects remain. Public canonical/social URLs, sitemap, robots and generated reflection settings use Global. Existing site contracts check this new identity.

Before publishing this candidate, confirm free2bme.global and www.free2bme.global are attached to the existing Netlify site `misfitmatriarchenough`, make free2bme.global its primary domain, and confirm valid TLS certificates. An old Netlify primary-domain redirect back to Tanya would create a loop with the new rules. GoDaddy manages tanyahicks.com: retain its connection to this same Netlify site, using the exact DNS records Netlify provides. Do not replace email MX/TXT records or change nameservers merely to redirect the website. GoDaddy masked forwarding is unnecessary. No DNS or hosting settings have been changed here.

After explicit release approval, verify real HTTP redirects for both domain forms/protocols, path and query preservation, TLS, the Global page and external form destinations. The external forms intentionally remain on free2bme.au so existing database, upload and consent behaviour continues. Operational submission tests need separate explicit authorisation and should use labelled synthetic records.

## Validation

Before change: existing test command, build and all 150 desktop/phone baseline assertions passed. After change: test command, production build, all-page contracts and browser baseline passed. Dedicated page checks cover 1400px, 390px and 320px and exact external destinations. Existing form markup was compared to HEAD and is byte-identical. Final results are reported in the task; no deployment or production receipt is implied. Browser uses the installed Chromium override without changing the baseline script. Runtime here is Node 24; CI specifies Node 22.

Review captures are kept outside the publish output under /tmp/enough-before, /tmp/enough-after and /tmp/professionals-*.png. Draft notes are excluded by the build's internal-file guard. Discard the working branch or revert its commit to undo. Main has not been pushed or merged.
