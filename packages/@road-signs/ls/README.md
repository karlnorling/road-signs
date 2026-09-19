# @road-signs/ls

Road signs for Lesotho — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ls
```

## At a glance

|                     |                                           |
| ------------------- | ----------------------------------------- |
| Signs               | 47                                        |
| With vector artwork | 47                                        |
| Categories          | `information`, `mandatory`                |
| Standard            | SADC regional standard (Road Traffic Act) |
| Regulator           | Department of Traffic                     |
| Drive side          | left-hand                                 |
| Language(s)         | English, Sesotho                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ls';

signs; // the whole registry
getSign('r101-600-sadc-road-sign'); // by slug id
getSignByCode('R101-600'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('r101-600-sadc-road-sign')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ls/dist/sprite.css" />
<span
  class="rs-ls-r101-600-sadc-road-sign"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ls/dist/sprite.svg#rs-ls-r101-600-sadc-road-sign" />
</svg>
```

## Sources

- [Wikipedia — Road signs in the Southern African Development Community](https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community)
- [Wikimedia Commons — SVG road signs in the Southern African Development Community](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community)

## Notes

Lesotho uses the SADC regional sign standard. No Lesotho-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ls)

## License

MIT © Karl Norling
