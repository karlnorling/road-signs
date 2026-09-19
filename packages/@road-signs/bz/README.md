# @road-signs/bz

Road signs for Belize — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/bz
```

## At a glance

|                     |                                                |
| ------------------- | ---------------------------------------------- |
| Signs               | 8                                              |
| With vector artwork | 8                                              |
| Categories          | `information`                                  |
| Standard            | UK-influenced / SIECA (Manual Centroamericano) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bz';

signs; // the whole registry
getSign('e1-1-sieca-road-sign-assembly-e3-3'); // by slug id
getSignByCode('E1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('e1-1-sieca-road-sign-assembly-e3-3')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/bz/dist/sprite.css" />
<span
  class="rs-bz-e1-1-sieca-road-sign-assembly-e3-3"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/bz/dist/sprite.svg#rs-bz-e1-1-sieca-road-sign-assembly-e3-3"
  />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Belize](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belize)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bz)

## License

MIT © Karl Norling
