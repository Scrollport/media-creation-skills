# Audio Edition reverification — 2026-10-12

Status: **Machine checks and maintainer listen-check passed; next review due
2026-11-11.**

## Brief

- Source: NASA Science, [What's Up: October 2026 Skywatching Tips from NASA](https://science.nasa.gov/solar-system/skywatching/whats-up-october-2026-skywatching-tips-from-nasa/),
  a public monthly post published on 1 October 2026, retrieved through the
  optional `exa.search` route with page text enabled.
- Why this brief: a real, newsletter-shaped public post with no customer or
  personal material; adapting it needs genuine ear-editing (visual-only sky-chart
  captions removed, dates written for speech, attribution kept), and its named
  entities (Saturn, Hubble, Orionid, Halley's Comet, Pleiades) exercise
  pronunciation.
- Script: 1,244 characters and 213 words, SHA-256
  `af4870fb9b792798423bdb00711647d3f3c235812ee4b0e509d459958e9f2d07`, split at
  its section boundary into two narration chunks of 512 and 732 characters. Two
  chunks deliberately exercise the chunk-by-chunk path, one shared `voice_id` and
  local concatenation that every 2,001–4,000-character trial-safe episode needs;
  per-character pricing made the split cost-neutral.
- Narration: one narrator on Eleven v3 with the catalog default `voice_id`
  `21m00Tcm4TlvDq8ikWAM` on both chunks. The voice chosen in the original
  bake-off is not recorded in this repository.
- Music: one 3,000 ms sting with `force_instrumental: true` and a prompt stating
  instrumental, mood and clean ending, placed at the opening and closing.
- Output choice: MP3 plus the optional agent-side audiogram.

## Contract and cost checks

- `search_tools` returned all three catalog tools as live, and `inspect_tool`
  was read immediately before use. Input contracts matched the Skill: a
  2,000-character, 50-turn dialogue request and 3,000–60,000 ms of music.
- Inspected prices matched the earlier evidence: `exa.search` $0.009800 per call;
  `elevenlabs.eleven-v3` $0.140000 per 1,000 input characters with a $0.002500
  minimum call; `elevenlabs.eleven-music-v2` $0.210000 per minute.
- Plan maximum before the first paid call: **$0.194460**, using every input
  character at the inspected price. The trial-safe ceiling still holds at these
  prices: 4,000 characters, one search and one sting quote $0.580300.
- The maintainer pre-authorised rehearsal spend up to $0.60. The script
  checkpoint (script, exact chunks, voice, sting prompt, prices and maximum) was
  saved in the state record before audio spend, but no human read the script
  before generation; the pending listen-check also covers script acceptance.

## Machine checks

| Artifact | Bytes | Duration | Format | SHA-256 |
| --- | ---: | ---: | --- | --- |
| Narration chunk 1 | 504,102 | 31.440 s | MPEG audio, mono, 44.1 kHz, 128 kbps | `61e1eafa4752c661225d12cf3df8ade568e922666e754f1f135e346afee8bdd3` |
| Narration chunk 2 | 758,639 | 47.360 s | MPEG audio, mono, 44.1 kHz, 128 kbps | `0a909669e17691409aeb3abd4971909d17cd5518da190ea2ab33a0461ceff9a7` |
| Sting | 72,621 | 3.024 s | MPEG audio, stereo, 48 kHz, 192 kbps | `7fd9cbb9d02a6f13f239898a0bc70a915b2aa9da1c4bc94fc949ee0960090096` |
| Assembled episode | 2,080,853 | 86.648 s | MPEG audio, stereo, 44.1 kHz, 192 kbps | `3453157e05de3c6658c260b6f7d1813db0e0d0d952f50f706745e2eecefe535a` |
| Audiogram | 5,900,180 | 86.667 s | 720×720 H.264, AAC stereo, 13 soft caption cues | `9493a5f6f52ff293a722c3e96264d46a85040d870e96ab93fbc7744e1431ab1f` |

- Each provider artifact downloaded from its run's signed URL, matched the
  run's reported byte count and decoded completely with ffmpeg without errors.
  All three also appear as ready workspace files under their run ids.
- The chunks were voiced at 158 and 165 words per minute (83 and 130 words), so
  neither is materially shorter than its text predicts.
- Neither chunk ends at speaking level: the last sound decays to about −46 dB
  and −40 dB respectively in the final 10 ms, so no hard cut was detected. Both
  endings carry almost no trailing silence.
- Integrated loudness: narration −17.4 and −17.6 LUFS; sting −27.1 LUFS, raised
  6 dB during assembly; episode −17.9 LUFS with a 1.8 LU range.
- Assembly order was sting, 0.5 s gap, chunk 1, 0.6 s gap, chunk 2, 0.7 s gap,
  sting. Silence detection found the joins at 3.02 s, 34.96 s and 82.92 s as
  planned; no music sits under speech.
- Settlement: four captures totalling $0.058660, every hold released and
  nothing left held. Billed narration characters derived from the settled cost
  were 113 and 161 (about 0.22 of input); run responses report cost, not billed
  units.
- Audiogram: sampled frames at 1, 50 and 85 s show the waveform, and a frame in
  the 20 s pause shows none. Captions are one cue
  per sentence with timings estimated from detected pauses, because narration
  returns no word timings and the local ffmpeg build cannot burn in text.

## Receipt

| Step | Tool | Run | Final USD |
| --- | --- | --- | ---: |
| Source retrieval | `exa.search` | `6b13170e-3ab2-461c-8f8a-9ce738e7cfdd` | 0.009800 |
| Narration chunk 1 | `elevenlabs.eleven-v3` | `de2fc6ae-ea9f-4663-a290-6122ad5845a4` | 0.015820 |
| Narration chunk 2 | `elevenlabs.eleven-v3` | `ad7dc84c-12ff-4557-a9cd-c4d1ae297888` | 0.022540 |
| Sting | `elevenlabs.eleven-music-v2` | `67fc4014-7447-4db9-8662-f547469e8917` | 0.010500 |
| **Total** | | | **0.058660** |

Local assembly and the audiogram created no Scrollport run.

## Human judgement

Machine checks cannot show that the speech matches the script, that no word is
clipped, or that the result is acceptable. The Skill's completion contract and
[the 2026-09-01 human review](2026-09-01-human-review.md) require a maintainer
to listen to the assembled episode and confirm:

1. the narration matches the script word for word, with nothing skipped,
   repeated or added, including across the join at about 35 s;
2. the opening, the end of chunk 1 ("Saturn's south pole") and the end of
   chunk 2 ("adapted from NASA Science") are complete;
3. both chunks sound like the same narrator with consistent delivery;
4. named entities are pronounced acceptably;
5. the sting is instrumental, ends cleanly and sits acceptably against speech;
6. overall audio quality is accepted without requested changes; and
7. the script itself is acceptable, since it was not approved before generation.

The optional audiogram's caption timing is a separate, non-blocking judgement.

**Result, 12 October 2026:** the product owner listened to the assembled episode
(SHA-256 `3453157e…e535a` above) against this checklist and the script, and
approved both without requesting changes. That confirmation sets
`verified_at` to 2026-10-12 and `review_due_at` to 2026-11-11. The audiogram's
caption timing was not judged separately and remains non-blocking. The review
added no paid run; spend stays at the $0.058660 receipt above.

## Honest boundary

This is maintainer rehearsal material from a public source. It is not customer
proof, an industry-professional review or evidence of feed publication. The
repository contains no audio artifact, signed download URL, account identifier,
credential or raw provider payload.
