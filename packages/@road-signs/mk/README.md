# @road-signs/mk

Road signs for North Macedonia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/mk
```

## At a glance

|                     |                                                                     |
| ------------------- | ------------------------------------------------------------------- |
| Signs               | 233                                                                 |
| With vector artwork | 233                                                                 |
| Categories          | `information`, `prohibitory`, `warning`                             |
| Standard            | Закон за безбедност на сообраќајот на патиштата — Vienna Convention |
| Regulator           | AMSM                                                                |
| Drive side          | right-hand                                                          |
| Language(s)         | Macedonian                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mk';

signs; // the whole registry
getSign('other-dangers'); // by slug id
getSignByCode('other-dangers'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('other-dangers')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/mk/dist/sprite.css" />
<span class="rs-mk-other-dangers" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/mk/dist/sprite.svg#rs-mk-other-dangers" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in North Macedonia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Macedonia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mk)

## License

MIT © Karl Norling
