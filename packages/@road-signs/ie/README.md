# @road-signs/ie

Road signs for Ireland — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ie
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 299                                                 |
| With vector artwork | 299                                                 |
| Categories          | `information`, `prohibitory`, `warning`             |
| Standard            | Road Traffic (Signs) Regulations — TSRGD-influenced |
| Regulator           | RSA (TSM)                                           |
| Drive side          | left-hand                                           |
| Language(s)         | English, Irish                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ie';

signs; // the whole registry
getSign('w-001-crossroads'); // by slug id
getSignByCode('w-001-crossroads'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w-001-crossroads')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ie/dist/sprite.css" />
<span class="rs-ie-w-001-crossroads" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ie/dist/sprite.svg#rs-ie-w-001-crossroads" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Ireland](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ireland)
- [Wikimedia Commons — SVG road signs in Ireland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ireland)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ie)

## License

MIT © Karl Norling
