# @road-signs/lr

Road signs for Liberia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/lr
```

## At a glance

|                     |                           |
| ------------------- | ------------------------- |
| Signs               | 3                         |
| With vector artwork | 3                         |
| Categories          | `priority`, `prohibitory` |
| Standard            | US MUTCD-influenced       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lr';

signs; // the whole registry
getSign('r1-stop-stop'); // by slug id
getSignByCode('R1-STOP'); // by official code
getSignsByCategory('priority'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('r1-stop-stop')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Transport in Liberia](https://en.wikipedia.org/wiki/Transport_in_Liberia)

## Notes

Minimal package: 3 SVGs from the "Liberian Road Signs" Commons series (Stop, Yield, No Entry). Likely follows a US-influenced system; full catalogue not online.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lr)

## License

MIT © Karl Norling
