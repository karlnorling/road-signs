# @road-signs/mx

Road signs for Mexico — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/mx
```

## At a glance

|                     |                                                                              |
| ------------------- | ---------------------------------------------------------------------------- |
| Signs               | 316                                                                          |
| With vector artwork | 316                                                                          |
| Categories          | `information`, `prohibitory`, `warning`                                      |
| Standard            | SCT (Secretaría de Comunicaciones y Transportes) — Vienna Convention variant |
| Regulator           | SCT                                                                          |
| Drive side          | right-hand                                                                   |
| Language(s)         | Spanish                                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mx';

signs; // the whole registry
getSign('sp-6a-curve-left'); // by slug id
getSignByCode('SP-6A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('sp-6a-curve-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/mx/dist/sprite.css" />
<span class="rs-mx-sp-6a-curve-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/mx/dist/sprite.svg#rs-mx-sp-6a-curve-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Mexico](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mexico)
- [Wikimedia Commons — Road signs in Mexico (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Mexico)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mx)

## License

MIT © Karl Norling
