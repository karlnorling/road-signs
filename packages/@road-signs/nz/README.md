# @road-signs/nz

Road signs for New Zealand — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/nz
```

## At a glance

|                     |                                         |
| ------------------- | --------------------------------------- |
| Signs               | 417                                     |
| With vector artwork | 417                                     |
| Categories          | `information`, `prohibitory`, `warning` |
| Standard            | Traffic Control Devices Rule (NZTA)     |
| Regulator           | NZTA (TCD Rule)                         |
| Drive side          | left-hand                               |
| Language(s)         | English, Māori                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/nz';

signs; // the whole registry
getSign('stop-ahead'); // by slug id
getSignByCode('stop-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('stop-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/nz/dist/sprite.css" />
<span class="rs-nz-stop-ahead" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/nz/dist/sprite.svg#rs-nz-stop-ahead" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in New Zealand](https://commons.wikimedia.org/wiki/Category:Road_signs_in_New_Zealand)
- [Wikimedia Commons — SVG road signs in New Zealand](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_New_Zealand)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/nz)

## License

MIT © Karl Norling
