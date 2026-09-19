# @road-signs/hr

Road signs for Croatia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/hr
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 337                                                 |
| With vector artwork | 337                                                 |
| Categories          | `information`, `priority`, `prohibitory`, `warning` |
| Standard            | Pravilnik o prometnim znakovima — Vienna Convention |
| Regulator           | HAK                                                 |
| Drive side          | right-hand                                          |
| Language(s)         | Croatian                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/hr';

signs; // the whole registry
getSign('a01-other-dangers'); // by slug id
getSignByCode('A01'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a01-other-dangers')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/hr/dist/sprite.css" />
<span class="rs-hr-a01-other-dangers" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/hr/dist/sprite.svg#rs-hr-a01-other-dangers" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Croatia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Croatia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/hr)

## License

MIT © Karl Norling
