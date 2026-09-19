# @road-signs/ng

Road signs for Nigeria — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ng
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 89                                                               |
| With vector artwork | 89                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | British-derived                                                  |
| Regulator           | FRSC                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | English                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ng';

signs; // the whole registry
getSign('a01a-ng-road-sign-a01a'); // by slug id
getSignByCode('A01A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a01a-ng-road-sign-a01a')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ng/dist/sprite.css" />
<span
  class="rs-ng-a01a-ng-road-sign-a01a"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ng/dist/sprite.svg#rs-ng-a01a-ng-road-sign-a01a" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Nigeria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nigeria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ng)

## License

MIT © Karl Norling
