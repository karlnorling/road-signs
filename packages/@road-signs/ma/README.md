# @road-signs/ma

Road signs for Morocco — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ma
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 281                                                              |
| With vector artwork | 281                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Code de la route (Dahir 1-10-07) — Vienna Convention             |
| Regulator           | Ministry of Equipment                                            |
| Drive side          | right-hand                                                       |
| Language(s)         | Arabic, French                                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ma';

signs; // the whole registry
getSign('101-1-curve-to-right'); // by slug id
getSignByCode('101-1-curve-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('101-1-curve-to-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ma/dist/sprite.css" />
<span class="rs-ma-101-1-curve-to-right" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ma/dist/sprite.svg#rs-ma-101-1-curve-to-right" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Morocco](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Morocco)
- [Wikimedia Commons — Road signs in Morocco (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Morocco)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ma)

## License

MIT © Karl Norling
