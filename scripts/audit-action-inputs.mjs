#!/usr/bin/env node
// Check every `with:` key in .github/workflows against the inputs each action
// actually declares at the pinned ref.
//
// This exists because GitHub Actions only *warns* on an unknown input, so an
// action major bump that renames inputs fails silently. In the sibling
// ghs-hazard-pictograms repo a single `changesets/action@v1 -> v2` bump caused
// three separate production breakages this way -- renamed `publish`/`version`/
// `createGithubReleases` inputs, and a token that moved from the GITHUB_TOKEN
// environment variable to a `github-token` input. None were visible on the PR,
// because the release job only runs on push to the default branch.
//
// Exit 1 on an input the action does not declare. Deprecated inputs only warn:
// they still function, and failing on them would block unrelated work.
//
// Usage: node scripts/audit-action-inputs.mjs
// Requires: gh CLI authenticated (GH_TOKEN in CI).

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

const WORKFLOW_DIR = '.github/workflows';

const usages = new Map(); // "owner/repo@ref" -> Map(input -> Set(workflow files))

for (const file of readdirSync(WORKFLOW_DIR)) {
  if (!/\.ya?ml$/.test(file)) continue;
  const doc = parse(readFileSync(`${WORKFLOW_DIR}/${file}`, 'utf8'));
  for (const job of Object.values(doc?.jobs ?? {})) {
    for (const step of job?.steps ?? []) {
      // Local and docker actions have no action.yml to fetch from a ref.
      if (!step?.uses || step.uses.startsWith('./') || step.uses.startsWith('docker://')) continue;
      if (!usages.has(step.uses)) usages.set(step.uses, new Map());
      const inputs = usages.get(step.uses);
      for (const key of Object.keys(step.with ?? {})) {
        if (!inputs.has(key)) inputs.set(key, new Set());
        inputs.get(key).add(file);
      }
    }
  }
}

const fetchDefinition = (repo, ref) => {
  for (const name of ['action.yml', 'action.yaml']) {
    try {
      const b64 = execFileSync(
        'gh',
        ['api', `repos/${repo}/contents/${name}?ref=${ref}`, '--jq', '.content'],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
      );
      return parse(Buffer.from(b64, 'base64').toString('utf8'));
    } catch {
      /* try the other filename */
    }
  }
  return null;
};

let invalid = 0;
let deprecated = 0;
let unresolved = 0;

for (const [uses, inputs] of [...usages].sort()) {
  const at = uses.lastIndexOf('@');
  const repo = uses.slice(0, at);
  const ref = uses.slice(at + 1);

  const def = fetchDefinition(repo, ref);
  if (!def) {
    console.log(`?  ${uses} — could not fetch action definition, skipped`);
    unresolved++;
    continue;
  }

  const declared = def.inputs ?? {};
  console.log(uses);
  for (const [input, files] of [...inputs].sort()) {
    const where = [...files].join(', ');
    const spec = declared[input];
    if (!spec) {
      console.log(`   INVALID     ${input} — not an input of ${ref} (${where})`);
      invalid++;
    } else if (spec.deprecationMessage) {
      console.log(`   deprecated  ${input} — ${spec.deprecationMessage} (${where})`);
      deprecated++;
    } else {
      console.log(`   ok          ${input}`);
    }
  }
}

console.log(`\n${invalid} invalid, ${deprecated} deprecated, ${unresolved} unresolved`);

if (invalid > 0) {
  console.error(
    '\nAn action is being passed an input it does not declare. GitHub Actions ' +
      'only warns about this, so the step would run with that setting ignored.',
  );
  process.exit(1);
}
