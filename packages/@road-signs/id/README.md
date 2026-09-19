# @road-signs/id

Road signs for Indonesia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/id
```

## At a glance

|                     |                                                                 |
| ------------------- | --------------------------------------------------------------- |
| Signs               | 295                                                             |
| With vector artwork | 295                                                             |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`            |
| Standard            | Vienna Convention based (Minister of Transport Regulation 2014) |
| Regulator           | Ministry of Transportation                                      |
| Drive side          | left-hand                                                       |
| Language(s)         | Indonesian                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/id';

signs; // the whole registry
getSign('bend'); // by slug id
getSignByCode('bend'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('bend')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/id/dist/sprite.css" />
<span class="rs-id-bend" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/id/dist/sprite.svg#rs-id-bend" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Indonesia](https://en.wikipedia.org/wiki/Road_signs_in_Indonesia)
- [Wikimedia Commons — SVG road signs in Indonesia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Indonesia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/id)

## License

MIT © Karl Norling
