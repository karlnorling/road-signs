# @road-signs/to

Road signs for Tonga — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/to
```

## At a glance

|                     |                               |
| ------------------- | ----------------------------- |
| Signs               | 2                             |
| With vector artwork | 2                             |
| Categories          | `priority`                    |
| Standard            | British-derived (Traffic Act) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/to';

signs; // the whole registry
getSign('stop-stop'); // by slug id
getSignByCode('STOP'); // by official code
getSignsByCategory('priority'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('stop-stop')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Transport in Tonga](https://en.wikipedia.org/wiki/Transport_in_Tonga)

## Notes

Minimal package: 2 SVGs from Commons (Stop, Give Way). Tonga's full catalogue is not online.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/to)

## License

MIT © Karl Norling
