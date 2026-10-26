# All of this is me: draft 1 (review)

Homepage film, 37.8 s (34.1 s of Tanya's speech + 4.2 s closing card with a 0.5 s dissolve). Review draft cut from the 720p review copy. The final render uses the original footage with the same edit decisions.

**Source:** `Acceptance_REVIEW_PROXY_720p.mp4`, 6,453,432 bytes, SHA-256 `b196c905a0d6e0e4abc0257128a0dce85e8b0b42c5d133cdd0cbe0d4d930374f` (matches the supplied checksum). Transferred as two raw parts from Drive and joined in the build environment.

## Edit decisions (review-copy timecodes)

| Out | Picture | Sound | Why |
|---|---|---|---|
| 0.00–2.70 | 1.05–3.75 wide, Tanya at the podium | same | Opens on her face and voice: "…embracing who I am." The unclear first second is left out |
| 2.58–5.58 | 12.25–15.25 audience, one continuous take | 13.75–16.75 (sync audio) | Covers a camera whip at 15.3–16.7 with the people she's speaking to. No sound is changed |
| 5.58–34.08 | 16.75–45.25 stage | 16.75–45.25 | Continuous speech, in sync |
| 33.58–37.78 | Closing card | Speech fades out at the end of "…helped me in doing that." | Original phoenix, *Less fixing. More living.*, tanyahicks.com on ivory with the watercolour band |

**Removed:** the Tammy shout-out and its cheer (4.8–13.7) together, because the cheer only makes sense with the shout-out. Audio crossfade at the cut: 0.12 s.

**Treatment:**
- Audio: 80 Hz high-pass, light FFT noise reduction, gentle compression, loudness −16.0 LUFS integrated (measured).
- Picture: contrast +4 %, saturation +5 %.
- Lower third: Cormorant / Figtree on ivory with a gold rule, top-left so it never meets the captions.
- Captions: Figtree in a navy box. The review copy has them burned in; the web version uses `draft1.en.vtt`.

## Transcript (as cut)

> …embracing who I am. So I learned my mindfulness and yoga training from Tammy, and one of the beautiful things about mindfulness is acceptance. Acceptance. Acceptance for all of you. So instead of trying to squash this little bit here that you don't like, and you kick it and try and boot it out the door, accepting, getting the heart bigger, and accepting all of it. And that's what I've been on a journey to do, and I've had an amazing team of different people that have helped me in doing that.

Full review-copy transcript, including the removed shout-out: "She's gonna kill me, but my yoga mentor's in the audience. Tammy from Yoga Nrg, everyone, over here."

## How the words were checked

- Whisper medium.en (sherpa-onnx) in three passes: speech-segmented, 5 s windows with 2.5 s overlap, and onset tests.
- One pass produced "I hope you have a wonderful day." over 15–28 s. That was a recognition error; the windowed passes agree on the words above.
- Names confirmed by Tanya: Tammy, Yoga Nrg.
- Caption timings come from measured speech segments, split in proportion to text length within each segment. **Tanya should check by ear**, especially "accepting, getting the heart bigger", which two passes heard slightly differently.

## Open for Tanya

1. Does "…embracing who I am." work as the opening, or should the film open on "So I learned…"?
2. The audience cutaway (2.6–5.6) shows the end of the applause for Tammy under "So I learned my mindfulness…". Keep it, or cover the camera whip with a different shot from the originals?
3. Music: none used.
4. For the final film: the source passages above, taken from the original recording (high quality) and transferred in ≤4 MB parts.
