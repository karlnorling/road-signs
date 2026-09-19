# @road-signs/de

Road signs for Germany — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/de
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 666                                                 |
| With vector artwork | 666                                                 |
| Categories          | `information`, `priority`, `prohibitory`, `warning` |
| Standard            | StVO (Straßenverkehrs-Ordnung) — Vienna Convention  |
| Regulator           | BMVI (StVO)                                         |
| Drive side          | right-hand                                          |
| Language(s)         | German                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/de';

signs; // the whole registry
getSign('sign-101-danger-a-supplementary-sign-can-specify-the-danger'); // by slug id
getSignByCode('sign-101-danger-a-supplementary-sign-can-specify-the-danger'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('sign-101-danger-a-supplementary-sign-can-specify-the-danger')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/de/dist/sprite.css" />
<span
  class="rs-de-sign-101-danger-a-supplementary-sign-can-specify-the-danger"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/de/dist/sprite.svg#rs-de-sign-101-danger-a-supplementary-sign-can-specify-the-danger"
  />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Germany](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Germany)
- [Wikimedia Commons — Warnschilder (Deutschland)](<https://commons.wikimedia.org/wiki/Category:Warnschilder_(Deutschland)>)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/de)

## License

MIT © Karl Norling
