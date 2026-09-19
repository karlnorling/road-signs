# @road-signs/ar

Road signs for Argentina — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ar
```

## At a glance

|                     |                                                                              |
| ------------------- | ---------------------------------------------------------------------------- |
| Signs               | 140                                                                          |
| With vector artwork | 140                                                                          |
| Categories          | `prohibitory`, `warning`                                                     |
| Standard            | Decreto 779/95 — Reglamento Nacional de Tránsito (Vienna Convention variant) |
| Regulator           | CNRT                                                                         |
| Drive side          | right-hand                                                                   |
| Language(s)         | Spanish                                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ar';

signs; // the whole registry
getSign('railway-crossing-ahead'); // by slug id
getSignByCode('railway-crossing-ahead'); // by official code
getSignsByCategory('prohibitory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('railway-crossing-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ar/dist/sprite.css" />
<span
  class="rs-ar-railway-crossing-ahead"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ar/dist/sprite.svg#rs-ar-railway-crossing-ahead" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Argentina](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Argentina)
- [Wikimedia Commons — Road signs in Argentina (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Argentina)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ar)

## License

MIT © Karl Norling
