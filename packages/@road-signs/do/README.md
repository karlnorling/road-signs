# @road-signs/do

Road signs for Dominican Republic — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/do
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 51                                           |
| With vector artwork | 51                                           |
| Categories          | `information`                                |
| Standard            | MUTCD-influenced / Vienna Convention variant |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/do';

signs; // the whole registry
getSign('o-11-dominican-republic-road-sign'); // by slug id
getSignByCode('O-11'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('o-11-dominican-republic-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/do/dist/sprite.css" />
<span
  class="rs-do-o-11-dominican-republic-road-sign"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/do/dist/sprite.svg#rs-do-o-11-dominican-republic-road-sign" />
</svg>
```

## Sources

- [Wikipedia — Road signs in the Dominican Republic](https://en.wikipedia.org/wiki/Road_signs_in_the_Dominican_Republic)
- [Wikimedia Commons — SVG road signs in the Dominican Republic](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Dominican_Republic)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/do)

## License

MIT © Karl Norling
