# @road-signs/fj

Road signs for Fiji — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/fj
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 176                                                              |
| With vector artwork | 0                                                                |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | British-derived (Land Transport Act / MOTSAM)                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/fj';

signs; // the whole registry
getSign('rg-33-railway-level-crossing-flashing-light-signal'); // by slug id
getSignByCode('RG-33'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('rg-33-railway-level-crossing-flashing-light-signal')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/fj/dist/sprite.css" />
<span
  class="rs-fj-rg-33-railway-level-crossing-flashing-light-signal"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/fj/dist/sprite.svg#rs-fj-rg-33-railway-level-crossing-flashing-light-signal"
  />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Fiji](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Fiji)
- [Fiji Roads Authority — MOTSAM documents](https://www.fijiroads.org/index.php/motsam-documents/)
- [Land Transport Authority Fiji](https://www.lta.gov.fj/)

## Notes

No SVG assets currently on Wikimedia Commons. Official sign specifications are published in the Fiji Roads Authority MOTSAM (Manual of Traffic Signs and Markings / Fiji Supplement to Austroads), available as PDF sections on the Fiji Roads Authority website.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/fj)

## License

MIT © Karl Norling
