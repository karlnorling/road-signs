# @road-signs/zm

Road signs for Zambia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/zm
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 45                                           |
| With vector artwork | 45                                           |
| Categories          | `mandatory`                                  |
| Standard            | British-derived (Roads and Road Traffic Act) |
| Regulator           | RTSA                                         |
| Drive side          | left-hand                                    |
| Language(s)         | English                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/zm';

signs; // the whole registry
getSign('r101-600-sadc-road-sign'); // by slug id
getSignByCode('R101-600'); // by official code
getSignsByCategory('mandatory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('r101-600-sadc-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/zm/dist/sprite.css" />
<span
  class="rs-zm-r101-600-sadc-road-sign"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/zm/dist/sprite.svg#rs-zm-r101-600-sadc-road-sign" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Zambia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Zambia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/zm)

## License

MIT © Karl Norling
