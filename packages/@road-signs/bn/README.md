# @road-signs/bn

Road signs for Brunei — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/bn
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 136                                                              |
| With vector artwork | 136                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Road Traffic Act — Vienna Convention variant                     |
| Regulator           | Land Transport Department                                        |
| Drive side          | left-hand                                                        |
| Language(s)         | Malay, English                                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bn';

signs; // the whole registry
getSign('brunei-road-sign-awas-type-1'); // by slug id
getSignByCode('brunei-road-sign-awas-type-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('brunei-road-sign-awas-type-1')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/bn/dist/sprite.css" />
<span
  class="rs-bn-brunei-road-sign-awas-type-1"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/bn/dist/sprite.svg#rs-bn-brunei-road-sign-awas-type-1" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Brunei](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brunei)

## Notes

No Wikipedia road signs article exists. Signs are sourced directly from Wikimedia Commons subcategories (warning, information, prohibitory, mandatory, priority, regulatory).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bn)

## License

MIT © Karl Norling
