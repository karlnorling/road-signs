# @road-signs/ls

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
