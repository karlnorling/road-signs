# @road-signs/lt

Road signs for Lithuania — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/lt
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 229                                                              |
| With vector artwork | 229                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Kelių eismo taisyklės — Vienna Convention                        |
| Regulator           | LAKD                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Lithuanian                                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lt';

signs; // the whole registry
getSign('level-crossing-ahead-with-gates'); // by slug id
getSignByCode('level-crossing-ahead-with-gates'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('level-crossing-ahead-with-gates')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/lt/dist/sprite.css" />
<span
  class="rs-lt-level-crossing-ahead-with-gates"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/lt/dist/sprite.svg#rs-lt-level-crossing-ahead-with-gates" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Lithuania](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Lithuania)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lt)

## License

MIT © Karl Norling
