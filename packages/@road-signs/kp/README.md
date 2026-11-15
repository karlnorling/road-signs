# @road-signs/kp

Road signs for North Korea — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/kp
```

## At a glance

|                     |                                   |
| ------------------- | --------------------------------- |
| Signs               | 29                                |
| With vector artwork | 29                                |
| Categories          | `information`, `mandatory`        |
| Standard            | DPRK road sign system (도로 표시) |
| Regulator           | DPRK Ministry of Public Security  |
| Drive side          | right-hand                        |
| Language(s)         | Korean                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kp';

signs; // the whole registry
getSign('horn-signal'); // by slug id
getSignByCode('horn-signal'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('horn-signal')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in North Korea](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Korea)

## Notes

North Korean road signs use Korean-language names with no alphanumeric codes. The 29 SVG diagrams on Wikimedia Commons are mapped to descriptive English slugs.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kp)

## License

MIT © Karl Norling
