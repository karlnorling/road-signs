# @road-signs/kr

Road signs for South Korea — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/kr
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 146                                                  |
| With vector artwork | 146                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Road Traffic Act (도로교통법)                        |
| Regulator           | KNPA                                                 |
| Drive side          | right-hand                                           |
| Language(s)         | Korean                                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kr';

signs; // the whole registry
getSign('crossroad'); // by slug id
getSignByCode('crossroad'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/kr/dist/sprite.css" />
<span class="rs-kr-crossroad" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/kr/dist/sprite.svg#rs-kr-crossroad" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in South Korea](https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Korea)
- [Wikimedia Commons — SVG road signs in South Korea](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Korea)

## Notes

Codes are numeric: 1xx (regulatory/prohibitory), 2xx (warning), 3xx (instruction), 4xx (guide).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kr)

## License

MIT © Karl Norling
