# @road-signs/se

Road signs for Sweden — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/se
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 267                                                              |
| With vector artwork | 267                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vägmärkesförordning (VMF) — Vienna Convention                    |
| Regulator           | Trafikverket (VMF)                                               |
| Drive side          | right-hand                                                       |
| Language(s)         | Swedish                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/se';

signs; // the whole registry
getSign('dangerous-curve-to-left'); // by slug id
getSignByCode('dangerous-curve-to-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/se/dist/sprite.css" />
<span
  class="rs-se-dangerous-curve-to-left"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/se/dist/sprite.svg#rs-se-dangerous-curve-to-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Sweden](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sweden)
- [Wikimedia Commons — Road signs in Sweden (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Sweden)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/se)

## License

MIT © Karl Norling
