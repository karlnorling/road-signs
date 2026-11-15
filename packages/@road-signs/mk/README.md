# @road-signs/mk

Road signs for North Macedonia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

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
getSign('other-dangers-other-dangers'); // by slug id
getSignByCode('other-dangers'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('other-dangers-other-dangers')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in North Macedonia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Macedonia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mk)

## License

MIT © Karl Norling
