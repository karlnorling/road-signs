# @road-signs/za

Road signs for South Africa — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/za
```

## At a glance

|                     |                                                  |
| ------------------- | ------------------------------------------------ |
| Signs               | 322                                              |
| With vector artwork | 322                                              |
| Categories          | `information`, `prohibitory`, `warning`          |
| Standard            | SARTSM (South African Road Traffic Signs Manual) |
| Regulator           | SARTSM                                           |
| Drive side          | left-hand                                        |
| Language(s)         | English, Afrikaans                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/za';

signs; // the whole registry
getSign('crossroad-ahead'); // by slug id
getSignByCode('crossroad-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-ahead')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/za/dist/sprite.css" />
<span class="rs-za-crossroad-ahead" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/za/dist/sprite.svg#rs-za-crossroad-ahead" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in South Africa](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Africa)
- [Wikimedia Commons — Road signs in South Africa](https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Africa)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/za)

## License

MIT © Karl Norling
