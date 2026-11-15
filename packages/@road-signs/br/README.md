# @road-signs/br

Road signs for Brazil — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/br
```

## At a glance

|                     |                                                                 |
| ------------------- | --------------------------------------------------------------- |
| Signs               | 171                                                             |
| With vector artwork | 171                                                             |
| Categories          | `prohibitory`, `warning`                                        |
| Standard            | CTB (Código de Trânsito Brasileiro) — Vienna Convention variant |
| Regulator           | CONTRAN (CTB)                                                   |
| Drive side          | right-hand                                                      |
| Language(s)         | Portuguese                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/br';

signs; // the whole registry
getSign('a-1a-sharp-curve-to-left'); // by slug id
getSignByCode('A-1A'); // by official code
getSignsByCategory('prohibitory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a-1a-sharp-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Brazil](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Brazil)
- [Wikimedia Commons — SVG road signs in Brazil](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brazil)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/br)

## License

MIT © Karl Norling
