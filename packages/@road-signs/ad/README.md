# @road-signs/ad

Road signs for Andorra — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ad
```

## At a glance

|                     |                                            |
| ------------------- | ------------------------------------------ |
| Signs               | 38                                         |
| With vector artwork | 38                                         |
| Categories          | `information`, `priority`                  |
| Standard            | Vienna Convention (Code de la circulation) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ad';

signs; // the whole registry
getSign('b2-andorra-traffic-signal-b2'); // by slug id
getSignByCode('B2'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('b2-andorra-traffic-signal-b2')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ad/dist/sprite.css" />
<span
  class="rs-ad-b2-andorra-traffic-signal-b2"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ad/dist/sprite.svg#rs-ad-b2-andorra-traffic-signal-b2" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Andorra](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Andorra)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ad)

## License

MIT © Karl Norling
