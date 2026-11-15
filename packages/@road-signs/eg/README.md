# @road-signs/eg

Road signs for Egypt — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/eg
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 1                                            |
| With vector artwork | 1                                            |
| Categories          | `priority`                                   |
| Standard            | British-derived (Egypt Traffic Signs Manual) |
| Regulator           | Ministry of Transport                        |
| Drive side          | right-hand                                   |
| Language(s)         | Arabic                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/eg';

signs; // the whole registry
getSign('egyptian-road-sign-stop-egyptian-road-sign-stop'); // by slug id
getSignByCode('egyptian-road-sign-stop'); // by official code
getSignsByCategory('priority'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('egyptian-road-sign-stop-egyptian-road-sign-stop')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Egypt](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Egypt)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/eg)

## License

MIT © Karl Norling
