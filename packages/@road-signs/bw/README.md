# @road-signs/bw

Road signs for Botswana — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/bw
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 354                                                  |
| With vector artwork | 354                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | British-derived (Road Traffic Act)                   |
| Regulator           | Department of Road Transport                         |
| Drive side          | left-hand                                            |
| Language(s)         | English, Setswana                                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bw';

signs; // the whole registry
getSign('crossroad-ahead'); // by slug id
getSignByCode('crossroad-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/bw/dist/sprite.css" />
<span class="rs-bw-crossroad-ahead" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/bw/dist/sprite.svg#rs-bw-crossroad-ahead" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Botswana](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Botswana)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bw)

## License

MIT © Karl Norling
