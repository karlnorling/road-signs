# @road-signs/ws

Road signs for Samoa — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ws
```

## At a glance

|                     |                                                |
| ------------------- | ---------------------------------------------- |
| Signs               | 2                                              |
| With vector artwork | 2                                              |
| Categories          | `prohibitory`, `warning`                       |
| Standard            | New Zealand-derived (Land Transport Authority) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ws';

signs; // the whole registry
getSign('ford-ford'); // by slug id
getSignByCode('FORD'); // by official code
getSignsByCategory('prohibitory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('ford-ford')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Transport in Samoa](https://en.wikipedia.org/wiki/Transport_in_Samoa)

## Notes

Minimal package: 2 SVGs from Commons (Ford warning, Speed Limit). Samoa's full catalogue is not online.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ws)

## License

MIT © Karl Norling
