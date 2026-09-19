# @road-signs/co

Road signs for Colombia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/co
```

## At a glance

|                     |                                                                      |
| ------------------- | -------------------------------------------------------------------- |
| Signs               | 251                                                                  |
| With vector artwork | 251                                                                  |
| Categories          | `information`, `prohibitory`, `warning`                              |
| Standard            | Manual de Señalización Vial (MSV/INVIAS) — Vienna Convention variant |
| Regulator           | INVIAS (MSV)                                                         |
| Drive side          | right-hand                                                           |
| Language(s)         | Spanish                                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/co';

signs; // the whole registry
getSign('sp-01-sharp-turn-to-left'); // by slug id
getSignByCode('SP-01'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('sp-01-sharp-turn-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/co/dist/sprite.css" />
<span
  class="rs-co-sp-01-sharp-turn-to-left"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/co/dist/sprite.svg#rs-co-sp-01-sharp-turn-to-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Colombia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Colombia)
- [Wikimedia Commons — Road signs in Colombia (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Colombia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/co)

## License

MIT © Karl Norling
