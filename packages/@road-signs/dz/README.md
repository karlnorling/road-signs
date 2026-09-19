# @road-signs/dz

Road signs for Algeria — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/dz
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 86                                                               |
| With vector artwork | 86                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Code de la route — Vienna Convention / French-influenced         |
| Regulator           | Ministry of Transport                                            |
| Drive side          | right-hand                                                       |
| Language(s)         | Arabic                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/dz';

signs; // the whole registry
getSign('a10-algeria-road-sign'); // by slug id
getSignByCode('A10'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a10-algeria-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/dz/dist/sprite.css" />
<span
  class="rs-dz-a10-algeria-road-sign"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/dz/dist/sprite.svg#rs-dz-a10-algeria-road-sign" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Algeria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Algeria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/dz)

## License

MIT © Karl Norling
