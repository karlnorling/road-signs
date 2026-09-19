# @road-signs/mm

Road signs for Myanmar — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/mm
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 233                                                              |
| With vector artwork | 233                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention / UK-influenced                                |
| Regulator           | Ministry of Construction                                         |
| Drive side          | right-hand                                                       |
| Language(s)         | Burmese                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mm';

signs; // the whole registry
getSign('1-curve-left'); // by slug id
getSignByCode('1-curve-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-curve-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/mm/dist/sprite.css" />
<span class="rs-mm-1-curve-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/mm/dist/sprite.svg#rs-mm-1-curve-left" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Myanmar](https://en.wikipedia.org/wiki/Road_signs_in_Myanmar)
- [Wikimedia Commons — SVG road signs in Myanmar](https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Myanmar)

## Notes

Limited SVG coverage on Wikimedia Commons for Myanmar.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mm)

## License

MIT © Karl Norling
