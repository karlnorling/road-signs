#!/usr/bin/env bash
# Publish gate for the release workflow.
#
# release.yml runs on every push to main, and when there are no unconsumed
# changesets `changesets/action` falls through to its publish path. Nothing in
# this scope is published yet, so that path currently fails on every push with
#
#   E404 Not Found - PUT https://registry.npmjs.org/@road-signs%2faf
#
# which is npm's way of saying "unauthenticated" for a scope you cannot write
# to. Worse, the moment any credential reaches CI this would mass-publish every
# package automatically, on a merge, before any trusted publisher is
# registered.
#
# So publishing is opt-in. The first release is done deliberately and locally
# with `yarn publish-first-release --execute`; only once that is done and npm
# trusted publishing is configured should CI take over.
#
# To hand publishing to CI, set the repository variable PUBLISH_ENABLED=true:
#   gh variable set PUBLISH_ENABLED --body true
set -euo pipefail

if [[ "${PUBLISH_ENABLED:-}" != "true" ]]; then
  echo "PUBLISH_ENABLED is not 'true' — skipping npm publish."
  echo
  echo "Nothing in @road-signs is published yet. Do the first release locally:"
  echo "    yarn compile"
  echo "    NPM_JS_AUTH=<token> yarn publish-first-release --execute"
  echo
  echo "Then configure npm trusted publishing per package and enable CI with:"
  echo "    gh variable set PUBLISH_ENABLED --body true"
  exit 0
fi

exec yarn changeset publish
