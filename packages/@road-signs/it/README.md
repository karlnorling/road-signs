# @road-signs/it

Road signs for Italy — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/it
```

## At a glance

|                     |                                         |
| ------------------- | --------------------------------------- |
| Signs               | 326                                     |
| With vector artwork | 326                                     |
| Categories          | `information`, `prohibitory`, `warning` |
| Standard            | Codice della strada — Vienna Convention |
| Regulator           | MIT (Codice della Strada)               |
| Drive side          | right-hand                              |
| Language(s)         | Italian                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/it';

signs; // the whole registry
getSign('uneven-road-formerly-used-that-meant-humps-or-dip'); // by slug id
getSignByCode('uneven-road-formerly-used-that-meant-humps-or-dip'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('uneven-road-formerly-used-that-meant-humps-or-dip')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/it/dist/sprite.css" />
<span
  class="rs-it-uneven-road-formerly-used-that-meant-humps-or-dip"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/it/dist/sprite.svg#rs-it-uneven-road-formerly-used-that-meant-humps-or-dip"
  />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Italy](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Italy)

## Notes

Panel (A/B/P/Q series) and traffic light signs exist only as raster images on Wikipedia.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/it)

## License

MIT © Karl Norling
