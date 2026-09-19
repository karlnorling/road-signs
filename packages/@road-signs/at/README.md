# @road-signs/at

Road signs for Austria — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/at
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 200                                                              |
| With vector artwork | 200                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | StVO (Straßenverkehrs-Ordnung) — Vienna Convention               |
| Regulator           | BMK (StVO)                                                       |
| Drive side          | right-hand                                                       |
| Language(s)         | German                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/at';

signs; // the whole registry
getSign('1-uneven-road'); // by slug id
getSignByCode('1-uneven-road'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-uneven-road')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/at/dist/sprite.css" />
<span class="rs-at-1-uneven-road" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/at/dist/sprite.svg#rs-at-1-uneven-road" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Austria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Austria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/at)

## License

MIT © Karl Norling
