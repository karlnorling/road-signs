# @road-signs/lv

Road signs for Latvia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/lv
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 224                                                              |
| With vector artwork | 224                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Ceļu satiksmes noteikumi — Vienna Convention                     |
| Regulator           | CSDD                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Latvian                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lv';

signs; // the whole registry
getSign('crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right'); // by slug id
getSignByCode('crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/lv/dist/sprite.css" />
<span
  class="rs-lv-crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/lv/dist/sprite.svg#rs-lv-crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right"
  />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Latvia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Latvia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lv)

## License

MIT © Karl Norling
