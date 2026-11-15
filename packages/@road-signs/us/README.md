# @road-signs/us

Road signs for United States — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/us
```

## At a glance

|                     |                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------- |
| Signs               | 1,420                                                                                       |
| With vector artwork | 1,420                                                                                       |
| Categories          | `construction`, `guide`, `informational`, `recreational`, `regulatory`, `school`, `warning` |
| Standard            | MUTCD (Manual on Uniform Traffic Control Devices) — FHWA                                    |
| Regulator           | FHWA                                                                                        |
| Drive side          | right-hand                                                                                  |
| Language(s)         | English                                                                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/us';

signs; // the whole registry
getSign('w1-1r-turn-right'); // by slug id
getSignByCode('W1-1R'); // by official code
getSignsByCategory('construction'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w1-1r-turn-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [FHWA MUTCD Standard Highway Signs (ZIP)](https://mutcd.fhwa.dot.gov/ser-shs_millennium.htm)
- [Wikimedia Commons — MUTCD signs](https://commons.wikimedia.org/wiki/Category:MUTCD)
- [Wikipedia — Manual on Uniform Traffic Control Devices](https://en.wikipedia.org/wiki/Manual_on_Uniform_Traffic_Control_Devices)

## Notes

Overall coverage is ~95%. The 72 remaining signs are all Hawaii-specific supplements (codes prefixed HW, HR, HS, HD). Not in the FHWA 2024 SHS ZIPs, not on Wikimedia Commons, and Hawaii DOT does not publish a state sign manual PDF — a structural gap until vector sources surface. Investigated 2026-06-14.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/us)

## License

MIT © Karl Norling
