# Releasing

`@road-signs/*` uses [Changesets](https://github.com/changesets/changesets) for
versioning and npm publishing. Each country package versions independently —
a US re-scrape only bumps `@road-signs/us`.

## Adding a changeset

When you make a user-facing change to one or more packages, add a changeset:

```sh
yarn changeset
```

You'll be prompted to select which packages changed and the bump level
(`patch`, `minor`, `major`) per package, then write a short user-facing
summary. Commit the resulting `.changeset/<slug>.md` file alongside your code
change.

Rules of thumb:

- **Patch** — fixing a sign code, regenerating after upstream Wikipedia edits,
  asset cleanup, README fixes.
- **Minor** — adding a new country package, adding a new exported helper,
  extending a sign category union, scraper/PDF-source additions.
- **Major** — changing the `Sign` shape in `@road-signs/core`, removing
  exported names, breaking sign code conventions.

## What happens on merge to `main`

The `.github/workflows/release.yml` workflow watches `main`:

1. **If there are unconsumed changesets** (`.changeset/*.md` files not yet
   applied), the workflow opens or updates a `chore: version packages` PR. The
   PR contains the version bumps and CHANGELOG entries the changesets specify.
2. **If you merge the version PR**, the workflow detects no remaining
   changesets and runs `yarn changeset publish`, which pushes each bumped
   package to npm.

You never run `changeset version` or `changeset publish` locally —
the workflow handles both.

## Required secrets

The release workflow needs `NPM_TOKEN` in the repo's GitHub Actions secrets.
Generate one at <https://www.npmjs.com/settings/{user}/tokens> with **Automation**
scope and add it under Settings → Secrets and variables → Actions.

## CI before merging

`.github/workflows/ci.yml` runs on every PR and mirrors the local pre-push
hooks: `manypkg check`, `oxlint`, `tsc --noEmit` per workspace, the category
validator, and `yarn test`. A PR must be green before the release workflow
will consider it.

## Initial release

On first publish, the workflow will publish every package at the version
listed in its `package.json` (currently `0.1.0`). Subsequent releases only
bump packages whose changesets target them.

## Skipping a release

If a commit touches packages but you don't want to publish (e.g. internal
refactor, documentation-only change), simply don't add a changeset.
