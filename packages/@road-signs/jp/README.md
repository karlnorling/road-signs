# @road-signs/jp

Road signs for Japan — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/jp
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 126                                                  |
| With vector artwork | 126                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Road Traffic Law (道路交通法)                        |
| Regulator           | National Police Agency                               |
| Drive side          | left-hand                                            |
| Language(s)         | Japanese                                             |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/jp';

signs; // the whole registry
getSign('crossroads'); // by slug id
getSignByCode('crossroads'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroads')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/jp/dist/sprite.css" />
<span class="rs-jp-crossroads" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/jp/dist/sprite.svg#rs-jp-crossroads" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Japan](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Japan)

## Notes

Codes are 3-digit numeric: 1xx (regulatory), 2xx (warning), 3xx (instruction), 4xx (guide).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/jp)

## License

MIT © Karl Norling
