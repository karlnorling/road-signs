# @road-signs/bd

Road signs for Bangladesh — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/bd
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 316                                                              |
| With vector artwork | 316                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (UK-influenced)                                |
| Regulator           | BRTA                                                             |
| Drive side          | left-hand                                                        |
| Language(s)         | Bengali, English                                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bd';

signs; // the whole registry
getSign('crossroad-with-a-minor-road-ahead'); // by slug id
getSignByCode('crossroad-with-a-minor-road-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-with-a-minor-road-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/bd/dist/sprite.css" />
<span
  class="rs-bd-crossroad-with-a-minor-road-ahead"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/bd/dist/sprite.svg#rs-bd-crossroad-with-a-minor-road-ahead" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Bangladesh](https://en.wikipedia.org/wiki/Road_signs_in_Bangladesh)
- [Wikimedia Commons — SVG road signs in Bangladesh](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bangladesh)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bd)

## License

MIT © Karl Norling
