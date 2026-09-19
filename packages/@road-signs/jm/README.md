# @road-signs/jm

Road signs for Jamaica — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/jm
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 121                                                              |
| With vector artwork | 121                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | British-derived (Road Traffic Act)                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/jm';

signs; // the whole registry
getSign('w1-1-bend-to-the-right'); // by slug id
getSignByCode('W1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w1-1-bend-to-the-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/jm/dist/sprite.css" />
<span
  class="rs-jm-w1-1-bend-to-the-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/jm/dist/sprite.svg#rs-jm-w1-1-bend-to-the-right" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Jamaica](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Jamaica)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/jm)

## License

MIT © Karl Norling
