# @road-signs/eg

Road signs for Egypt — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/eg
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 1                                            |
| With vector artwork | 1                                            |
| Categories          | `priority`                                   |
| Standard            | British-derived (Egypt Traffic Signs Manual) |
| Regulator           | Ministry of Transport                        |
| Drive side          | right-hand                                   |
| Language(s)         | Arabic                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/eg';

signs; // the whole registry
getSign('egyptian-road-sign-stop'); // by slug id
getSignByCode('egyptian-road-sign-stop'); // by official code
getSignsByCategory('priority'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('egyptian-road-sign-stop')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/eg/dist/sprite.css" />
<span
  class="rs-eg-egyptian-road-sign-stop"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/eg/dist/sprite.svg#rs-eg-egyptian-road-sign-stop" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Egypt](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Egypt)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/eg)

## License

MIT © Karl Norling
