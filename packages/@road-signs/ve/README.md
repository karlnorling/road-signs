# @road-signs/ve

Road signs for Venezuela — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ve
```

## At a glance

|                     |                                                    |
| ------------------- | -------------------------------------------------- |
| Signs               | 192                                                |
| With vector artwork | 192                                                |
| Categories          | `information`, `prohibitory`                       |
| Standard            | Manual Venezolano de Dispositivos Uniformes (MVDU) |
| Regulator           | INTT                                               |
| Drive side          | right-hand                                         |
| Language(s)         | Spanish                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ve';

signs; // the whole registry
getSign('cp1-venezuela-road-sign'); // by slug id
getSignByCode('CP1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('cp1-venezuela-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ve/dist/sprite.css" />
<span
  class="rs-ve-cp1-venezuela-road-sign"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ve/dist/sprite.svg#rs-ve-cp1-venezuela-road-sign" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Venezuela](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Venezuela)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ve)

## License

MIT © Karl Norling
