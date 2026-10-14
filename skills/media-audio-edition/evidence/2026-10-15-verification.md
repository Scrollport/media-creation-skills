# Blog Post to Podcast verification — 2026-10-15

Status: **Machine checks passed on version 5.0.0. The script method was tested on two
posts before any audio, the maintainer (Alan) chose the voices by ear, and his listen-check
of the full episode is pending. Next review due 2026-11-14.**

## Why 5.0.0

Alan's listen-check of the 4.3.0 voice check: the voice was fine, but the script was hard
to follow and "not well organised and structured the way a podcast would be". A spoken
edit kept the post's facts, claims and order, so a page built for skimming was read out
with no question, roadmap, examples or recap. 5.0.0 rebuilds the episode for the ear: a
two-host conversation written in six passes (brief, question, outline, draft, natural
speech, a counted checklist with every factual line matched to the post).

## Script tests, before any audio (free)

Fresh agents, given only the Skill and a post, wrote the script and the approval message
and stopped before any paid run. The method was revised between rounds; the examples in
the method were then replaced with neutral ones, so the final runs saw no example drawn
from either test post.

- Posts: Scrollport's own
  [Pay-per-use API tools vs subscriptions for AI agents](https://scrollport.com/resources/pay-per-call-ai-agent-tools)
  and [AI agent API spending controls](https://scrollport.com/resources/control-ai-agent-spending),
  both dry reference pages with definitions, lists and caveats.
- Blind panel (an agent judging each script as heard once, without knowing which was
  which), scores out of 10 for following by ear, structure, engagement, naturalness and
  usefulness: the 4.3.0 script 3, 4, 2, 3, 4; a 5.0.0 script for the same post 8, 8, 7, 7,
  7; a 5.0.0 script for the second post 7, 8, 5, 7, 6. The second post contains no
  numbers, and the Skill invents no prices, which held engagement back.
- Independent fact-checks against each post: before the claim check existed, four to
  seven lines per script were overstated, narrowed or missing a limit; with work/claims.md,
  one or two small slips per script. The two slips in the recorded script (a dropped "can"
  and a rule given a count the post doesn't give) were corrected, and one phrase that
  could be heard as "results" was made explicit, before the approval message.

## Recording

- Script: 3,959 characters and 730 words spoken in 35 turns, SHA-256
  `61814642a449a436256331d184d2e1a4b7dd54f5cf6db9407059084de09cdb05`, in four parts of
  544, 1,064, 847 and 1,504 characters, split only at section ends. Part 1 is the cold
  open and the intro.
- `inspect_tool` before the quote: Eleven v3 at $0.140000 per 1,000 characters, $0.002500
  minimum, 2,000 characters and 50 entries per request. `get_wallet`: funds above the
  maximum, no daily cap, a $3.00 approval threshold.
- Quote: about $0.12, at most $0.80, reusing the show's saved intro sting, so no music
  request. Approved at 23:49:02 +01:00 on 14 October, recorded before the first paid run.
- Voice check: part 1 in Warm and the legacy Calm voice ran twice, because the ending
  check (then an absolute −30 dB) flagged both takes. Alan: the format and script were
  better, but the two voices didn't fit together. A new approval at 23:58:12 +01:00 raised
  the maximum to $1.00, including what had been spent, to record the opening in three
  matched pairs. He picked Eric and Jessica at 00:03:47 +01:00, and that take became
  part 1; parts 2 to 4 followed.

| Step | Run | Cost | Length | Last 50 ms | Mean |
| --- | --- | ---: | ---: | ---: | ---: |
| Part 1, Warm + Calm | `d08852b6-52c7-4434-a83a-3b762d301a1e` | $0.016800 | 35.76 s | −26.3 dB | −19.2 dB |
| Part 1 re-take, Warm + Calm | `157ae6b7-91f7-48ee-b276-cd85dbeb753f` | $0.016800 | 35.36 s | −26.0 dB | −19.0 dB |
| Opening, Warm + Lily | `d2780da4-67e5-4586-88c6-58284426f824` | $0.016800 | 40.64 s | −28.1 dB | −19.1 dB |
| Opening, Warm + Alice | `28279078-c0e2-4e76-ab4e-0b29d3e32dd6` | $0.016800 | 38.88 s | −22.9 dB | −20.5 dB |
| Opening, Eric + Jessica (kept) | `55812f48-f282-4bea-963b-8f643173d7f2` | $0.016800 | 37.36 s | −29.3 dB | −19.6 dB |
| Part 2 | `e6514992-cdf1-49c0-969f-e275df6616a2` | $0.032760 | 73.20 s | −42.5 dB | −19.3 dB |
| Part 3 | `8f1dfb8e-dab6-4238-be39-a7fe2e6af501` | $0.026040 | 60.80 s | −58.2 dB | −18.7 dB |
| Part 4 | `589e8211-b75d-4e23-903e-1748c36aa28f` | $0.046340 | 115.20 s | −33.4 dB | −19.6 dB |
| **Total** | | **$0.189140** | | | |

The kept parts cost $0.121940, 22% of their list price. Every part played through and had
a plausible length for its text (0.91 to 1.07 times the estimate).

## Machine checks on the episode

- episode.mp3: 300.56 s (5:01), matching its pieces exactly; speech 289.36 s from four
  parts and three 0.6-second gaps; plays through with no decoder messages.
- Loudness −16.4 LUFS for the episode, speech −15.9 LUFS; intro and outro stings 2.8 LU
  below the speech, each 5.0 seconds.
- Transcript, show notes (with "Also in the post" and the AI disclosure) and the LinkedIn
  post were written from the approved script and the post. No clip: this Mac's ffmpeg has
  no `subtitles` filter.

## Findings that changed the Skill

- The two legacy voices (Calm and Deep) are older ElevenLabs voices that sit badly next to
  current ones. The Skill now offers current default voices in matched pairs: Eric and
  Jessica (default) or Warm and Lily.
- The absolute −30 dB ending check flagged all five takes of the opening, which end on the
  host's last word with no silence. The check now flags only an ending within 6 dB of the
  part's mean level; on these takes it would have flagged only the Warm + Alice take,
  whose last 50 ms peaked at −10.3 dB.
- The voice check can now offer the opening in two or three other matched pairs, so the
  user picks by ear and the chosen take becomes part 1.

## Limits

- One recorded episode, on one post, with one maintainer listening. The second post was
  tested as a script only.
- The panel and fact-checks are model judgements, not listener research.
- Machine checks measure lengths, joins and loudness; they cannot hear the words.
