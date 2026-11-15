# @road-signs/si

Road signs for Slovenia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

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

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Slovenia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovenia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/si)

## License

MIT © Karl Norling
