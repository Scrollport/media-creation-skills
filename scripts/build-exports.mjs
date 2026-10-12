import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { checkRepository } from "./validate.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const { errors, withheld } = checkRepository(root);
if (errors.length) throw new Error(`Cannot build invalid Skills repository:\n${errors.join("\n")}`);
const withheldIds = new Set(withheld.map((skill) => skill.id));

const out = join(root, "dist");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "skills"), { recursive: true });
cpSync(join(root, "INSTALL.md"), join(out, "INSTALL.md"));

const source = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const published = [];
for (const entry of source.skills.filter((skill) => skill.status === "verified" && !withheldIds.has(skill.id)).sort((a, b) => a.id.localeCompare(b.id))) {
  const sourceDir = join(root, entry.path);
  const targetDir = join(out, "skills", entry.id);
  const manifest = JSON.parse(readFileSync(join(sourceDir, "skill.json"), "utf8"));
  mkdirSync(targetDir, { recursive: true });
  cpSync(join(sourceDir, manifest.instruction_path), join(targetDir, manifest.instruction_path));
  for (const runtimeDirectory of ["assets", "references", "scripts"]) {
    const sourcePath = join(sourceDir, runtimeDirectory);
    if (existsSync(sourcePath)) cpSync(sourcePath, join(targetDir, runtimeDirectory), { recursive: true });
  }
  const skillBytes = readFileSync(join(sourceDir, "SKILL.md"));
  const { $schema: _schema, changelog_path: _changelogPath, evidence, ...publicManifest } = manifest;
  published.push({
    ...publicManifest,
    evidence: {
      verified_at: evidence.verified_at,
      review_due_at: evidence.review_due_at,
    },
    path: `skills/${entry.id}`,
    source_repository: source.repository,
    source_ref: process.env.SCROLLPORT_SKILLS_REF ?? "working-tree",
    skill_sha256: createHash("sha256").update(skillBytes).digest("hex"),
  });
}

const registry = {
  schema_version: 2,
  source_repository: source.repository,
  source_ref: process.env.SCROLLPORT_SKILLS_REF ?? "working-tree",
  skills: published,
};
writeFileSync(join(out, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
// Consumers (the website aggregator) read why a requested Skill is absent.
writeFileSync(join(out, "withheld.json"), `${JSON.stringify({ schema_version: 1, skills: withheld }, null, 2)}\n`);
for (const skill of withheld) console.warn(`Withheld ${skill.id}: review overdue since ${skill.review_due_at}.`);
console.log(`Built ${published.length} published Skill export${published.length === 1 ? "" : "s"}.`);
