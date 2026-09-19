# @road-signs/tw

Road signs for Taiwan — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/tw
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 215                                                              |
| With vector artwork | 215                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Road Traffic Safety Rules (道路交通標誌標線號誌設置規則)         |
| Regulator           | MOTC Taiwan                                                      |
| Drive side          | right-hand                                                       |
| Language(s)         | Mandarin                                                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/tw';

signs; // the whole registry
getSign('a1-taiwan-roc-road-sign'); // by slug id
getSignByCode('A1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a1-taiwan-roc-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/tw/dist/sprite.css" />
<span
  class="rs-tw-a1-taiwan-roc-road-sign"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/tw/dist/sprite.svg#rs-tw-a1-taiwan-roc-road-sign" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Taiwan](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Taiwan)
- [Wikimedia Commons — SVG road signs in Taiwan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Taiwan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/tw)

## License

MIT © Karl Norling
