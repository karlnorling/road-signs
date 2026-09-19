# @road-signs/is

Road signs for Iceland — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/is
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 331                                                  |
| With vector artwork | 331                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Umferðarlög — Vienna Convention                      |
| Regulator           | Vegagerðin                                           |
| Drive side          | right-hand                                           |
| Language(s)         | Icelandic                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/is';

signs; // the whole registry
getSign('dangerous-curve-to-right'); // by slug id
getSignByCode('dangerous-curve-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/is/dist/sprite.css" />
<span
  class="rs-is-dangerous-curve-to-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/is/dist/sprite.svg#rs-is-dangerous-curve-to-right" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Iceland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iceland)
- [Wikimedia Commons — Road signs in Iceland (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Iceland)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/is)

## License

MIT © Karl Norling
