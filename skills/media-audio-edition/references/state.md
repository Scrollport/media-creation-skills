# Saved state

Write work/state.json after every step and before every paid run. Never put keys,
tokens or approval links in it. Keep dollar amounts as decimal strings with six places.

```json
{
  "skill": "media-audio-edition",
  "version": 4,
  "status": "recording",
  "folder": "podcast/2026-10-14-why-we-killed-our-free-plan",
  "post": {"title": "Why we killed our free plan", "author": "Ana Ruiz", "link": "https://example.com/free-plan", "words": 630},
  "choices": {"episode": "whole_post", "style": "spoken_edit", "voice": "Warm", "voice_id": "JBFqnCBsd6RMkjVDRZzb", "tool_id": "elevenlabs.eleven-v3", "clip": true},
  "script": {"sha256": "<fingerprint>", "characters": 3900, "parts": [360, 1455, 630, 1455], "clip_part": 3},
  "music": {"tool_id": "elevenlabs.eleven-music-v2", "music_length_ms": 7000, "reused": false},
  "prices": {"read_at": "2026-10-14T13:58:40+01:00", "narration_per_1k": "0.140000", "minimum_per_request": "0.002500", "music_per_minute": "0.210000", "characters_per_request": 2000, "settled_share": "0.22"},
  "plan_usd": "0.570500", "typical_usd": "0.144620", "maximum_usd": "0.800000",
  "approval": {"at": "2026-10-14T14:02:11+01:00", "reply": "approve", "sha256": "<fingerprint>", "voice_id": "JBFqnCBsd6RMkjVDRZzb", "tool_id": "elevenlabs.eleven-v3", "maximum_usd": "0.800000"},
  "voice_check": {"shared_at": "2026-10-14T14:02:40+01:00", "reply": "sounds right", "at": "2026-10-14T14:04:05+01:00"},
  "runs": [{"step": "part-1", "tool_id": "elevenlabs.eleven-v3", "idempotency_key": "<UUID; MCP or HTTP only>", "started_at": "2026-10-14T14:02:19+01:00", "run_id": "<run_id>", "status": "succeeded", "cost_final": "0.011088", "file": "work/part-01.mp3", "tail_db": "-47.3", "flagged": false}],
  "spent_usd": "0.011088",
  "updated_at": "2026-10-14T14:04:05+01:00"
}
```

Before approval, `approval` is null and `runs` is empty. Until the user answers the voice
check, `voice_check` has no reply and `status` is "waiting for voice check". A re-take adds
its own run with `"step": "part-1b"`, and the kept take is the one with `"kept": true`.
