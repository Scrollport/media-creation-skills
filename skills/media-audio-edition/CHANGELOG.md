# Changelog

## 5.0.0 — 2026-10-14

From Alan's listen-check of the 4.3.0 voice check: the voice was fine, but the script was
hard to follow and not organised the way a podcast is. The cause was the method: a spoken
edit kept the post's facts, claims and order, so a web page built for skimming (summary
first, definition-style headings, lists, caveats) was read out, with no question, roadmap,
examples or recap, and no examples or analogies were allowed. NotebookLM's team describes the
opposite: an outline, a script, a critique and a revision, then a pass for natural speech,
with two hosts in different roles.

- Default to a conversation: a host who explains the post and a co-host who stands in for
  the listener, asks the next question, says the signposts and raises one real doubt per
  point. Solo, a 2-minute brief and a straight reading stay available.
- Write the script in six passes, following a new reference: a brief of the post (its
  point, key points in plain words, best material, limits, what to leave out and any
  problems), the question the episode answers, an outline (cold open, intro and roadmap,
  two or three points each with an example, a doubt and a payoff, recap and takeaway,
  outro), the draft, a pass for natural speech, and a counted checklist.
- New illustrations yes, new facts no: framed examples and analogies are allowed; new
  customers, results, numbers, prices, quotes or advice are not. Every factual line is listed
  in work/claims.md with the post sentence it rests on, keeping its exceptions and hedges.
- Rules for the ear: one idea per sentence, mixed lengths with no runs of very short
  sentences, lists of three at most, few numbers, positive statements, plain words,
  nothing that points at the page, and no stock phrases.
- The approval message shows the outline, what was left out (listed in the show notes),
  the checklist result and the full script, one turn per line. The voice check is the cold
  open and intro, so both voices are heard.
- The show notes add "Also in the post"; the transcript names each speaker; the join steps
  move to a reference so the Skill stays under 500 lines.
- Tested before any audio on two posts by fresh agents: blind panels scored the new script
  8 for following by ear and 8 for structure against 3 and 4 for the 4.3.0 script, and
  independent fact-checks found two small slips, fixed before recording.

## 4.3.0 — 2026-10-14

From Alan's listen-check of the first verification episode: the audio and the
word at 0:25 are fine, but the script didn't sound natural, and its intonation
and pauses were odd.

- Write a spoken edit by default: the same facts, claims, numbers and order,
  written for listening, with short sentences, contractions, lists and headings
  turned into speech, plain names for code and tools, acronyms expanded once,
  numbers said the way people say them, and pauses placed with punctuation and
  paragraphs. Verbatim stays available, and the Skill shows three
  before-and-after examples.
- Send each narration part to Eleven v3 as one continuous text instead of one
  entry per paragraph, and split parts only at paragraph ends. Neither speech
  tool exposes voice settings, continuity fields or pause controls, and
  Multilingual v2 isn't listed, so Eleven v3 stays the default as the more
  natural model; the fast model is offered to save money or if v3 sounds uneven.
- Make the voice check a gate: the first paragraph is recorded and shared, and
  the rest is recorded only after the user says it sounds right. An unattended
  run stops and waits.
- Move the saved-state example into a reference file so the Skill stays under
  500 lines.

## 4.2.0 — 2026-10-14

From the second verification round, which stopped at the 4.1.0 ending check
before any episode was made ($0.015 spent). Eleven v3 usually stops right on the
last sound, so that rule would have failed most parts.

- Pad every part's end with a 50 ms fade and 0.25 seconds of silence before
  joining.
- Treat a part as possibly cut off only when its last 50 ms, before the fade,
  is above −30 dB, and re-take it once within the approved maximum.
- If the re-take is no better, keep the take that ends more quietly, carry on
  and flag its time in the final message. An ending never stops the episode.
- Lead the approval message with the typical spend ("about $0.16, at most
  $0.85") and say the maximum assumes list price and one re-take.

## 4.1.0 — 2026-10-14

Fixes from the 14 October verification of 4.0.0, whose machine checks passed
($0.17 for a 6:02 episode at −16.4 LUFS; the listen-check is pending):

- Check that each part ends in quiet (its last 50 ms below −40 dB, otherwise a
  re-take) and fade the last 50 ms of every part, so a word cut off at a join
  is caught.
- Join and level the narration first, measure it, and set the sting 2 LU below
  it. The final join no longer re-levels the whole episode, so the outro can't
  end up louder than the voice.
- Estimate length at 14 characters a second (about 130 words a minute), so a
  full reading now tops out near 800 words.
- Split the narration into evenly sized parts and show the typical spend next
  to the list-price maximum; Eleven v3 has settled at about 22% of list.
- Say plainly that the part check compares lengths, not words.
- Skip summary boxes that repeat the opening, and read headings as short spoken
  transitions or skip them.

## 4.0.0 — 2026-10-14

- Rename the Skill to Blog Post to Podcast, keeping the `media-audio-edition`
  id and its aliases, with a plain-language promise: a narrated episode in the
  user's chosen voice, with intro music, a transcript, show notes, a LinkedIn
  post and an optional 45-second captioned clip.
- Make approval a hard gate: the script, voice and maximum cost appear in one
  message, nothing is spent before "approve", the approval time is recorded
  before the first paid run, and any change needs a new approval. The paid
  page-reading step is gone; a post the host can't open is pasted instead.
- Offer three described voices, an optional two-voice conversation and the
  cheaper fast model (`elevenlabs.eleven-flash-v2-5`); remove `exa.search`.
- Default to a faithful reading of up to about six minutes, with an excerpt or
  a two-minute summary for longer posts, and an optional voice check of the
  opening before the rest is recorded.
- Keep every narration request at or under 1,900 characters, join the parts
  with a checked ffmpeg command (or hand them over in order), request 7
  seconds of music and trim it to a checked 5-second sting, and aim for
  −16 LUFS.
- Open the result with a short summary, then the files, and move run ids and
  per-call costs to a Details appendix.
- The recorded verification still describes 3.0.2; this workflow needs its
  own verification run.

## 3.0.2 — 2026-10-12

- Record the October reverification: a fresh two-chunk episode adapted from a
  public NASA post passed machine checks and the maintainer listen-check.
  Next review due 2026-11-11.

## 2.0.2 — 2026-09-01

- Keep terminal-failure recovery separate from the completed-episode report.

## 2.0.1 — 2026-09-01

- Record a fresh human listen-check of the assembled synthetic rehearsal.
- Clarify terminal-failure recovery without repeating maintainer provenance in
  the runtime instructions.

## 2.0.0 — 2026-08-31

- Move the canonical package into the Media creation category repository.
- Rename the Skill id to `media-audio-edition` and retain the former public id
  as an alias.
- Keep the verified narration, music, script-approval and artifact-review
  contract unchanged.

> Historical through 28 August 2026. Git history and GitHub releases are the
> canonical change record from version 1.2.0 onward.

## 1.2.0 — 2026-08-28

- Remove maintainer-only authoring guidance and redundant version metadata from
  the runtime package.

## 1.1.1 — 2026-08-28

- Adopt the shared Scrollport outcome category and capability-to-tool contract.
- Combine the public summary into one concise description.

## 1.1.0 — 2026-08-27

- Reconcile narration and music dependencies to the current public catalog ids.
- Add the fifth `apps` control scope to the fixed Scrollport connection contract.
- Record a fresh synthetic technical rehearsal and a conservative trial-safe
  maximum without extending the human-listen review deadline.

## 1.0.0 — 2026-08-27

- Migrate the verified Audio Edition workflow from `v20x/scrollport` with its
  original subtree history.
- Declare its install, dependency, cost, approval and evidence contracts.
- Preserve the adopted one-narrator Eleven v3 route and bounded music sting.
