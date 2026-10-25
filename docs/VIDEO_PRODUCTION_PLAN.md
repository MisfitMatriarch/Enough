# Expo films: production plan and embed standard

Updated 25 October 2026. **Status: blocked on source access. No video is on the site.**

## Why nothing is published yet

- The expo footage folder shows only `tanyas speech_.mp4` (1.02 GB, the full recording) to Tanya's Drive connector. `Acceptance.mp4`, `tans speech video one.mp4`, `2` to `13`, `tans - i am woman- singing sign off_.mp4`, `tanyas speech_REPAIRED_v2.mp4`, the photographs and dance footage are not visible. They may sit in a subfolder or be shared separately.
- The build environment's network policy blocks `drive.google.com` and `drive.usercontent.google.com`, so files cannot be fetched directly.
- The full recording is source only and must never be published, embedded or linked. Neither is it a substitute for the individual clips Tanya specified.

To unblock: share the individual clips with Tanya's Google account (or move them into the folder itself), and allow the two Google hosts in the environment's network settings. Alternatively, commit the clips to a private location the build can read.

## The three films

| Film | Length | Placement | Purpose |
|---|---|---|---|
| Homepage film | 30–45 s | Beside the homepage opening, after the three routes | Recognition, personality, the meaning of *Less fixing. More living.* |
| Speaking reel | 60–90 s | Speaking page, after the signature keynote | Ideas, delivery, humour, connection with the room |
| Acceptance story | 45–60 s | About page, beside the fuller story; homepage *All of this is me* may use it instead of the photograph | One coherent account: strengths and disability, support, room for joy |

Media page: the three finished films plus organiser-usable cuts, each with a transcript. No raw or numbered clips.

## Editorial method

1. Transcribe every clip (Whisper large or equivalent) and check each line against the audio by ear. Keep timestamps.
2. Choose the strongest sentences Tanya actually said. Keep continuous speech; avoid montage. Preserve qualifications around disability and support.
3. Open each film on Tanya's face and voice within the first two seconds.
4. Use audience reactions only with the moment they respond to.
5. Cut podium adjustments, waiting, camera searches, repeats and unusable sound. Avoid long distant shots; crop only where resolution stays sharp. No upscaling, sharpening or stretching.
6. Music only where rights are established in writing. *I Am Woman* is a commercial recording, so the singing sign-off cannot carry published music without a licence.
7. No stock footage, generated replacements, heavy transitions or generic motivational treatment.

## Brand graphics

Built from the site's own assets, not approximations:

- Paper: `--f2bm-cream #fbf7ef`, `--f2bm-paper #fdfcf9`.
- Headings and title cards: Cormorant Garamond 400/500 (`assets/fonts/cormorant-garamond-*.woff2`) in teal `#08768a` / `--f2bm-aqua-deep #0b829b`.
- Labels, captions and lower thirds: Figtree (`assets/fonts/figtree-var.woff2`), navy `--f2bm-navy #082b58` or white on a navy scrim; magenta `#ab236e` highlight used sparingly; gold `--f2bm-gold-rule #caa45a` hairline.
- Watercolour: the existing ribbon plates (`assets/brand/hero-edge-*`, `speaking-sweep-*`, `footer-band-*`) framing the picture edges only, never over faces.
- Closing frame: original phoenix (`assets/brand/phoenix-dark-480.png`, complete lettering, unaltered proportions), *Less fixing. More living.*, and `tanyahicks.com`, on cream paper with a watercolour edge.
- Captions: burned-in for social cuts only. Web films use WebVTT so captions stay selectable and resizable.

## Delivery specification

- Masters: ProRes or high-bitrate H.264 kept off the site with the originals.
- Web: H.264 High, CRF 21–23, `+faststart`, 1920×1080 and 1280×720 renditions, AAC 128 kbps, loudness normalised to −16 LUFS integrated with clean dialogue EQ.
- Poster: a sharp frame of Tanya mid-sentence, exported as AVIF/WebP/JPEG.
- Captions: `.vtt`, checked line by line against the audio. Transcript: the same text as HTML.

## Embed standard (CSS in `assets/css/living-additions.css`, `.film`)

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

No `autoplay`, `muted` or `loop`. Native controls stay visible. Use `preload="none"` with a poster so pages stay light.

## Quality gate before embedding

Each film is reviewed with sound, muted (captions alone must carry it) and on a phone. Any shot that weakens the edit comes out. Publish only after Tanya approves the cut.
