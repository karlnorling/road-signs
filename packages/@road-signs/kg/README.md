# @road-signs/kg

Road signs for Kyrgyzstan — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/kg
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 157                                                              |
| With vector artwork | 157                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kg';

signs; // the whole registry
getSign('railroad-crossing-ahead'); // by slug id
getSignByCode('railroad-crossing-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('railroad-crossing-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/kg/dist/sprite.css" />
<span
  class="rs-kg-railroad-crossing-ahead"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/kg/dist/sprite.svg#rs-kg-railroad-crossing-ahead" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Kyrgyzstan](https://en.wikipedia.org/wiki/Road_signs_in_Kyrgyzstan)
- [Wikimedia Commons — SVG road signs in Kyrgyzstan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kyrgyzstan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kg)

## License

MIT © Karl Norling
