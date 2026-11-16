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

# changesets/action v2 does not parse stdout for "New tag:" lines the way v1
# did. It passes a file path in CHANGESETS_OUTPUT and reads newline-delimited
# JSON from it, one object per published package:
#
#   {"type":"git-tag","tag":"<pkg>@<version>","packageName":"<pkg>"}
#
# Without that file the action logs "GitHub releases and git tags cannot be
# created without this output" and skips both -- which is why 136 published
# versions have no tag and no release. The file must exist even when nothing is
# published, or the read itself fails. Unset on the workflow_dispatch smoke
# test, which calls this script directly.
if [ -n "${CHANGESETS_OUTPUT:-}" ]; then
  : > "$CHANGESETS_OUTPUT"
fi

# Appends one git-tag event. `packageName` must match the workspace package
# exactly; the action throws if it cannot resolve it.
record_published() {
  [ -n "${CHANGESETS_OUTPUT:-}" ] || return 0
  printf '{"type":"git-tag","tag":"%s@%s","packageName":"%s"}\n' "$1" "$2" "$1" \
    >> "$CHANGESETS_OUTPUT"
}

# Which packages are worth publishing is decided by bin/publishable.ts, next to
# the registry reader that enforces it: it drops the 63 scaffolded placeholders
# with empty registries and anything under the 50% artwork-coverage bar set for
# the first release. Doing this in bash got it wrong -- a placeholder's
# signs.generated.ts exists, it just holds an empty array.
PUBLISHABLE="$TMP/publishable.txt"
yarn publishable > "$PUBLISHABLE"
echo "$(wc -l < "$PUBLISHABLE" | tr -d ' ') packages are publishable"
echo

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

  if ! grep -qxF "$name" "$PUBLISHABLE"; then
    skipped=$((skipped + 1))
    continue
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
    record_published "$name" "$version"
    echo "Published ${name}@${version}"
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

# No `changeset tag` here: it also appends to CHANGESETS_OUTPUT, which records
# every tag twice and makes the action create each GitHub release twice (the
# second fails with already_exists). The action creates the tags itself,
# through the API, from the events recorded above.
