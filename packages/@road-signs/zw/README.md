# @road-signs/zw

Road signs for Zimbabwe — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/zw
```

## At a glance

|                     |                                                       |
| ------------------- | ----------------------------------------------------- |
| Signs               | 322                                                   |
| With vector artwork | 322                                                   |
| Categories          | `information`, `prohibitory`, `warning`               |
| Standard            | British-derived (Road Traffic Act, left-hand traffic) |
| Regulator           | Traffic Safety Council                                |
| Drive side          | left-hand                                             |
| Language(s)         | English                                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/zw';

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
<link rel="stylesheet" href="node_modules/@road-signs/zw/dist/sprite.css" />
<span class="rs-zw-crossroad-ahead" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/zw/dist/sprite.svg#rs-zw-crossroad-ahead" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Zimbabwe](https://en.wikipedia.org/wiki/Road_signs_in_Zimbabwe)
- [Wikimedia Commons — SVG road signs in Zimbabwe](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Zimbabwe)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/zw)

## License

MIT © Karl Norling
