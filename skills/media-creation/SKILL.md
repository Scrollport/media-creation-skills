---
name: media-creation
description: Route a media-creation request to the smallest verified Scrollport Skill with the required creative and review checkpoints.
license: MIT
metadata:
  scrollport-status: verified
---

# Media creation

Choose a verified outcome Skill before selecting a model or spending credit.
This router does not generate media itself.

## Route the request

- Use [Media Audio Edition](../media-audio-edition/SKILL.md) when the user wants
  to adapt a newsletter, article or post into an approved short spoken episode
  with narration, a music sting and an optional agent-side audiogram.
- No image or video function Skill is verified in this repository yet. For
  those requests, state that the category route is planned but unavailable;
  do not improvise a generic paid generation workflow under this router.

After choosing Audio Edition, read its complete `SKILL.md` and follow its source
handling, script approval, character and spend ceiling, voice decision,
artifact checks, recovery state and acceptance criteria. If it is not present
in the current installation, ask before installing it from this repository and
pin the source revision.

Publishing, hosting and distribution remain separate human-authorised actions,
even after a media artifact passes review.
