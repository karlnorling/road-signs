---
'@road-signs/al': minor
'@road-signs/ao': minor
'@road-signs/au': minor
'@road-signs/ba': minor
'@road-signs/bd': minor
'@road-signs/br': minor
'@road-signs/by': minor
'@road-signs/cn': minor
'@road-signs/de': minor
'@road-signs/es': minor
'@road-signs/hr': minor
'@road-signs/hu': minor
'@road-signs/id': minor
'@road-signs/ie': minor
'@road-signs/it': minor
'@road-signs/jm': minor
'@road-signs/jp': minor
'@road-signs/kr': minor
'@road-signs/ma': minor
'@road-signs/me': minor
'@road-signs/mt': minor
'@road-signs/my': minor
'@road-signs/nl': minor
'@road-signs/no': minor
'@road-signs/nz': minor
'@road-signs/ph': minor
'@road-signs/pt': minor
'@road-signs/ro': minor
'@road-signs/sa': minor
'@road-signs/sg': minor
'@road-signs/si': minor
'@road-signs/th': minor
'@road-signs/us': minor
'@road-signs/vn': minor
---

Substitute a PNG raster for artwork too large to inline.

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
