# @road-signs/cy

Road signs for Cyprus — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/cy
```

## At a glance

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| Signs               | 153                                             |
| With vector artwork | 153                                             |
| Categories          | `information`, `prohibitory`, `warning`         |
| Standard            | Road Traffic Law (Cap. 332) — Vienna Convention |
| Regulator           | Road Transport Department                       |
| Drive side          | left-hand                                       |
| Language(s)         | Greek, Turkish, English                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cy';

signs; // the whole registry
getSign('traffic-signals-ahead'); // by slug id
getSignByCode('traffic-signals-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('traffic-signals-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/cy/dist/sprite.css" />
<span
  class="rs-cy-traffic-signals-ahead"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/cy/dist/sprite.svg#rs-cy-traffic-signals-ahead" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Cyprus](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cyprus)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cy)

## License

MIT © Karl Norling
