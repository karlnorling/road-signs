# @road-signs/es

Road signs for Spain — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/es
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 419                                                              |
| With vector artwork | 419                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Reglamento General de Circulación — Vienna Convention            |
| Regulator           | DGT                                                              |
| Drive side          | right-hand                                                       |
| Language(s)         | Spanish                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/es';

signs; // the whole registry
getSign('p-1-intersection-with-priority'); // by slug id
getSignByCode('P-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('p-1-intersection-with-priority')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/es/dist/sprite.css" />
<span
  class="rs-es-p-1-intersection-with-priority"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/es/dist/sprite.svg#rs-es-p-1-intersection-with-priority" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Spain](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Spain)

## Notes

S-series (additional panel / service) signs are raster-only on Wikimedia; SVG coverage is ~89%.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/es)

## License

MIT © Karl Norling
