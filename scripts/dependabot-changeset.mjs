#!/usr/bin/env node
// Emit a patch changeset when a dependency PR changes what consumers of a
// *published* package actually download.
//
// Only `dependencies`, `peerDependencies` and `optionalDependencies` count. A
// devDependency bump rewrites a published package.json without altering the
// installed tree for anyone downstream, so it must not trigger a release --
// `ts-jest` and `typescript` are devDependencies of all seven published
// packages, so treating any manifest edit as release-worthy would republish
// every package with byte-identical shipped code on each grouped dev-dep PR.
//
// Usage: node scripts/dependabot-changeset.mjs <pr-number> <changed-file>...
// Env:   BASE_REF (default origin/main) -- the ref to compare against.
// Prints the created changeset path, or nothing if no release is warranted.

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PUBLISHED_DIR = 'packages/@road-signs/';
const CONSUMER_FACING = ['dependencies', 'peerDependencies', 'optionalDependencies'];
const BASE_REF = process.env.BASE_REF || 'origin/main';

const [prNumber, ...changedFiles] = process.argv.slice(2);

if (!prNumber) {
  console.error('usage: dependabot-changeset.mjs <pr-number> <changed-file>...');
  process.exit(2);
}

// stderr is ignored because a missing path in the base ref is an expected,
// handled outcome (a newly added package), not something to log.
const git = (args) =>
  execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

// Compare against the merge base, not the branch tip, so unrelated commits
// landing on main in between are not mistaken for changes in this PR.
let base;
try {
  base = git(['merge-base', BASE_REF, 'HEAD']);
} catch {
  base = BASE_REF;
}

const sections = (pkg) => JSON.stringify(CONSUMER_FACING.map((key) => pkg?.[key] ?? null));

const manifests = changedFiles.filter(
  (file) => file.startsWith(PUBLISHED_DIR) && file.endsWith('/package.json'),
);

const released = [];

for (const manifest of manifests) {
  let head;
  try {
    head = JSON.parse(readFileSync(resolve(manifest), 'utf8'));
  } catch {
    continue; // Deleted or unreadable in this checkout -- nothing to release.
  }
  if (head.private || !head.name) continue;

  let basePkg;
  try {
    basePkg = JSON.parse(git(['show', `${base}:${manifest}`]));
  } catch {
    // Not present in the base ref: a newly added published package.
    released.push(head.name);
    continue;
  }

  if (sections(basePkg) !== sections(head)) {
    released.push(head.name);
  }
}

if (released.length === 0) {
  process.exit(0);
}

const frontmatter = released.map((name) => `'${name}': patch`).join('\n');
const path = `.changeset/dependabot-pr-${prNumber}.md`;

writeFileSync(path, `---\n${frontmatter}\n---\n\nUpdate dependencies (#${prNumber}).\n`, 'utf8');

console.log(path);
