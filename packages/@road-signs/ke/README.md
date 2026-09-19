# @road-signs/ke

Road signs for Kenya — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ke
```

## At a glance

|                     |                                     |
| ------------------- | ----------------------------------- |
| Signs               | 16                                  |
| With vector artwork | 16                                  |
| Categories          | `information`                       |
| Standard            | British-derived (NTSA Highway Code) |
| Regulator           | NTSA                                |
| Drive side          | left-hand                           |
| Language(s)         | English, Swahili                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ke';

signs; // the whole registry
getSign('rw1-kenya-road-sign'); // by slug id
getSignByCode('RW1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('rw1-kenya-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ke/dist/sprite.css" />
<span class="rs-ke-rw1-kenya-road-sign" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ke/dist/sprite.svg#rs-ke-rw1-kenya-road-sign" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Kenya](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kenya)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ke)

## License

MIT © Karl Norling
