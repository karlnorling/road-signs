# @road-signs/kw

Road signs for Kuwait — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/kw
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 98                                                       |
| With vector artwork | 98                                                       |
| Categories          | `information`, `prohibitory`, `warning`                  |
| Standard            | Vienna Convention, bilingual Arabic/English (GCC Manual) |
| Regulator           | GCC Manual                                               |
| Drive side          | right-hand                                               |
| Language(s)         | Arabic, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kw';

signs; // the whole registry
getSign('kw-road-sign-500'); // by slug id
getSignByCode('kw-road-sign-500'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('kw-road-sign-500')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/kw/dist/sprite.css" />
<span class="rs-kw-kw-road-sign-500" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/kw/dist/sprite.svg#rs-kw-kw-road-sign-500" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Kuwait](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kuwait)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kw)

## License

MIT © Karl Norling
