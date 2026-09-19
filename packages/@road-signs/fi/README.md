# @road-signs/fi

Road signs for Finland — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/fi
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 445                                                              |
| With vector artwork | 445                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Tieliikennelaki — Vienna Convention                              |
| Regulator           | Traficom                                                         |
| Drive side          | right-hand                                                       |
| Language(s)         | Finnish, Swedish                                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/fi';

signs; // the whole registry
getSign('dangerous-curve-to-right-formerly-used'); // by slug id
getSignByCode('dangerous-curve-to-right-formerly-used'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-right-formerly-used')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/fi/dist/sprite.css" />
<span
  class="rs-fi-dangerous-curve-to-right-formerly-used"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use
    href="node_modules/@road-signs/fi/dist/sprite.svg#rs-fi-dangerous-curve-to-right-formerly-used"
  />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Finland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Finland)

## Notes

Codes are 3-digit numeric: 111–199 (warning), 211–299 (priority), 311–399 (prohibitory), 411–499 (mandatory), 511+ (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/fi)

## License

MIT © Karl Norling
