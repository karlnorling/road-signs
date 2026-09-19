# @road-signs/sr

Road signs for Suriname — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/sr
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 282                                                              |
| With vector artwork | 282                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention / Dutch-influenced (Verkeerstekenbesluit)      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sr';

signs; // the whole registry
getSign('j1-uneven-road'); // by slug id
getSignByCode('J1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('j1-uneven-road')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/sr/dist/sprite.css" />
<span class="rs-sr-j1-uneven-road" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/sr/dist/sprite.svg#rs-sr-j1-uneven-road" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Suriname](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Suriname)
- [Wikimedia Commons — SVG road signs in the Netherlands](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands)
- [Wikipedia — Road signs in the Netherlands](https://en.wikipedia.org/wiki/Road_signs_in_the_Netherlands)

## Notes

No Suriname-specific SVG sign diagrams exist on Wikimedia Commons. Suriname uses a Dutch-derived sign system inherited from the colonial period, virtually identical to Netherlands road signs (same Vienna Convention base, same series lettering A–L). This package mirrors the Netherlands sign set, following the same pattern as Monaco→France and San Marino→Italy.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sr)

## License

MIT © Karl Norling
