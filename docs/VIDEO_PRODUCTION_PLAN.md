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

**Measured connector ceiling (25 October 2026):** `download_file_content` delivered files of 2.07, 2.38, 2.55, 4.32 and 5.02 MB intact (byte sizes matched, clean decodes). It failed on the 6.45 MB Acceptance review copy, with the connection closed because the message was too large. The practical limit is therefore **about 5 MB per file**. The supplied stage photograph (198 KB) downloaded and verified at 1920 × 1080.

**Quality-preserving transfer within that limit:** split any file into raw parts of 4 MB or less, plus a checksum. The build environment downloads each part and joins them back into the identical original. On a Mac or Linux computer: `split -b 4m "Acceptance.mp4" "Acceptance.mp4.part-"` and `shasum -a 256 "Acceptance.mp4" > "Acceptance.mp4.sha256"`. Upload the parts and the checksum to the Drive folder and share the file IDs. Use this for review copies first. Then, for the final render, use it for only the original passages the edit actually uses, rather than whole 130–150 MB clips.

**To unblock, preferred first: Git LFS from Tanya's computer.** Tested from the build environment on 25 October 2026:

- **Download side (what this environment needs):** GitHub's LFS batch API at `github.com/MisfitMatriarch/Enough.git/info/lfs/objects/batch` answers through the proxy. Asked for an object that wasn't there, it correctly returned 404. Download links go to `github-cloud.githubusercontent.com`, which is reachable. Plausible, but **unproven until one real clip is fetched.**
- **Upload side:** the build environment can't upload, because the proxy refuses `lfs.github.com`. That doesn't block the plan: Tanya's own computer isn't behind this proxy.
- **One-clip test** (on Tanya's computer, with Git and Git LFS installed):
  ```
  git clone https://github.com/MisfitMatriarch/Enough.git && cd Enough
  git checkout -b footage-source
  git lfs install && git lfs track "footage/*.mp4"
  mkdir footage && cp "/path/to/Acceptance.mp4" footage/
  git add .gitattributes footage/Acceptance.mp4
  git commit -m "Source footage: Acceptance (not for merge)"
  git push -u origin footage-source
  ```
  The build environment then runs `git fetch origin footage-source` and `git lfs pull`, and checks the file plays end to end. Move the rest of the collection only after that works. Never open a PR from `footage-source`. `footage/` is excluded from every build regardless.

**Fallbacks:** allow `drive.usercontent.google.com` and link-share the clips, or store a read-only Drive credential as a network secret.

The full recording (`tanyas speech_.mp4`) and the repaired full recording are never used as a substitute source, and are never published, embedded or linked. Numbered clips are source material only.

## Three films, three jobs

Each film has its own spine and lead material. None is a shorter version of another. The homepage features one film only.

| Film | Length | Placement | Editorial job | Built around |
|---|---|---|---|---|
| **All of this is me** | 30–45 s | Homepage, in the existing *All of this is me* section directly after the opening, replacing the Paris photograph. The section becomes a landscape layout: a 16:9 player across the wider column, never squeezed into the portrait frame. The layout changes in the same commit that adds the film. Its five lines stay beside the player, ending on "Assistance belongs in the plan. So does joy." | Recognition: a first-time visitor hears what *Less fixing. More living.* means | A coherent passage from Tanya's *acceptance of all of you* message, opening on her face and voice, with a brief joyful moment (entrance or singing) around it so sparkle sits alongside substance |
| **Speaking reel** | 60–90 s | Events & Speaking, beside or directly below the signature keynote. The homepage speaking section keeps its audience photograph and gains a "Watch Tanya speak" link to the reel, published together with the reel | The booking decision: an organiser pictures Tanya in their room | 1. **The welcome:** a short part of her introduction, then her walk on stage (keep the wide shot that shows the room and the room sound of the welcome), then a closer shot into her strongest spoken hook. 2. **The substance:** her strongest words on acceptance, assistance, genius and joy, the water demonstration, and genuine audience responses at the moments they happen. 3. **The celebration:** her singing finale, letting the joy and connection land. 4. **The close:** original phoenix, *Less fixing. More living.* and the booking destination |
| **Acceptance story** | about 45–60 s | About Tanya, beside the personal account, replacing one photograph | Story: one coherent account of accepting all of herself and making room for support, ambition and joy | The fuller *acceptance of all of you* passage as an unbroken spoken line, with supporting footage laid over the words, never replacing them |

The story every film serves: accepting your strengths, difficulties and support needs helps you choose where your energy goes and makes more room for living.

### Signature moments (Tanya's selection, 25 October 2026)

The entrance and the singing finale are signature moments, not spare footage. Build towards them deliberately.

| Moment | Tanya's reference | Use |
|---|---|---|
| Introduction and walk on stage | facebook.com/reel/1817530072720100 | Opens the speaking reel. Being small in the frame is fine: it shows her relationship with the whole room. Follow it with a closer shot so viewers connect with her face and words |
| Acceptance of all of you | facebook.com/reel/1526364612710422 | Central passage of the homepage film; a shorter passage in the speaking reel; the fuller account on About |
| Singing finale | facebook.com/reel/1425874299681714 | Closes the speaking reel |

The reels are references for which moments Tanya chose, not sources. Facebook can't be played from the build environment, so nobody here has watched them yet. Locate the matching original recordings in the Drive folder for full quality, then watch and transcribe them before choosing exact words or timestamps.

**Tanya's chosen still (25 October 2026), 1920 × 1080:** the singing finale on the Empowering Women Expo stage at Venue 114, Sunshine Coast. Tanya in the silver fringed top and teal velvet trousers, pointing to the audience, with the *Less fixing. More living.* slide on screen behind her and an audience member filming and laughing. Use this frame, taken from the original footage, as the speaking reel's poster. It's also the preferred photograph for the speaking sections on the Speaking page and homepage. Tanya has the original image. The build environment needs its Drive file ID or a link (Drive search doesn't index the shared expo files), or the file on the `footage-source` branch. It's under the connector's 10 MB limit, so it can be downloaded directly once identified.

**Music rights:** the singing finale needs its song's publication rights checked before its audio is published. If the song can't be cleared, keep Tanya's movement and celebration with cleared audio and her own spoken closing line.

Each player: strong poster frame, visible native controls, captions, transcript, no autoplay or sound on load. The original phoenix, ivory paper, watercolour, teal and gold carry through the films and the layout around them.

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
