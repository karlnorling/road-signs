# @road-signs/pk

Road signs for Pakistan — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/pk
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 166                                          |
| With vector artwork | 166                                          |
| Categories          | `information`, `prohibitory`, `warning`      |
| Standard            | British-derived (National Highway Authority) |
| Regulator           | NHA                                          |
| Drive side          | left-hand                                    |
| Language(s)         | Urdu, English                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pk';

signs; // the whole registry
getSign('dangerous-curve-to-the-right'); // by slug id
getSignByCode('dangerous-curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-the-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/pk/dist/sprite.css" />
<span
  class="rs-pk-dangerous-curve-to-the-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/pk/dist/sprite.svg#rs-pk-dangerous-curve-to-the-right" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Pakistan](https://en.wikipedia.org/wiki/Road_signs_in_Pakistan)
- [Wikimedia Commons — SVG road signs in Pakistan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Pakistan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pk)

## License

MIT © Karl Norling
