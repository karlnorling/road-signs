# @road-signs/na

## 0.2.0

### Minor Changes

- 590ce11: Register artwork that was already downloaded but never added to the registry.

  `yarn fill-gaps` registered a Commons file only when that run downloaded it.
  A country whose artwork had been fetched earlier therefore got nothing: the
  run that would have registered it found nothing left to download. Luxembourg
  held 407 SVGs on disk and shipped four signs.

  Registration now covers every file in a category. No new artwork was fetched
  for this release -- every sign below was already on disk.

  | package                                 | before | after     |
  | --------------------------------------- | ------ | --------- |
  | `lu`                                    | 4      | 405       |
  | `ls` `mg` `mw` `mz` `na` `rw` `sz` `zm` | 45-47  | ~900 each |
  | `ag`                                    | 0      | 47        |
  | `et`                                    | 0      | 17        |
  | `tm` `tn` `bb` `bs` `dm` `ly`           | 0      | 1-5 each  |

  All of them report 100% artwork coverage. The eight SADC packages carry the
  regional catalogue their `fill-gaps` configuration already named; `za`, `zw`
  and `tz` list only country-specific categories and so remain at 322.

## 0.1.2

### Patch Changes

- 29e5d76: Fix `ERR_MODULE_NOT_FOUND` when importing the ESM build in Node. Relative imports in `dist/esm` now end in `.js`, as Node's ESM loader requires. Bundlers were unaffected.
- Updated dependencies [29e5d76]
  - @road-signs/core@0.1.2

## 0.1.1

### Patch Changes

- f798cfd: Add a README to every package, so the npm page for each one documents what it
  contains and how to use it instead of rendering blank.

  Country READMEs are generated from the same metadata that drives the docs site
  plus live counts read from each registry, so they cannot drift from the code.

- Updated dependencies [f798cfd]
  - @road-signs/core@0.1.1
