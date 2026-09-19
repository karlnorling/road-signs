# @road-signs/by

Road signs for Belarus — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/by
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 358                                                              |
| With vector artwork | 358                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (STB 1140-2013)                                |
| Regulator           | Belarusian State Auto Inspection                                 |
| Drive side          | right-hand                                                       |
| Language(s)         | Belarusian, Russian                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/by';

signs; // the whole registry
getSign('1-1-railway-crossing-with-a-barrier'); // by slug id
getSignByCode('1-1-railway-crossing-with-a-barrier'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-1-railway-crossing-with-a-barrier')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/by/dist/sprite.css" />
<span
  class="rs-by-1-1-railway-crossing-with-a-barrier"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/by/dist/sprite.svg#rs-by-1-1-railway-crossing-with-a-barrier"
  />
</svg>
```

## Sources

- [Wikipedia — Road signs in Belarus](https://en.wikipedia.org/wiki/Road_signs_in_Belarus)
- [Wikimedia Commons — SVG road signs in Belarus](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belarus)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/by)

## License

MIT © Karl Norling
