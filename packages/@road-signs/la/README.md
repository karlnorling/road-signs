# @road-signs/la

Road signs for Laos — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/la
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 33                                                               |
| With vector artwork | 33                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (Lao PDR Road Traffic Law)                     |
| Regulator           | MPWT                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Lao                                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/la';

signs; // the whole registry
getSign('v1-curve-to-left'); // by slug id
getSignByCode('V1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('v1-curve-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/la/dist/sprite.css" />
<span class="rs-la-v1-curve-to-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/la/dist/sprite.svg#rs-la-v1-curve-to-left" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Laos](https://en.wikipedia.org/wiki/Road_signs_in_Laos)
- [Wikimedia Commons — SVG road signs in Laos](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Laos)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/la)

## License

MIT © Karl Norling
