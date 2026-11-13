#!/bin/bash
# Process every open Dependabot PR: age-check it, add a changeset if it touches a
# published package, then merge it once CI is green. Anything stale or conflicted
# is handed back to Dependabot for a rebase.
#
# Run locally in report-only mode with:  DRY_RUN=true bash scripts/dependabot-sweep.sh
#
# Requires: gh authenticated, GH_TOKEN with contents+pull-requests write.
set -euo pipefail

REPO="${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
DRY_RUN="${DRY_RUN:-false}"
BASE_BRANCH="${BASE_BRANCH:-main}"
# Floor matching npmMinimalAgeGate in .yarnrc.yml. Dependabot's own `cooldown`
# covers version updates; this re-checks it so *security* update PRs — which
# ignore cooldown — also age in before they are merged unattended.
MIN_AGE_HOURS="${MIN_AGE_HOURS:-168}"

merged=0
waiting=0
held=0
updated=0
conflicted=0

# Remembered so the changeset step can return here after checking out a PR
# branch. Prefer the branch name over a bare SHA, which would leave the repo on
# a detached HEAD after a local run.
START_REF=$(git symbolic-ref --short -q HEAD || git rev-parse HEAD)

# This script checks out PR branches and force-returns to START_REF, which
# would discard uncommitted work. Refuse to run in a dirty tree so a local
# rehearsal cannot destroy in-progress edits.
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "error: working tree has uncommitted changes." >&2
  echo "       This script force-checks-out branches and would discard them." >&2
  echo "       Commit or stash first." >&2
  exit 1
fi

# Copied aside so the PR-branch checkout cannot shadow it.
# Copied into a temp *directory* keeping their real filenames. `node` infers
# ESM from the .mjs extension, so an extensionless `mktemp` file dies with
# ERR_UNKNOWN_FILE_EXTENSION -- which an earlier `|| true` silently turned into
# "no changeset needed".
SWEEP_TMP=$(mktemp -d)
cp scripts/dependabot-changeset.mjs scripts/dependabot-release-age.mjs "$SWEEP_TMP/"
GENERATOR="$SWEEP_TMP/dependabot-changeset.mjs"
RELEASE_AGE="$SWEEP_TMP/dependabot-release-age.mjs"
trap 'rm -rf "$SWEEP_TMP"' EXIT

note() { printf '  %s\n' "$1"; }

# Dependabot refuses `@dependabot <command>` from a GitHub App, whatever
# permissions the App holds -- "Sorry, only users with push access can use that
# command" (dependabot/dependabot-core#9147). So the sweep does the work with
# the APIs an App token *can* use, and only falls back to the comment when a
# personal token is available.
NEEDS_REBASE_LABEL="needs-manual-rebase"
HINT_MARKER="<!-- dependabot-sweep:needs-manual-rebase -->"

# Merge the base branch into the PR branch. This is what the "Update branch"
# button does, and an App token with contents+pull-requests write may use it.
update_pr_branch() {
  local pr="$1"
  gh api -X PUT "repos/$REPO/pulls/$pr/update-branch" --silent
}

# A conflicted PR cannot be fixed from here: only Dependabot knows which
# version it meant to pin, and for a lockfile-only PR the whole change lives in
# the lockfile. Make it visible instead of silently re-commenting every sweep.
flag_conflicted() {
  local pr="$1"

  # With a personal token the Dependabot command actually works, so prefer it.
  if [[ -n "${DEPENDABOT_PAT:-}" ]]; then
    note "posting @dependabot recreate with DEPENDABOT_PAT"
    GH_TOKEN="$DEPENDABOT_PAT" gh pr comment "$pr" --repo "$REPO" \
      --body "@dependabot recreate"
    return 0
  fi

  gh label create "$NEEDS_REBASE_LABEL" --repo "$REPO" \
    --color D93F0B --description "Conflicts with the base branch; needs a manual rebase" \
    >/dev/null 2>&1 || true
  gh pr edit "$pr" --repo "$REPO" --add-label "$NEEDS_REBASE_LABEL" >/dev/null 2>&1 || true

  # Comment once, not once per sweep.
  if gh pr view "$pr" --repo "$REPO" --json comments \
      --jq '.comments[].body' 2>/dev/null | grep -qF "$HINT_MARKER"; then
    note "already flagged, not commenting again"
    return 0
  fi

  gh pr comment "$pr" --repo "$REPO" --body "$HINT_MARKER
This PR conflicts with \`$BASE_BRANCH\` and the sweep cannot fix it automatically.

Dependabot rejects \`@dependabot\` commands from a GitHub App regardless of the App's permissions ([dependabot-core#9147](https://github.com/dependabot/dependabot-core/issues/9147)), and the conflict cannot be resolved from here either: for a lockfile-only update the entire change lives in \`yarn.lock\`, so re-resolving it would simply discard the bump.

Someone with push access can comment \`@dependabot recreate\`, or the update can be redone by hand with \`yarn up -R <package>\`.

Labelled \`$NEEDS_REBASE_LABEL\`. The sweep will keep skipping this PR until it is mergeable."
}

PR_FIELDS='number,title,createdAt,headRefName,mergeable,mergeStateStatus,statusCheckRollup,files,body'

# GitHub computes mergeability lazily: the first query for a PR returns
# mergeable=UNKNOWN and merely *schedules* the computation server-side. A cold
# sweep that trusts the first answer sees UNKNOWN for every PR and merges
# nothing, so poll until it resolves.
fetch_pr() {
  local pr="$1" attempt data mergeable
  for attempt in 1 2 3 4 5 6; do
    data=$(gh pr view "$pr" --repo "$REPO" --json "$PR_FIELDS")
    mergeable=$(jq -r '.mergeable' <<<"$data")
    if [[ "$mergeable" != "UNKNOWN" ]]; then
      printf '%s' "$data"
      return 0
    fi
    sleep 2
  done
  printf '%s' "$data"
}

run() {
  if [[ "$DRY_RUN" == "true" ]]; then
    note "DRY RUN would: $*"
    return 0
  fi
  "$@"
}

prs=$(gh pr list --repo "$REPO" --author app/dependabot --state open \
  --limit 100 --json number -q '.[].number' | sort -n)

if [[ -z "$prs" ]]; then
  echo "No open Dependabot PRs."
  exit 0
fi

# Prime the lazy mergeability computation for every PR up front, so that by the
# time the main loop reaches each one GitHub has usually already answered.
for pr in $prs; do
  gh pr view "$pr" --repo "$REPO" --json mergeable > /dev/null 2>&1 || true
done

for pr in $prs; do
  data=$(fetch_pr "$pr")

  title=$(jq -r '.title' <<<"$data")
  mergeable=$(jq -r '.mergeable' <<<"$data")
  state=$(jq -r '.mergeStateStatus' <<<"$data")
  created=$(jq -r '.createdAt' <<<"$data")
  body=$(jq -r '.body // ""' <<<"$data")

  echo "PR #$pr — $title"
  note "mergeable=$mergeable state=$state"

  # --- Age gate -------------------------------------------------------------
  # Gate on how old the released versions are, not on how old the PR is. PR age
  # was a poor proxy: dependabot.yml's `cooldown` already waited for the release
  # before opening the PR, so a version update served the floor twice, and the
  # clock reset to zero every time Dependabot regenerated a grouped PR even
  # though the releases themselves kept ageing.
  pr_age_hours=$(( ( $(date -u +%s) - $(date -u -d "$created" +%s 2>/dev/null \
    || date -u -j -f '%Y-%m-%dT%H:%M:%SZ' "$created" +%s) ) / 3600 ))

  if ! release_age=$(printf '%s' "$body" | node "$RELEASE_AGE"); then
    note "WARNING — release-age helper failed; falling back to PR age"
    release_age=unknown
  fi

  if [[ "$release_age" == unknown* ]]; then
    # Could not read target versions from the PR body, or the registry did not
    # answer. Fall back to PR age rather than merging something unverified.
    if (( pr_age_hours < MIN_AGE_HOURS )); then
      note "HELD — release ages unknown, PR is ${pr_age_hours}h old, needs ${MIN_AGE_HOURS}h"
      held=$((held + 1))
      continue
    fi
    note "release ages unknown; falling back to PR age ${pr_age_hours}h — past the floor"
  else
    youngest_hours=${release_age%% *}
    youngest_pkg=${release_age#* }
    if (( youngest_hours < MIN_AGE_HOURS )); then
      note "HELD — youngest release ${youngest_pkg} is ${youngest_hours}h old, needs ${MIN_AGE_HOURS}h"
      held=$((held + 1))
      continue
    fi
    note "youngest release ${youngest_pkg} is ${youngest_hours}h old — past the ${MIN_AGE_HOURS}h floor"
  fi

  # --- Branch freshness -----------------------------------------------------
  # Conflicts are read from `mergeable`, not `mergeStateStatus`: the former is
  # the field that reliably resolves, the latter can stay UNKNOWN indefinitely
  # and is only used here for the BEHIND hint.
  if [[ "$mergeable" == "CONFLICTING" ]]; then
    note "CONFLICTED — flagging for a manual rebase"
    if [[ "$DRY_RUN" == "true" ]]; then
      note "DRY RUN would: label $NEEDS_REBASE_LABEL and comment once"
    else
      flag_conflicted "$pr"
    fi
    conflicted=$((conflicted + 1))
    continue
  fi

  if [[ "$state" == "BEHIND" ]]; then
    note "BEHIND $BASE_BRANCH — merging the base branch into the PR branch"
    if [[ "$DRY_RUN" == "true" ]]; then
      note "DRY RUN would: PUT repos/$REPO/pulls/$pr/update-branch"
    elif update_pr_branch "$pr"; then
      note "branch updated; CI will re-run, merge on the next sweep"
    else
      note "update-branch was refused — flagging for a manual rebase"
      flag_conflicted "$pr"
      conflicted=$((conflicted + 1))
      continue
    fi
    updated=$((updated + 1))
    continue
  fi

  # --- Changeset, only when a published package's manifest moved ------------
  changed=$(jq -r '.files[].path' <<<"$data")
  branch=$(jq -r '.headRefName' <<<"$data")

  if [[ -n "$(grep -E '^packages/@road-signs/[^/]+/package\.json$' <<<"$changed" || true)" ]]; then
    if gh api "repos/$REPO/contents/.changeset?ref=$branch" -q '.[].name' \
      | grep -q "dependabot-pr-${pr}.md"; then
      note "changeset already present"
    else
      note "published manifest touched — checking whether it is consumer-facing"
      git fetch -q origin "$branch"
      git checkout -q -B "sweep-probe-$pr" "origin/$branch"
      # Run the generator from the sweep's own checkout, not the PR branch:
      # a PR branched before this logic shipped still carries the old script.
      if ! created_file=$(BASE_REF=origin/main node "$GENERATOR" "$pr" $changed); then
        note "ERROR — changeset generator failed; holding rather than merging unverified"
        git checkout -q --force "$START_REF"
        git branch -q -D "sweep-probe-$pr" 2>/dev/null || true
        held=$((held + 1))
        continue
      fi
      if [[ -n "$created_file" ]]; then
        if [[ "$DRY_RUN" == "true" ]]; then
          note "DRY RUN would: commit $created_file to $branch, then merge next sweep"
          rm -f "$created_file"
        else
          git add "$created_file"
          git -c user.name='github-actions[bot]' \
              -c user.email='github-actions[bot]@users.noreply.github.com' \
              commit -q -m "chore: add changeset for #${pr}"
          git push -q origin "HEAD:$branch"
          note "changeset pushed, CI will re-run on the new commit"
        fi
        git checkout -q --force "$START_REF"
        git branch -q -D "sweep-probe-$pr" 2>/dev/null || true
        waiting=$((waiting + 1))
        continue
      fi
      git checkout -q --force "$START_REF"
      git branch -q -D "sweep-probe-$pr" 2>/dev/null || true
      # No consumer-facing change, so no changeset and no release. Fall through
      # to the merge checks rather than parking the PR in WAITING forever,
      # which is what an unconditional `continue` here would do.
      note "devDependency-only — no changeset needed, continuing to merge checks"
    fi
  fi

  # --- CI status ------------------------------------------------------------
  pending=$(jq '[.statusCheckRollup[]?
    | select((.status? // "") as $s | $s == "QUEUED" or $s == "IN_PROGRESS" or $s == "PENDING")
    , select((.state? // "") == "PENDING")] | length' <<<"$data")
  failing=$(jq '[.statusCheckRollup[]?
    | select((.conclusion? // "") as $c | $c == "FAILURE" or $c == "TIMED_OUT"
             or $c == "CANCELLED" or $c == "ACTION_REQUIRED" or $c == "STARTUP_FAILURE")
    , select((.state? // "") as $s | $s == "FAILURE" or $s == "ERROR")] | length' <<<"$data")
  total=$(jq '[.statusCheckRollup[]?] | length' <<<"$data")

  if (( failing > 0 )); then
    note "FAILING — $failing check(s) red, leaving for review"
    held=$((held + 1))
    continue
  fi
  if (( total == 0 || pending > 0 )); then
    note "WAITING — $pending check(s) still running (of $total)"
    waiting=$((waiting + 1))
    continue
  fi
  if [[ "$mergeable" != "MERGEABLE" ]]; then
    note "WAITING — GitHub reports mergeable=$mergeable"
    waiting=$((waiting + 1))
    continue
  fi

  note "GREEN — merging ($total checks passed)"
  # Every dependency PR edits yarn.lock, so each merge can invalidate the next
  # one in this same sweep. A rejected merge is expected, not fatal: hand that
  # PR to Dependabot for a rebase and keep going.
  if run gh pr merge "$pr" --repo "$REPO" --merge --delete-branch; then
    merged=$((merged + 1))
  else
    note "merge rejected (likely now conflicting) — flagging for a manual rebase"
    if [[ "$DRY_RUN" != "true" ]]; then flag_conflicted "$pr" || true; fi
    conflicted=$((conflicted + 1))
  fi
done

echo
echo "Swept: $merged merged, $waiting waiting, $held held, $updated branch-updated, $conflicted conflicted"

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    echo "### Dependabot sweep"
    echo
    echo "| merged | waiting | held | branch updated | conflicted |"
    echo "|---|---|---|---|---|"
    echo "| $merged | $waiting | $held | $updated | $conflicted |"
  } >> "$GITHUB_STEP_SUMMARY"
fi
