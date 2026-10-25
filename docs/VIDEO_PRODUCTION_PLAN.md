# Expo films: production plan and embed standard

Updated 25 October 2026. Internal document: excluded from the published build.
**Status: footage exists and is accessible to Tanya. Files can't yet be transferred into the build environment. No video is on the site.**

## Footage access (corrected)

The individual clips exist in the supplied folder. An earlier note said they were missing; that was wrong. A parent-folder search returned only the full recording because the clips don't report that folder as their parent, and Drive search doesn't index them. Direct lookup by file ID works.

Checked 25 October 2026:

| Route | Operation | Result |
|---|---|---|
| Drive connector (authenticated) | Metadata for `Acceptance.mp4` (128.7 MB), `tans speech video one.mp4` (149.4 MB), `tans speech video 13.mp4` (154.3 MB) | Succeeds |
| Drive connector | `download_file_content` on `Acceptance.mp4` | Fails: *"File too large for download, over limit of 10 MB."* The tool returns base64 inline only and has no streamed-file option. Every clip is over the limit. |
| Direct Google download hosts | `drive.google.com/uc`, `drive.usercontent.google.com/download` | Refused by the environment's egress proxy (CONNECT 403) before reaching Google |
| Drive API | `GET www.googleapis.com/drive/v3/files/{id}?alt=media` | Host reachable; Google returns 403 *"missing a valid API key"*. The environment holds no Google credential, and the connector's sign-in isn't exposed to the shell. |

**To unblock:** store a read-only Google Drive credential in the environment settings as a network secret, read as `GOOGLE_DRIVE_TOKEN` (an OAuth access token with `drive.readonly`, or a service account the folder is shared with). Files then download through the Drive API, which is already reachable. Alternatives: allow `drive.usercontent.google.com` and share the clips by link, or place the clips in private storage the environment can read.

The full recording (`tanyas speech_.mp4`) and the repaired full recording are never used as a substitute source, and are never published, embedded or linked. Numbered clips are source material only.

## Three films, three jobs

Each film has its own spine. None is a shorter version of another, and each uses different lead material.

| Film | Length | Placement | Editorial job | Built around |
|---|---|---|---|---|
| **Homepage film** | 30–45 s | Homepage, after the three opening routes | Recognition. A first-time visitor sees themselves and hears what *Less fixing. More living.* means | One clear, quotable passage that states the idea, opening on Tanya's face and voice; sparkle and warmth from the dance footage at the turn; ends on the brand line |
| **Speaking reel** | 60–90 s | Speaking page, after the signature keynote | The booking decision. An organiser sees what they'd get: substance, delivery, humour, the room responding | Two or three coherent passages across different moments of the speech, each allowed to land, cut against genuine audience responses to those exact moments; closes on the call to bring Tanya into the room |
| **Acceptance story** | 45–60 s | About page beside the fuller story; may later replace the photograph in *All of this is me* | Story. One continuous account of accepting strengths and disability, putting assistance in the plan, and making room for joy | `Acceptance.mp4` as an unbroken spoken line, with B-roll laid over the words (never replacing them), resolving into joy |

Media page: the three finished films for organisers and producers, each with a transcript. Social cut-downs come after the website films are approved.

## Editorial approach

Coherent speech, purposeful cutting. Montage isn't the enemy; meaningless montage is.

1. Transcribe every clip and check each line by ear against the audio, with timestamps. Choose passages before choosing shots.
2. Keep each spoken passage intact enough to carry its meaning, including Tanya's qualifications around disability and support. Never splice words into a sentence she didn't say.
3. Within and between passages, cut with purpose: to Tanya's movement, to relevant imagery (the stage, the expo, the dance footage, approved photographs), and to genuine audience responses at the moment they respond. A cutaway must add energy or meaning, not cover a gap.
4. Bring Tanya's face and voice in within the first two seconds of every film.
5. Remove podium adjustments, waiting, camera searches, repeats and unusable sound.
6. Prefer close and mid shots. Crop only where resolution stays sharp; never upscale, stretch or artificially sharpen.
7. Music only where rights are established in writing, mixed under the voice. *I Am Woman* is a commercial recording: the singing sign-off can't carry it in a published edit without a licence.
8. No stock footage, generated substitutes, decorative transitions or generic motivational treatment.

## Brand graphics

Reference: Tanya's three supplied screenshots of the homepage book series (25 October 2026). Use original assets and existing styles only; nothing redrawn or approximated.

- **Paper:** warm ivory and cream, `--f2bm-cream #fbf7ef`, `--f2bm-paper #fdfcf9`, `--f2bm-cream-deep #f6ecdf`, with the soft diagonal paper tone seen behind the series.
- **Watercolour movement:** the existing ribbon artwork (`assets/brand/hero-edge-*`, `speaking-sweep-*`, `footer-band-*`) in turquoise, aqua, deep blue, pink, magenta and violet with fine gold. Frame the picture edges and title cards; never cover faces or footage.
- **Titles:** Cormorant Garamond 400/500 (`assets/fonts/cormorant-garamond-*.woff2`) in teal `#08768a`.
- **Labels and lower thirds:** Figtree (`assets/fonts/figtree-var.woff2`), tracked uppercase in teal as in "FOR LIVING IT."; body and caption text in deep navy `--f2bm-navy #082b58` / `--f2bm-ink #18334f`.
- **Accents:** magenta `#ab236e` used sparingly, as in the series numerals; gold hairlines `--f2bm-gold-rule #caa45a`, as in the pre-order buttons.
- **Logo:** the original phoenix (`assets/brand/phoenix-dark-480.png`) with its complete lettering and proportions.
- **Closing frame:** phoenix, *Less fixing. More living.* and `tanyahicks.com` on ivory paper with a watercolour edge.
- **Captions:** web films use WebVTT so captions stay selectable and resizable; burn-in for social cuts only, in Figtree on a soft navy scrim.

## Delivery specification

- Masters (ProRes or high-bitrate H.264) are kept with the untouched originals and never published.
- Web: H.264 High, CRF 21–23, `+faststart`, 1920×1080 and 1280×720, AAC 128 kbps, dialogue cleaned and normalised to −16 LUFS integrated. Shots colour-matched with restraint.
- Poster: a sharp frame of Tanya mid-sentence, in AVIF, WebP and JPEG.
- Captions `.vtt` checked line by line against the audio, with the matching HTML transcript.

## Embed standard (`.film` in `assets/css/living-additions.css`)

```html
<figure class="film">
  <video controls preload="none" playsinline poster="/assets/video/homepage-film-poster.jpg" width="1920" height="1080" aria-describedby="homepage-film-transcript">
    <source src="/assets/video/homepage-film-1080.mp4" type="video/mp4" media="(min-width: 900px)">
    <source src="/assets/video/homepage-film-720.mp4" type="video/mp4">
    <track kind="captions" src="/assets/video/homepage-film.en.vtt" srclang="en" label="English" default>
  </video>
  <figcaption>Tanya Hicks · Empowering Women Expo, Sunshine Coast, 2026</figcaption>
  <details><summary>Read the transcript</summary><div class="transcript" id="homepage-film-transcript">…</div></details>
</figure>
```

No `autoplay`, `muted` or `loop`. Native controls stay visible. `preload="none"` with a poster keeps pages light.

## Quality gate

Each film is reviewed with sound, muted (captions must carry it alone) and on a phone. Any shot that weakens the edit comes out. Films go on the site only after Tanya approves the cut.
