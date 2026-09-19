# @road-signs/uy

Road signs for Uruguay — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/uy
```

## At a glance

|                     |                                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| Signs               | 62                                                                            |
| With vector artwork | 62                                                                            |
| Categories          | `information`, `warning`                                                      |
| Standard            | Decreto 374/004 — Reglamento Nacional de Tránsito (Vienna Convention variant) |
| Regulator           | Dirección Nacional de Tránsito                                                |
| Drive side          | right-hand                                                                    |
| Language(s)         | Spanish                                                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/uy';

signs; // the whole registry
getSign('uruguay-road-sign-equestrians'); // by slug id
getSignByCode('uruguay-road-sign-equestrians'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('uruguay-road-sign-equestrians')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/uy/dist/sprite.css" />
<span
  class="rs-uy-uruguay-road-sign-equestrians"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/uy/dist/sprite.svg#rs-uy-uruguay-road-sign-equestrians" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Uruguay](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uruguay)
- [Wikimedia Commons — Road signs in Uruguay (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Uruguay)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/uy)

## License

MIT © Karl Norling
