# @road-signs/pt

Road signs for Portugal — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/pt
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 228                                                              |
| With vector artwork | 228                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Código da Estrada — Vienna Convention                            |
| Regulator           | ANSR (Código da Estrada)                                         |
| Drive side          | right-hand                                                       |
| Language(s)         | Portuguese                                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pt';

signs; // the whole registry
getSign('dangerous-curve-to-right'); // by slug id
getSignByCode('dangerous-curve-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/pt/dist/sprite.css" />
<span
  class="rs-pt-dangerous-curve-to-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/pt/dist/sprite.svg#rs-pt-dangerous-curve-to-right" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Portugal](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Portugal)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pt)

## License

MIT © Karl Norling
