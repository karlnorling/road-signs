# @road-signs/dk

Road signs for Denmark — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/dk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 290                                                              |
| With vector artwork | 290                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Færdselsloven — Vienna Convention                                |
| Regulator           | Vejdirektoratet                                                  |
| Drive side          | right-hand                                                       |
| Language(s)         | Danish                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/dk';

signs; // the whole registry
getSign('a11-dangerous-junction-with-a-non-priority-road-variants-and'); // by slug id
getSignByCode('A11'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a11-dangerous-junction-with-a-non-priority-road-variants-and')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/dk/dist/sprite.css" />
<span
  class="rs-dk-a11-dangerous-junction-with-a-non-priority-road-variants-and"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/dk/dist/sprite.svg#rs-dk-a11-dangerous-junction-with-a-non-priority-road-variants-and"
  />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Denmark](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Denmark)
- [Wikimedia Commons — Road signs in Denmark (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Denmark)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/dk)

## License

MIT © Karl Norling
