# @road-signs/pe

Road signs for Peru — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/pe
```

## At a glance

|                     |                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Signs               | 11                                                                                         |
| With vector artwork | 11                                                                                         |
| Categories          | `information`                                                                              |
| Standard            | Manual de Dispositivos de Control del Tránsito Automotor (MTC) — Vienna Convention variant |
| Regulator           | MTC                                                                                        |
| Drive side          | right-hand                                                                                 |
| Language(s)         | Spanish                                                                                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pe';

signs; // the whole registry
getSign('i-10-peru-road-sign'); // by slug id
getSignByCode('I-10'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('i-10-peru-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Peru](https://en.wikipedia.org/wiki/Road_signs_in_Peru)
- [Wikimedia Commons — Road signs in Peru](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Peru)
- [Wikimedia Commons — Road signs in Peru (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Peru)

## Notes

Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa/Indicativa (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pe)

## License

MIT © Karl Norling
