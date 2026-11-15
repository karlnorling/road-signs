#!/usr/bin/env bash
# Publish every public workspace package whose version is not on the registry.
#
# This exists because neither package manager can do the job alone.
#
# Not `yarn changeset publish`: changesets detects the workspace tool and, for
# Yarn Berry, shells out to `yarn npm publish` for each package. Yarn's
# publisher uses its own HTTP client and cannot perform the npm OIDC token
# exchange, so trusted publishing never engages and every package fails with
#   E404 Not Found - PUT https://registry.npmjs.org/@road-signs%2f<pkg>
# which is npm's way of saying "unauthenticated" for a scope you cannot write
# to. This is the same finding that made ghs-hazard-pictograms publish with the
# npm CLI directly.
#
# Not plain `npm publish` either: internal dependencies here are declared
# `workspace:*`. `yarn pack` rewrites that to the real version, `npm pack` ships
# the literal string, which no consumer can install. Verified against se:
#   yarn pack -> "@road-signs/core": "0.1.0"
#   npm pack  -> "@road-signs/core": "workspace:*"
# The 0.1.0 releases are correct because they went out through Yarn.
#
# So: pack with Yarn for a correct manifest, publish that tarball with npm for
# the OIDC exchange and provenance.
#
# Env:
#   PUBLISH_ONLY  publish just this one package (bare country/package name,
#                 e.g. "core"). Used to smoke-test trusted publishing against a
#                 single package before releasing all of them.
set -euo pipefail

ONLY="${PUBLISH_ONLY:-}"

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

published=0
skipped=0
failed=0
failures=()

for dir in packages/@road-signs/*/; do
  [ -f "${dir}package.json" ] || continue

  pkg=$(basename "$dir")
  if [ -n "$ONLY" ] && [ "$pkg" != "$ONLY" ]; then
    continue
  fi

  name=$(node -p "require('./${dir}package.json').name")
  version=$(node -p "require('./${dir}package.json').version")
  private=$(node -p "require('./${dir}package.json').private || false")
  [ "$private" = "true" ] && continue

  # An empty registry means there is nothing worth shipping. These packages are
  # scaffolded placeholders; publishing them just reserves a name with no signs.
  signs=$(node -p "
    const fs = require('fs');
    const f = './${dir}src/signs.generated.ts';
    try { fs.statSync(f); process.stdout.write('yes'); } catch { process.stdout.write('no'); }
  " 2>/dev/null || echo 'no')
  if [ "$signs" = 'no' ] && [ -z "$ONLY" ]; then
    case "$pkg" in
      core | docs | elements | react | vue | sm | va) ;;
      *)
        echo "Skipping ${name} (no registry to ship)"
        skipped=$((skipped + 1))
        continue
        ;;
    esac
  fi

  if npm view "${name}@${version}" version >/dev/null 2>&1; then
    echo "Skipping ${name}@${version} (already published)"
    skipped=$((skipped + 1))
    continue
  fi

  echo "Publishing ${name}@${version}..."
  tarball="$TMP/${pkg}.tgz"

  if ! (cd "$dir" && yarn pack --out "$tarball") >/dev/null; then
    echo "  pack failed for ${name}" >&2
    failed=$((failed + 1))
    failures+=("$name (pack)")
    continue
  fi

  if npm publish "$tarball" --provenance --access public; then
    # changesets/action scans publish output for this exact shape to decide
    # which GitHub Releases to create.
    echo "New tag: ${name}@${version}"
    published=$((published + 1))
  else
    echo "  publish failed for ${name}" >&2
    failed=$((failed + 1))
    failures+=("$name")
  fi

  rm -f "$tarball"
  sleep 0.75
done

echo
echo "${published} published, ${skipped} skipped, ${failed} failed"

if [ "$failed" -gt 0 ]; then
  printf '  failed: %s\n' "${failures[@]}" >&2
  exit 1
fi

# Tags only make sense for a full release, not a single-package smoke test.
if [ -z "$ONLY" ]; then
  yarn changeset tag
fi
