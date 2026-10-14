import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { checkRepository, validateRepository } from "../scripts/validate.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

function fixture({ frontmatter = true, secret = false, undeclared = false, mutateManifest } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "scrollport-skill-test-"));
  const skillDir = join(dir, "skills", "fixture-skill");
  mkdirSync(skillDir, { recursive: true });
  const credential = secret ? `sp_${"live"}_${"A".repeat(24)}` : "ordinary-state";
  const dependencyLine = undeclared ? "Use `other.lookup`." : "Use `demo.lookup`.";
  writeFileSync(join(dir, "registry.json"), JSON.stringify({ schema_version: 2, repository: "https://github.com/Scrollport/web-research-extraction-skills", skills: [{ id: "fixture-skill", path: "skills/fixture-skill", status: "verified", customer_proven: false }] }));
  const manifest = {
    schema_version: 2,
    id: "fixture-skill",
    title: "Fixture Skill",
    version: "1.0.0",
    status: "verified",
    customer_proven: false,
    summary: "Fixture",
    outcome: "Fixture outcome",
    boundary: "Fixture boundary",
    category: "web-research-extraction",
    capabilities: [{ id: "web-search", tool_ids: ["demo.lookup"] }],
    license: "MIT",
    instruction_path: "SKILL.md",
    changelog_path: "CHANGELOG.md",
    dependencies: {
      scrollport_control_tools: ["search_tools", "inspect_tool", "run_tool", "get_run", "list_apps", "get_wallet"],
      catalog_tools: [{ tool_id: "demo.lookup", required: true, purpose: "Fixture lookup" }],
      connected_apps: [],
    },
    inputs: ["Input"],
    outputs: ["Output"],
    cost: { currency: "USD", model: "Per call", trial_safe_max_usd: "0.010000", notes: "Fixture" },
    approvals: ["Approve cost"],
    compatibility: ["Agent Skills host"],
    evidence: { verified_at: new Date().toISOString().slice(0, 10), review_due_at: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10), summary_path: "EVIDENCE.md", customer_proof_path: null },
  };
  mutateManifest?.(manifest);
  writeFileSync(join(skillDir, "skill.json"), JSON.stringify(manifest));
  const yaml = frontmatter ? "---\nname: fixture-skill\ndescription: Run a fixture lookup when testing independent Skill installation.\nlicense: MIT\n---\n" : "";
  writeFileSync(join(skillDir, "SKILL.md"), `${yaml}# Fixture\n\nCall search_tools, inspect_tool, run_tool, get_run, list_apps and get_wallet. ${dependencyLine}\n\nState: ${credential}\n`);
  writeFileSync(join(skillDir, "CHANGELOG.md"), "# Changelog\n");
  writeFileSync(join(skillDir, "EVIDENCE.md"), "# Evidence\n");
  return dir;
}

test("the canonical repository satisfies its publication contract", () => {
  assert.deepEqual(validateRepository(root), []);
});

test("the generated export includes the shared installation guide", () => {
  const install = readFileSync(join(root, "INSTALL.md"), "utf8");
  assert(install.includes("https://scrollport.com/start"));
  assert(install.includes("select every"));
  assert(readFileSync(join(root, "scripts", "build-exports.mjs"), "utf8").includes('join(out, "INSTALL.md")'));
});

test("runtime Skills use GitHub manifests as their only version authority", () => {
  const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
  for (const entry of source.skills) {
    const instruction = readFileSync(join(root, entry.path, entry.status === "verified" ? "SKILL.md" : "DRAFT.md"), "utf8");
    assert(!instruction.includes("scrollport-version:"), `${entry.id} repeats its canonical version`);
    assert(!instruction.includes("AUTHORING.md"), `${entry.id} loads maintainer-only authoring guidance`);
  }
});

test("generated runtime packages exclude maintainer provenance", () => {
  const build = readFileSync(join(root, "scripts", "build-exports.mjs"), "utf8");
  assert(!build.includes('join(out, "AUTHORING.md")'));
  assert(!build.includes("cpSync(sourceDir, targetDir, { recursive: true })"));
  assert(build.includes('for (const runtimeDirectory of ["assets", "references", "scripts"])'));
});

test("a complete fixture Skill validates independently", () => {
  assert.deepEqual(validateRepository(fixture()), []);
});

test("malformed frontmatter is rejected", () => {
  assert(validateRepository(fixture({ frontmatter: false })).some((error) => error.includes("YAML frontmatter")));
});

test("secret-bearing instructions are rejected", () => {
  assert(validateRepository(fixture({ secret: true })).some((error) => error.includes("Scrollport credential")));
});

test("undeclared catalog dependencies are rejected", () => {
  assert(validateRepository(fixture({ undeclared: true })).some((error) => error.includes("undeclared catalog tool other.lookup")));
});

test("non-canonical Skill categories are rejected", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.category = "miscellaneous"; } })).some((error) => error.includes("canonical Scrollport category")));
});

test("capabilities cannot reference undeclared catalog tools", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.capabilities[0].tool_ids = ["other.lookup"]; } })).some((error) => error.includes("references undeclared catalog tool other.lookup")));
});

test("every catalog dependency must have a capability association", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.capabilities[0].tool_ids = ["demo.lookup"]; manifest.dependencies.catalog_tools.push({ tool_id: "extra.lookup", required: false, purpose: "Extra lookup" }); } })).some((error) => error.includes("catalog dependency extra.lookup has no capability association")));
});

test("duplicate capability declarations are rejected", () => {
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.capabilities.push({ id: "web-search", tool_ids: ["demo.lookup"] }); } })).some((error) => error.includes("duplicate capability web-search")));
});

test("build output excludes candidates", () => {
  const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
  assert(!source.skills.filter((entry) => entry.status === "verified").some((entry) => entry.path.startsWith("candidates/")));
});

test("Blog Post to Podcast (media-audio-edition) is canonical without a package router", () => {
  const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
  assert.deepEqual(
    source.skills.map(({ id, status, customer_proven }) => ({ id, status, customer_proven })),
    [
      { id: "media-audio-edition", status: "verified", customer_proven: false },
    ],
  );
});

test("Blog Post to Podcast keeps its id and the former public id as an alias", () => {
  const manifest = JSON.parse(readFileSync(join(root, "skills", "media-audio-edition", "skill.json"), "utf8"));
  assert.equal(manifest.id, "media-audio-edition");
  assert.equal(manifest.title, "Blog Post to Podcast");
  assert(manifest.aliases.includes("scrollport-audio-edition"));
});

test("Blog Post to Podcast promises the whole package in plain words", () => {
  const dir = join(root, "skills", "media-audio-edition");
  const manifest = JSON.parse(readFileSync(join(dir, "skill.json"), "utf8"));
  assert.equal(manifest.outcome, "Turn a post or newsletter into a podcast episode people can follow by ear: two AI hosts talk it through, with intro music, show notes, a LinkedIn post and a short clip. You approve the script before anything is spent.");
  assert(Number(manifest.version.split(".")[0]) >= 5, "a conversation built for the ear replaced the read-aloud default, a major version");
  assert(manifest.inputs.length <= 5 && manifest.outputs.length <= 5, "at most five inputs and five outputs");
  const customerText = [
    readFileSync(join(dir, "SKILL.md"), "utf8"),
    JSON.stringify(manifest),
    readFileSync(join(root, "README.md"), "utf8"),
    ...["assets", "references"].flatMap((folder) => readdirSync(join(dir, folder)).map((name) => readFileSync(join(dir, folder, name), "utf8"))),
  ].join("\n");
  for (const term of [/non-truncated/i, /primitives?\b/i, /\bledger\b/i]) {
    assert(!term.test(customerText), `engineering wording ${term} is back`);
  }
});

test("Blog Post to Podcast gates spend on one approval and checks its audio", () => {
  const dir = join(root, "skills", "media-audio-edition");
  const skill = readFileSync(join(dir, "SKILL.md"), "utf8");
  const method = readFileSync(join(dir, "references", "episode-script.md"), "utf8");
  const joinSteps = readFileSync(join(dir, "references", "join.md"), "utf8");
  // Compare phrases regardless of line wrapping, across the Skill and the references it follows.
  const text = [skill, method, joinSteps].join("\n").replace(/\s+/g, " ");
  for (const voice of ["Eric", "Jessica", "Warm", "Lily"]) assert(skill.includes(`| ${voice} |`), `${voice} voice is offered`);
  // Legacy voices that didn't sit well with the current ones are gone.
  for (const legacy of ["21m00Tcm4TlvDq8ikWAM", "pNInz6obpgDQGcFmaJgB"]) assert(!skill.includes(legacy), `legacy voice ${legacy} is not offered`);
  assert(text.includes("Keep both hosts in one accent and one set") && text.includes("two or three other matched pairs"));
  // The user is told they can bring their own voices from ElevenLabs' library.
  const approvalBlock = skill.slice(skill.indexOf("Ready to record. Nothing has been spent yet."));
  assert(text.includes("any voice in ElevenLabs' voice library works, given its voice ID") && skill.includes("Prefer other voices? Pick any in ElevenLabs' voice library") && approvalBlock.includes("ElevenLabs' voice library, by voice ID"));
  assert(text.includes("or in voices the user picks from ElevenLabs' voice library") && text.includes("save the voice to My Voices, then pick Copy voice ID"), "the voice check offers the user's own voices, and the Skill says how to find an ID");
  // One message carries the script, the voice, the maximum and the typical spend; spending starts only after it is approved and recorded.
  const approval = skill.slice(skill.indexOf("Ready to record. Nothing has been spent yet."));
  for (const part of ["Voices: host Eric and co-host Jessica", "Cost: about $", "The maximum assumes list price and one re-take", "Outline (times from the first word", "Left out, listed in the show notes", "Checked:", "--- script", 'Reply "approve"']) assert(approval.includes(part), part);
  // The typical spend comes first; the honest maximum follows it.
  assert(/Cost: about \$[0-9.]+, at most \$[0-9.]+/.test(approval), "typical spend leads the maximum");
  assert(text.includes("Only then start the first paid run."));
  // The default is a two-host conversation rebuilt for the ear, written in passes from a brief of the post.
  assert(skill.includes("Conversation (default)") && skill.includes("| Eric and Jessica; Warm alone for one voice |"));
  for (const file of ["work/brief.md", "work/outline.md", "work/claims.md"]) assert(text.includes(file), file);
  assert(text.includes("six passes") && text.includes("Don't follow the post's order"));
  assert(text.includes("New illustrations yes, new facts no") && text.includes("Keep each claim's own exception"));
  assert(text.includes("no sentence over 25 words") && text.includes("never three sentences under 7 words in a row"));
  assert(text.includes("one real doubt per point") && text.includes("a payoff line"));
  // A reading stays available: summary boxes are skipped, headings become short spoken transitions, with worked examples.
  assert(/skip a summary box/i.test(text) && text.includes("short spoken transitions") && text.includes("verbatim"));
  assert(text.includes("Contractions") && text.includes("No ellipses or dashes"));
  assert((method.match(/^Written:/gm) ?? []).length >= 2 && (method.match(/^Spoken:/gm) ?? []).length >= 2, "before-and-after examples");
  // Delivery: v3 by default, a voice per turn in a conversation, one continuous text for one voice, splits only where a section ends.
  assert(text.includes("Default to Eleven v3") && text.includes("one entry per turn") && text.includes("one continuous text") && text.includes("only where a section ends"));
  // The voice check is a real gate that never continues by default.
  assert(text.includes("The voice check is a gate") && text.includes('Say "sounds right"') && text.includes("never continue by default"));
  assert(!text.includes("approve with voice check"), "the voice check is no longer optional");
  // Parts are evenly sized and stay under the request limit; length is estimated at 14 characters a second.
  assert(text.includes("at or under 1,900 characters") && text.includes("the smallest gap between the largest and smallest"));
  assert(text.includes("characters ÷ 14") && !/÷ 1[56]\b/.test(text), "length uses 14 characters a second");
  // Every part is faded and padded; only a loud ending is re-taken, and it is flagged rather than stopping the episode.
  assert(text.includes("areverse,atrim=0:0.05,volumedetect") && text.includes("only a level within 6 dB of the part's mean_volume") && text.includes("means the part may be cut off mid-word"));
  assert(!text.includes("only a level above −30 dB"), "the absolute ending threshold flagged every Eleven v3 opening");
  assert(text.includes("areverse,afade=t=in:d=0.05,areverse,apad=pad_dur=0.25"));
  assert(text.includes("an ending never stops the episode") && text.includes("Listen closely at"));
  assert(!text.includes("below −40 dB for the last 50 ms"), "the old hard-stop ending rule is gone");
  assert(!/matched its text/i.test(text) && text.includes("it can't tell which words were read"));
  // The sting is trimmed, checked and set 2 LU under the measured speech; the joins re-encode.
  assert(text.includes('"music_length_ms": 7000') && text.includes("atrim=0:5"));
  assert(text.includes("2 LU below the speech level") && text.includes("1 to 3 LU below the speech level"));
  assert(text.includes("-f concat") && text.includes("libmp3lame") && text.includes("I=-16") && text.includes("ebur128"));
  // A lost response is retried without paying twice; a deliberate repeat is explicit.
  assert(text.includes("without `--new`") && text.includes("idempotency_key"));
  // The result opens with the summary and ends with the Details appendix.
  const result = skill.indexOf("Episode ready:");
  assert(result > 0 && skill.indexOf("\nDetails\n", result) > result);
});

// A due date remains current through the end of that UTC day.
test("publication rejects invalid and future verification and withholds an overdue review", () => {
  const now = new Date("2026-09-07T23:59:59Z");
  for (const [verified_at, review_due_at, valid, withheld] of [
    ["2026-09-01", "2026-09-07", true, false],
    ["2026-09-01", "2026-09-06", true, true],
    ["2026-09-08", "2026-10-08", false, false],
    ["2026-09-07", "2026-09-01", false, false],
    ["2026-02-30", "2026-10-01", false, false],
  ]) {
    const dir = fixture({ mutateManifest: (manifest) => { manifest.evidence = { verified_at, review_due_at }; } });
    const result = checkRepository(dir, { now });
    assert.equal(result.errors.length === 0, valid, `${verified_at} / ${review_due_at}`);
    assert.equal(result.withheld.some((skill) => skill.id === "fixture-skill" && skill.reason === "review_overdue"), withheld, `withheld ${verified_at} / ${review_due_at}`);
  }
  const aligned = fixture({ mutateManifest: (manifest) => { manifest.category = "search-seo"; } });
  const registry = JSON.parse(readFileSync(join(aligned, "registry.json"), "utf8"));
  registry.repository = "https://github.com/Scrollport/search-seo-skills";
  writeFileSync(join(aligned, "registry.json"), JSON.stringify(registry));
  assert.deepEqual(validateRepository(aligned), []);
  registry.repository = "https://github.com/Scrollport/media-creation-skills";
  writeFileSync(join(aligned, "registry.json"), JSON.stringify(registry));
  assert(validateRepository(aligned).some((error) => error.includes("must match its owning repository")));
  assert(validateRepository(fixture({ mutateManifest: (manifest) => { manifest.category = "seo-search"; } })).length > 0);
});
