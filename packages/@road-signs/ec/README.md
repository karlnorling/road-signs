# @road-signs/ec

Road signs for Ecuador — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ec
```

## At a glance

|                     |                                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| Signs               | 221                                                                       |
| With vector artwork | 221                                                                       |
| Categories          | `information`, `priority`, `prohibitory`, `warning`                       |
| Standard            | INEN (Instituto Ecuatoriano de Normalización) — Vienna Convention variant |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ec';

signs; // the whole registry
getSign('p1-1i-curve-to-the-left-at-90-degrees-and-less'); // by slug id
getSignByCode('P1-1I'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('p1-1i-curve-to-the-left-at-90-degrees-and-less')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ec/dist/sprite.css" />
<span
  class="rs-ec-p1-1i-curve-to-the-left-at-90-degrees-and-less"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/ec/dist/sprite.svg#rs-ec-p1-1i-curve-to-the-left-at-90-degrees-and-less"
  />
</svg>
```

## Sources

- [Wikipedia — Road signs in Ecuador](https://en.wikipedia.org/wiki/Road_signs_in_Ecuador)
- [Wikimedia Commons — Road signs in Ecuador](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ecuador)
- [Wikimedia Commons — Road signs in Ecuador (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ecuador)

## Notes

Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ec)

## License

MIT © Karl Norling
