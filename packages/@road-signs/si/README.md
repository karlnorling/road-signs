# @road-signs/si

Road signs for Slovenia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/si
```

## At a glance

|                     |                                                        |
| ------------------- | ------------------------------------------------------ |
| Signs               | 183                                                    |
| With vector artwork | 183                                                    |
| Categories          | `information`, `mandatory`, `priority`, `warning`      |
| Standard            | Pravilnik o prometni signalizaciji — Vienna Convention |
| Regulator           | DRSI                                                   |
| Drive side          | right-hand                                             |
| Language(s)         | Slovenian                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/si';

signs; // the whole registry
getSign('i-1-curve-to-the-left'); // by slug id
getSignByCode('I-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('i-1-curve-to-the-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/si/dist/sprite.css" />
<span
  class="rs-si-i-1-curve-to-the-left"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/si/dist/sprite.svg#rs-si-i-1-curve-to-the-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Slovenia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovenia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/si)

## License

MIT © Karl Norling
