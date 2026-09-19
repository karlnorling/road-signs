# @road-signs/uz

Road signs for Uzbekistan — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/uz
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 279                                                              |
| With vector artwork | 279                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (ГОСТ Р 52290)                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/uz';

signs; // the whole registry
getSign('1-1-railway-crossing-with-a-barrier'); // by slug id
getSignByCode('1-1-railway-crossing-with-a-barrier'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-1-railway-crossing-with-a-barrier')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/uz/dist/sprite.css" />
<span
  class="rs-uz-1-1-railway-crossing-with-a-barrier"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/uz/dist/sprite.svg#rs-uz-1-1-railway-crossing-with-a-barrier"
  />
</svg>
```

## Sources

- [Wikipedia — Road signs in Uzbekistan](https://en.wikipedia.org/wiki/Road_signs_in_Uzbekistan)
- [Wikimedia Commons — SVG road signs in Uzbekistan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uzbekistan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/uz)

## License

MIT © Karl Norling
