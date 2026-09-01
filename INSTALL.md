---
name: media-skill-install
description: >-
  Install and prepare the published Scrollport Skills in the Media creation
  package. Use when a setup prompt names this package.
license: MIT
---

# Install a Scrollport Skill package

This guide installs every published outcome Skill from the
[Media creation repository](https://github.com/Scrollport/media-creation-skills), connects
Scrollport when needed and checks that the Skills are ready to use. It does not
run a Skill or spend wallet credit.

## For humans

Give your agent the short setup prompt from the package page. This shared guide
supplies the installation and readiness checks.

The agent may ask before it:

- installs or updates software on your machine;
- connects Scrollport or another account; or
- runs a paid tool.

You should never paste an API key, OAuth token or other credential into chat.
Account authorisation stays in Scrollport's browser flow.

## For agents

Install every published outcome Skill in this package. Keep the human approval
boundary intact and do not claim readiness until the installed Skills,
Scrollport connection and required dependencies have all been checked.

### Resolve the package

1. Resolve the requested release tag or commit. If the prompt names no pin, use
   the repository default branch only to resolve its current commit SHA, then
   keep that exact SHA for the rest of setup.
2. Fetch `registry.json` from that exact repository SHA and select every
   installable entry whose `path` begins with `skills/`; exclude candidates.
3. Retain the repository, exact source SHA and each selected Skill's `id`,
   `path`, `version`, dependency declarations and `instruction_path`. Do not
   silently substitute a later branch head or a different release.

### Choose one installation method

Identify the current agent host, its active Skill directory and whether the
user wants project or user scope. Reuse a correct installation at the same
source pin. Otherwise, try the methods below in order and ask before installing
or updating host software.

**GitHub CLI.** If `gh skill install --help` is available and lists the current
host, install each selected Skill at the exact package path and pin:

```sh
gh skill install Scrollport/media-creation-skills skills/<skill-id> --pin <source-ref> --agent <agent> --scope <project-or-user>
```

**Open Agent Skills CLI.** If Node.js and `npx` are available, install each
selected Skill from the exact commit URL. Add `-g` only for user scope:

```sh
npx skills add https://github.com/Scrollport/media-creation-skills/tree/<source-ref>/skills/<skill-id> --skill <skill-id> --agent <agent>
```

**Manual installation.** If neither installer supports the host, offer to copy
each selected Skill directory into the host's active Skill directory. Preserve
every referenced file and record the source pin.

Do not run more than one method after a successful installation. Do not rely on
an installer's default agent or an unpinned default branch.

### Verify the installation

1. Confirm every installed `SKILL.md` is readable and discoverable by the
   current agent. If this host loads Skills only at session start, explain that
   a new or restarted session is required.
2. Confirm each installed frontmatter name matches its registry entry, the
   package came from the resolved exact source SHA, and every file
   referenced by `SKILL.md` is present. The registry version comes from the
   canonical `skill.json` in GitHub; it is deliberately not duplicated in
   `SKILL.md` frontmatter.
3. Do not load every installed Skill body during setup; native Skill discovery
   will select the relevant outcome Skill for each request.

### Connect Scrollport and check dependencies

1. Check whether Scrollport's five control tools — `apps`, `discover`,
   `inspect`, `run` and `wallet` — are available. If not, follow
   [Scrollport setup](https://scrollport.com/start). Never ask the human to paste
   a Scrollport credential into chat.
2. Verify the connection with the free `wallet` or `discover` tool.
3. Use `discover` and `inspect` to confirm every required catalog dependency in
   the registry entry. Required dependencies block readiness; optional ones do
   not.
4. Use `apps` to check declared connected-app dependencies. Ask the human to
   authorise a missing account through Scrollport before treating it as ready.
5. If the installed Skill requires host-side software, explain why and ask
   before installing it.

### Finish without starting the paid workflow

Report the installed Skill ids and versions, source pin, installation method
and scope, whether a restart is needed, Scrollport connection state, and each
required dependency's state. Then ask what outcome the user needs.

Do not run a paid tool until the Skill has shown the exact proposed inputs,
scope and maximum cost and the human has approved them.
