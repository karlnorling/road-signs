# @road-signs/cz

Road signs for Czech Republic — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/cz
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 270                                                              |
| With vector artwork | 270                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Zákon č. 361/2000 Sb. — Vienna Convention                        |
| Regulator           | MD ČR                                                            |
| Drive side          | right-hand                                                       |
| Language(s)         | Czech                                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cz';

signs; // the whole registry
getSign('i-1a-dangerous-curve-to-the-right'); // by slug id
getSignByCode('I-1A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('i-1a-dangerous-curve-to-the-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/cz/dist/sprite.css" />
<span
  class="rs-cz-i-1a-dangerous-curve-to-the-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/cz/dist/sprite.svg#rs-cz-i-1a-dangerous-curve-to-the-right" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in the Czech Republic](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Czech_Republic)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cz)

## License

MIT © Karl Norling
