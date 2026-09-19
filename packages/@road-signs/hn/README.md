# @road-signs/hn

Road signs for Honduras — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/hn
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 446                                                      |
| With vector artwork | 446                                                      |
| Categories          | `information`, `prohibitory`, `warning`                  |
| Standard            | Manual Centroamericano de Dispositivos Uniformes (SIECA) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/hn';

signs; // the whole registry
getSign('p-1-1-sharp-curve-to-the-right-left-if-reversed'); // by slug id
getSignByCode('P-1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('p-1-1-sharp-curve-to-the-right-left-if-reversed')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/hn/dist/sprite.css" />
<span
  class="rs-hn-p-1-1-sharp-curve-to-the-right-left-if-reversed"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/hn/dist/sprite.svg#rs-hn-p-1-1-sharp-curve-to-the-right-left-if-reversed"
  />
</svg>
```

## Sources

- [Wikipedia — Road signs in Central America](https://en.wikipedia.org/wiki/Road_signs_in_Central_America)
- [Wikimedia Commons — SVG road signs in Honduras](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Honduras)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/hn)

## License

MIT © Karl Norling
