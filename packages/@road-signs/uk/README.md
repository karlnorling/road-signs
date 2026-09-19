# @road-signs/uk

Road signs for United Kingdom — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/uk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 468                                                              |
| With vector artwork | 468                                                              |
| Categories          | `direction`, `information`, `regulatory`, `temporary`, `warning` |
| Standard            | TSRGD (Traffic Signs Regulations and General Directions)         |
| Regulator           | DfT (TSRGD 2016)                                                 |
| Drive side          | left-hand                                                        |
| Language(s)         | English, Welsh                                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/uk';

signs; // the whole registry
getSign('stop-or-give-way-ahead'); // by slug id
getSignByCode('stop-or-give-way-ahead'); // by official code
getSignsByCategory('direction'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('stop-or-give-way-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/uk/dist/sprite.css" />
<span
  class="rs-uk-stop-or-give-way-ahead"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/uk/dist/sprite.svg#rs-uk-stop-or-give-way-ahead" />
</svg>
```

## Sources

- [Wikimedia Commons — Warning signs of the UK](https://commons.wikimedia.org/wiki/Category:Warning_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Regulatory signs of the UK](https://commons.wikimedia.org/wiki/Category:Regulatory_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Information signs of the UK](https://commons.wikimedia.org/wiki/Category:Information_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Direction signs of the UK](https://commons.wikimedia.org/wiki/Category:Direction_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Road works signs of the UK](https://commons.wikimedia.org/wiki/Category:Road_works_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Road signs in the UK](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Kingdom)

## Notes

Variable-message motorway signs (direction/temporary categories) are raster-only on Wikimedia.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/uk)

## License

MIT © Karl Norling
