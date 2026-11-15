# @road-signs/mu

Road signs for Mauritius — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mu
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 104                                                              |
| With vector artwork | 104                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Traffic Signs Regulations 1990 — UK-derived system               |
| Regulator           | Traffic Management Road Safety Unit                              |
| Drive side          | left-hand                                                        |
| Language(s)         | English, French                                                  |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mu';

signs; // the whole registry
getSign('curve-to-the-right-curve-to-the-right'); // by slug id
getSignByCode('curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-right-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Mauritius](https://en.wikipedia.org/wiki/Road_signs_in_Mauritius)
- [Wikimedia Commons — SVG road signs in Mauritius](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mauritius)

## Notes

Mauritius uses a UK-derived system (Traffic Signs Regulations 1990) rather than the SADC regional standard used by most neighbouring countries.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mu)

## License

MIT © Karl Norling
