# @road-signs/tr

Road signs for Turkey — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/tr
```

## At a glance

|                     |                                                            |
| ------------------- | ---------------------------------------------------------- |
| Signs               | 155                                                        |
| With vector artwork | 155                                                        |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`       |
| Standard            | Karayolları Trafik Yönetmeliği — Vienna Convention variant |
| Regulator           | KGM                                                        |
| Drive side          | right-hand                                                 |
| Language(s)         | Turkish                                                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/tr';

signs; // the whole registry
getSign('curve-to-the-right'); // by slug id
getSignByCode('curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/tr/dist/sprite.css" />
<span class="rs-tr-curve-to-the-right" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/tr/dist/sprite.svg#rs-tr-curve-to-the-right" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Turkey](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Turkey)
- [Wikimedia Commons — Road signs in Turkey (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Turkey)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/tr)

## License

MIT © Karl Norling
