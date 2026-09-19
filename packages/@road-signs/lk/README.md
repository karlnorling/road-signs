# @road-signs/lk

Road signs for Sri Lanka — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/lk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 184                                                              |
| With vector artwork | 184                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | British-derived (Motor Traffic Act)                              |
| Regulator           | RDA                                                              |
| Drive side          | left-hand                                                        |
| Language(s)         | Sinhala, Tamil, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lk';

signs; // the whole registry
getSign('curve-to-the-left'); // by slug id
getSignByCode('curve-to-the-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/lk/dist/sprite.css" />
<span class="rs-lk-curve-to-the-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/lk/dist/sprite.svg#rs-lk-curve-to-the-left" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Sri Lanka](https://en.wikipedia.org/wiki/Road_signs_in_Sri_Lanka)
- [Wikimedia Commons — SVG road signs in Sri Lanka](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sri_Lanka)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lk)

## License

MIT © Karl Norling
