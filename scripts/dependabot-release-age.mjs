#!/usr/bin/env node
// Report how old the *oldest-is-irrelevant, youngest-matters* target release in
// a Dependabot PR is, by reading the PR body on stdin and asking npm when each
// target version was published.
//
// The sweep used to gate on PR age as a proxy for release age. That proxy is
// wrong in two ways:
//   * it double-counts, because dependabot.yml's `cooldown` already waited for
//     the release before the PR was opened, so a version update waited twice;
//   * it resets to zero whenever Dependabot closes and regenerates a grouped
//     PR, even though the underlying releases keep ageing.
// Measuring the releases directly is immune to both.
//
// Usage: <pr body on stdin> | node scripts/dependabot-release-age.mjs
// Prints "<hours> <name>@<version>" for the youngest target release, or
// "unknown" when nothing could be determined -- the caller then falls back to
// PR age rather than merging something unverified.

import { execFileSync } from 'node:child_process';

const body = await new Promise((resolve) => {
  let s = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (d) => (s += d));
  process.stdin.on('end', () => resolve(s));
});

// Dependabot writes both forms, depending on single vs grouped PRs:
//   Bumps [name](url) from 1.0.0 to 1.1.0.
//   Updates `name` from 1.0.0 to 1.1.0
const PATTERNS = [
  /^\s*Bumps\s+\[([^\]]+)\]\([^)]*\)\s+from\s+\S+\s+to\s+(\S+?)\.?\s*$/gm,
  /^\s*Bumps\s+`?([^`\s]+)`?\s+from\s+\S+\s+to\s+(\S+?)\.?\s*$/gm,
  /^\s*Updates\s+`([^`]+)`\s+from\s+\S+\s+to\s+(\S+?)\.?\s*$/gm,
];

// The looser `Bumps name from A to B` pattern also matches the bracketed form,
// capturing "[name](url)" as the name, so every candidate is validated against
// the npm name grammar and the first pattern to match a package wins.
const VALID_NAME = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i;

const targets = new Map(); // name -> version
for (const re of PATTERNS) {
  for (const m of body.matchAll(re)) {
    const name = m[1].trim();
    const version = m[2].trim();
    // A group header ("Bumps the x group with 3 updates") has no version.
    if (!/^\d/.test(version)) continue;
    if (!VALID_NAME.test(name)) continue;
    if (targets.has(name)) continue;
    targets.set(name, version);
  }
}

if (targets.size === 0) {
  console.log('unknown');
  process.exit(0);
}

// Dependabot hard-truncates a PR body at GitHub's 64 KiB limit, and a large
// group loses update lines off the end -- a 14-update group was observed
// listing only 11, with "... (truncated)" in the body. Checking only the
// visible subset would silently pass a PR whose youngest release is one of the
// invisible ones. So cross-check against the count the title declares, and
// refuse to answer when they disagree.
const declared = /\bwith\s+(\d+)\s+updates?\b/i.exec(body);
if (declared) {
  const expected = Number(declared[1]);
  if (targets.size < expected) {
    console.log('unknown');
    process.exit(0);
  }
}

const publishedAt = (name, version) => {
  const out = execFileSync('npm', ['view', name, 'time', '--json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    maxBuffer: 1 << 26,
  });
  const times = JSON.parse(out);
  return times?.[version] ?? null;
};

let youngest = null;
for (const [name, version] of targets) {
  let when;
  try {
    when = publishedAt(name, version);
  } catch {
    // A private or renamed package, or a registry hiccup. Do not guess.
    console.log('unknown');
    process.exit(0);
  }
  if (!when) {
    console.log('unknown');
    process.exit(0);
  }
  const hours = (Date.now() - new Date(when).getTime()) / 3_600_000;
  if (youngest === null || hours < youngest.hours) {
    youngest = { name, version, hours };
  }
}

console.log(`${Math.floor(youngest.hours)} ${youngest.name}@${youngest.version}`);
