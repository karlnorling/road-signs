# @road-signs/cu

Road signs for Cuba — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/cu
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 43                                                               |
| With vector artwork | 43                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention variant                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cu';

signs; // the whole registry
getSign('v3-intersection-with-priority'); // by slug id
getSignByCode('V3'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('v3-intersection-with-priority')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/cu/dist/sprite.css" />
<span
  class="rs-cu-v3-intersection-with-priority"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/cu/dist/sprite.svg#rs-cu-v3-intersection-with-priority" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Cuba](https://en.wikipedia.org/wiki/Road_signs_in_Cuba)
- [Wikimedia Commons — SVG road signs in Cuba](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cuba)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cu)

## License

MIT © Karl Norling
