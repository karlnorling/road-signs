# @road-signs/bh

Road signs for Bahrain — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/bh
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 1                                                   |
| With vector artwork | 1                                                   |
| Categories          | `priority`                                          |
| Standard            | GCC Traffic Signs Manual (bilingual Arabic/English) |
| Regulator           | GCC Manual                                          |
| Drive side          | right-hand                                          |
| Language(s)         | Arabic, English                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bh';

signs; // the whole registry
getSign('give-way'); // by slug id
getSignByCode('GIVE_WAY'); // by official code
getSignsByCategory('priority'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('give-way')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/bh/dist/sprite.css" />
<span class="rs-bh-give-way" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/bh/dist/sprite.svg#rs-bh-give-way" />
</svg>
```

## Sources

- [Wikipedia — Transport in Bahrain](https://en.wikipedia.org/wiki/Transport_in_Bahrain)

## Notes

Empty package: no publicly available SVG sign catalogue located. Bahrain follows the shared GCC Traffic Signs Manual.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bh)

## License

MIT © Karl Norling
