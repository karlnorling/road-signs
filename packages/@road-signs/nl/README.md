# @road-signs/nl

Road signs for Netherlands — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/nl
```

## At a glance

|                     |                                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| Signs               | 240                                                                       |
| With vector artwork | 240                                                                       |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning`          |
| Standard            | RVV 1990 (Reglement Verkeersregels en Verkeerstekens) — Vienna Convention |
| Regulator           | CROW (RVV 1990)                                                           |
| Drive side          | right-hand                                                                |
| Language(s)         | Dutch                                                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/nl';

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
<link rel="stylesheet" href="node_modules/@road-signs/nl/dist/sprite.css" />
<span class="rs-nl-j1-uneven-road" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/nl/dist/sprite.svg#rs-nl-j1-uneven-road" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in the Netherlands](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands)

## Notes

Several series (J, B, E, G, H, L, K) are raster-only on Wikimedia; SVG coverage is ~67%.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/nl)

## License

MIT © Karl Norling
