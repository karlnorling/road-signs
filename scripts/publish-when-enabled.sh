#!/usr/bin/env bash
# Publish gate for the release workflow.
#
# release.yml runs on every push to main, and when there are no unconsumed
# changesets `changesets/action` falls through to its publish path. Without a
# credential that path fails with
#
#   E404 Not Found - PUT https://registry.npmjs.org/@road-signs%2faf
#
# which is npm's way of saying "unauthenticated" for a scope you cannot write
# to. And the moment a credential does reach CI, an unguarded path would
# mass-publish the whole scope on a merge.
#
# So publishing is opt-in. The first release is done deliberately and locally
# with `yarn publish-first-release --execute`; only once that is done and npm
# trusted publishing is configured should CI take over.
#
# The actual publishing lives in scripts/publish.sh, which explains why it
# uses `yarn pack` + `npm publish` rather than either tool on its own.
#
# To hand publishing to CI, set the repository variable PUBLISH_ENABLED=true:
#   gh variable set PUBLISH_ENABLED --body true
set -euo pipefail

if [[ "${PUBLISH_ENABLED:-}" != "true" ]]; then
  echo "PUBLISH_ENABLED is not 'true' — skipping npm publish."
  echo
  echo "Before enabling this, prove trusted publishing works on one package:"
  echo "    gh workflow run release.yml -f smoke-test-package=core"
  echo
  echo "Then hand publishing to CI with:"
  echo "    gh variable set PUBLISH_ENABLED --body true"
  echo
  echo "Verify a package's OIDC config with:  npm trust list @road-signs/core"
  exit 0
fi

exec bash scripts/publish.sh
