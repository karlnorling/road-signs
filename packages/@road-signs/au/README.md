# @road-signs/au

Road signs for Australia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/au
```

## At a glance

|                     |                                                    |
| ------------------- | -------------------------------------------------- |
| Signs               | 446                                                |
| With vector artwork | 446                                                |
| Categories          | `information`, `prohibitory`, `warning`            |
| Standard            | AS1742 (Manual of Uniform Traffic Control Devices) |
| Regulator           | Austroads (AS1742)                                 |
| Drive side          | left-hand                                          |
| Language(s)         | English                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/au';

signs; // the whole registry
getSign('w1-1-90-sharp-turn-to-left'); // by slug id
getSignByCode('W1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w1-1-90-sharp-turn-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/au/dist/sprite.css" />
<span
  class="rs-au-w1-1-90-sharp-turn-to-left"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/au/dist/sprite.svg#rs-au-w1-1-90-sharp-turn-to-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Australia](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Australia)
- [Wikimedia Commons — SVG road signs in Australia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Australia)

## Notes

Sign codes and designs vary by state/territory; national AS1742 standards are used where available.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/au)

## License

MIT © Karl Norling
