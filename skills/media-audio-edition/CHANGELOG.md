# Changelog

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
