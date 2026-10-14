# Blog Post to Podcast verification — 2026-10-14

Status: **Machine checks passed on version 4.0.0; the maintainer listen-check
(Alan) is pending; next review due 2026-11-13.**

## Brief

- Source: Scrollport Resources,
  [Pay-per-use API tools vs subscriptions for AI agents](https://scrollport.com/resources/pay-per-call-ai-agent-tools),
  Scrollport's own public article, published 3 August 2026. The page was
  opened with a free local fetch, so nothing was spent before approval.
- Why this brief: a real first-party post of 705 words, inside the
  full-reading limit, that needs genuine ear-editing (a cover image, an "On
  this page" menu, related-reading cards, inline tool names with underscores,
  "vs" in the title and a heading, and three spaces missing from the page
  markup) and needs no third-party permission to narrate.
- Answers given for the human: the default voice (Warm) with the voice check,
  a full faithful reading and the show name "Scrollport Resources". Everything
  else used the documented defaults.
- Script: 4,776 characters and 759 words, SHA-256
  `6f250c776b4886cb20659064fd8f6aef84bf1e342c0ed08c26a9000442701afc`, in four
  parts of 245, 1,476, 1,577 and 1,478 characters (2, 6, 6 and 9 lines), split
  only between paragraphs. Part 1 is the intro line and the standfirst.
- Narration: Eleven v3 with Warm (`JBFqnCBsd6RMkjVDRZzb`) on every line, one
  input per paragraph or heading. The voice was accepted on the first request.
- Music: one 7,000 ms request with `force_instrumental: true`, trimmed locally
  to a 5-second sting placed at the opening and the close.
- Clip: skipped. This Mac's ffmpeg 8.1.1 has `showwaves` and `libx264` but no
  `subtitles` filter, so it can't draw captions; the approval message said so
  before anything was spent.

## Contract and cost checks

- `search_tools` ("text to speech", "music generation") returned all three
  catalog tools as live. `inspect_tool`, read at 10:58 BST before the quote,
  matched the Skill's table: Eleven v3 $0.140000 per 1,000 characters with a
  $0.002500 minimum, 2,000 characters and 50 lines per request and no voice
  list; Eleven Flash v2.5 $0.070000 per 1,000 characters with
  `21m00Tcm4TlvDq8ikWAM` as its default voice; Eleven Music v2 $0.210000 per
  minute for 3,000–60,000 ms.
- `get_wallet` before the approval message: available funds well above the
  maximum, no daily cap and an approval threshold of $3.00, above every single
  request, so no wallet warning was needed.
- Quote: a plan of $0.693140 (narration $0.668640, music $0.024500) plus a
  re-take of the longest part ($0.220780) is $0.913920, rounded up to a
  **$0.95** maximum. The fast model was offered at a $0.50 maximum.
- One approval message carried the full script, the voice, the maximum, the
  files, the skipped clip and every listening change. The maintainer
  authorised "approve with voice check" in advance for a maximum of at most
  $0.95. The approval was written to the state record at 11:02:59 +01:00 with
  the fingerprint, `voice_id`, `tool_id` and maximum; the first paid run
  started at 11:03:50 +01:00.
- The fingerprint, voice, model, maximum and running spend were checked again
  before each of the five paid runs.
- Settled spend was **$0.171500**, 18% of the approved maximum. Eleven v3
  captured about 22% of the list price per input character ($0.147000 for
  4,776 characters against $0.668640 at list), and its estimate at run start
  was about 28% of list.

## Machine checks

| Artifact | Bytes | Duration | Format | SHA-256 |
| --- | ---: | ---: | --- | --- |
| Part 1 | 316,021 | 19.680 s | MPEG audio, mono, 44.1 kHz, 128 kbps | `8ac741f6028d901e7aa9d2e763433e876a228f63e66d2cb3c65d9156c735be17` |
| Part 2 | 1,721,199 | 107.520 s | MPEG audio, mono, 44.1 kHz, 128 kbps | `c105fd7b63324923b6dc41736c10c40a9177ae2469534b456fc997d5cfba72f7` |
| Part 3 | 1,841,572 | 115.040 s | MPEG audio, mono, 44.1 kHz, 128 kbps | `974fd9be81d1f2d2549a3192feaf96d1650761898946ef9ceb2649f95343e804` |
| Part 4 | 1,703,645 | 106.400 s | MPEG audio, mono, 44.1 kHz, 128 kbps | `abf17b3fc083a637f2cd9fb3e00e740b00c7e2125ec676175f02c53a7aee7ece` |
| Music | 168,812 | 7.032 s | MPEG audio, stereo, 48 kHz, 192 kbps | `c65f28c02a0f18bc421347a67172e3b4f1becab8993c0b3c7a8d617256930595` |
| Sting | 882,078 | 5.000 s | WAV, stereo, 44.1 kHz, 16-bit | `386a50e10f51d44619d34f8a3adb40e5f7ba1553caa0d24510ed304b3ab29030` |
| Episode | 5,787,524 | 361.640 s | MPEG audio, stereo, 44.1 kHz, 128 kbps | `dd40182b3caa7c1a9f5a0158890ad75857af9848a1663965368d7343a1be2370` |

- Each part and the music downloaded from its run's signed link, matched the
  run's reported byte count and decoded with no ffmpeg messages.
- Part lengths against characters ÷ 15 seconds were 1.21, 1.09, 1.09 and 1.08
  (0.7–1.4 allowed), and mean volumes −20.1, −20.3, −20.1 and −19.9 dB (above
  −40 dB required). The voice read about 13.7 characters a second, so the
  episode ran 6:02 against the approval message's "about 5 minutes".
- Sting: 7.032 seconds of music trimmed to 5.000 seconds with a 0.6-second
  fade (4.9–5.1 seconds required).
- Join: join.txt held the sting, a 0.6-second gap, parts 1 to 4 once each in
  order with a gap after each, and the sting. The episode measured 361.640 s
  against 361.640 s for its pieces (0.3 s allowed) and decoded with no
  messages. Silence detection found the joins at 25.3–25.9 s, 133.4–134.0 s,
  249.0–249.7 s and 356.0–356.7 s, as planned; no music sits under speech.
- Loudness: −16.4 LUFS integrated with a 2.6 LU range (−17 to −15 required).
  The narration arrived at about −20 LUFS and the sting was set to −18.3 LUFS,
  so in the episode the intro sting measures −16.8 LUFS and the outro sting
  −14.9 LUFS against −16.4 LUFS for the speech.
- Endings, which the Skill's checks don't cover: part 4 decays to about
  −67 dBFS and part 3 to about −48 dBFS; part 2 stops at about −36 dBFS, and
  part 1 stops at speaking level (about −20 dBFS in its last 10 ms), so its
  last word, "predictability" at about 0:25, may be clipped.
- Re-reading: `get_run` on all five runs returned the same status and
  `cost_final`, and across one re-read the wallet showed no new hold or
  capture on these runs.
- Files: a transcript with timestamps at 00:00, 00:05, 00:25, 02:14, 04:09 and
  05:56; show notes with a summary, five key points, the post link, the three
  links named in the episode and the AI-voice disclosure; a 916-character
  LinkedIn post with the episode link left for the user; and `show.json` with
  the saved sting for "same show". The final message opened with the summary,
  then the files, and ended with Details.

## Receipt

| Step | Tool | Run | Final USD |
| --- | --- | --- | ---: |
| Part 1 and voice check | `elevenlabs.eleven-v3` | `8c33cd5a-9313-41e0-bb5e-b5ec7fac7b8b` | 0.007560 |
| Part 2 | `elevenlabs.eleven-v3` | `d9aca5f0-bfcf-437a-a21a-d4acb8838c58` | 0.045360 |
| Part 3 | `elevenlabs.eleven-v3` | `14bae738-2ad4-4d65-a55d-e1837ddee6cc` | 0.048580 |
| Part 4 | `elevenlabs.eleven-v3` | `874fe1f4-7823-4f51-b626-e4aac9602c33` | 0.045500 |
| Sting music | `elevenlabs.eleven-music-v2` | `1690b8d6-6b29-49c8-90f2-321ff24c5b32` | 0.024500 |
| **Total** | | | **0.171500** |

Five paid runs, with no failure and no re-take. Reading the post, joining,
loudness, the transcript, show notes and LinkedIn post created no Scrollport
run.

## Human judgement

Machine checks cannot show that the speech matches the script, that no word is
clipped, or that the result is acceptable. The voice check ran without a
listener: part 1 was made and checked, and the run continued on the Skill's
documented "keep going". The maintainer must listen to the assembled episode
(SHA-256 `dd40182b…2370` above) against the approved script and confirm:

1. the narration matches the script word for word, with nothing skipped,
   repeated or added, including across the joins at about 0:25, 2:14 and 4:09;
2. the end of part 1 ("…and spending predictability", about 0:25) is complete,
   since that part stops at speaking level;
3. all four parts sound like the same narrator, at an acceptable pace;
4. the headings, "versus", the spoken tool names ("list apps" and the rest),
   "OAuth" and "Scrollport" are pronounced acceptably;
5. the sting is instrumental, ends cleanly and is not too loud against the
   speech, especially the outro (−14.9 LUFS against −16.4 LUFS);
6. overall audio quality is accepted without requested changes; and
7. the transcript, show notes and LinkedIn post are acceptable to publish.

**Result, 14 October 2026:** pending. The machine checks set `verified_at` to
2026-10-14 and `review_due_at` to 2026-11-13; Alan's listen-check is still
required, and its result should be recorded here.

## Honest boundary

This is maintainer rehearsal material from Scrollport's own public article. It
is not customer proof, an industry-professional review or evidence of feed
publication. The repository contains no audio artifact, signed download URL,
account identifier, credential or raw provider payload; the audio and working
files are kept outside the repository.
