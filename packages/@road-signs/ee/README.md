# @road-signs/ee

Road signs for Estonia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ee
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 151                                                              |
| With vector artwork | 151                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Liiklusseadus — Vienna Convention                                |
| Regulator           | Transpordiamet                                                   |
| Drive side          | right-hand                                                       |
| Language(s)         | Estonian                                                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ee';

signs; // the whole registry
getSign('level-crossing-with-gates'); // by slug id
getSignByCode('level-crossing-with-gates'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('level-crossing-with-gates')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ee/dist/sprite.css" />
<span
  class="rs-ee-level-crossing-with-gates"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ee/dist/sprite.svg#rs-ee-level-crossing-with-gates" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Estonia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Estonia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ee)

## License

MIT © Karl Norling
