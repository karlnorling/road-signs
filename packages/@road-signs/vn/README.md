# @road-signs/vn

Road signs for Vietnam — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/vn
```

## At a glance

|                     |                                                         |
| ------------------- | ------------------------------------------------------- |
| Signs               | 734                                                     |
| With vector artwork | 734                                                     |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`    |
| Standard            | Vienna Convention adjacent (Ministry of Transport 2019) |
| Regulator           | Ministry of Transport                                   |
| Drive side          | right-hand                                              |
| Language(s)         | Vietnamese                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/vn';

signs; // the whole registry
getSign('w-201a-bend-to-left'); // by slug id
getSignByCode('W.201A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w-201a-bend-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/vn/dist/sprite.css" />
<span class="rs-vn-w-201a-bend-to-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/vn/dist/sprite.svg#rs-vn-w-201a-bend-to-left" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Vietnam](https://en.wikipedia.org/wiki/Road_signs_in_Vietnam)
- [Wikimedia Commons — SVG road signs in Vietnam](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Vietnam)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/vn)

## License

MIT © Karl Norling
