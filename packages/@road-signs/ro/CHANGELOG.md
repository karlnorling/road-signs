# @road-signs/ro

## 0.2.0

### Minor Changes

- c3e8add: Substitute a PNG raster for artwork too large to inline.

  An SVG over 256 KB is no longer embedded in the registry. `sign.svg` is
  `undefined` for those signs and `sign.png` carries a 512px raster as a
  `data:image/png;base64,...` URI instead.

  This affects 157 signs. They were not really vectors: the largest, an
  Inkscape export of a bilingual Friulian _passo carrabile_ sign, is 29 MB of
  261 embedded base64 bitmaps. Because it was emitted into both the CJS and the
  ESM build, `@road-signs/it` was 116.7 MB unpacked; its registry source is now
  2.8 MB, with all 326 signs intact. Across every package the substitution
  costs 1.9 MB of base64 in place of 233 MB of SVG.

  If you read `sign.svg` directly, fall back to `sign.png` when it is absent.
  Both are self-contained, so no asset files are needed either way.

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
