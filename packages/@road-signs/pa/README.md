# @road-signs/pa

Road signs for Panama — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/pa
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 114                                                      |
| With vector artwork | 114                                                      |
| Categories          | `information`                                            |
| Standard            | Manual Centroamericano de Dispositivos Uniformes (SIECA) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pa';

signs; // the whole registry
getSign('p-1a-panama-p-1a'); // by slug id
getSignByCode('P-1A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('p-1a-panama-p-1a')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/pa/dist/sprite.css" />
<span class="rs-pa-p-1a-panama-p-1a" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/pa/dist/sprite.svg#rs-pa-p-1a-panama-p-1a" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Panama](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Panama)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pa)

## License

MIT © Karl Norling
