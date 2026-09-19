# @road-signs/th

Road signs for Thailand — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/th
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 444                                                              |
| With vector artwork | 444                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Land Traffic Act (พระราชบัญญัติจราจรทางบก)                       |
| Regulator           | DOH                                                              |
| Drive side          | left-hand                                                        |
| Language(s)         | Thai                                                             |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/th';

signs; // the whole registry
getSign('curve-to-left'); // by slug id
getSignByCode('curve-to-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/th/dist/sprite.css" />
<span class="rs-th-curve-to-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/th/dist/sprite.svg#rs-th-curve-to-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Thailand](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Thailand)
- [Wikimedia Commons — SVG road signs in Thailand](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Thailand)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/th)

## License

MIT © Karl Norling
