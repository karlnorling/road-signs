# @road-signs/xk

Road signs for Kosovo — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/xk
```

## At a glance

|                     |                                                             |
| ------------------- | ----------------------------------------------------------- |
| Signs               | 234                                                         |
| With vector artwork | 234                                                         |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`        |
| Standard            | Vienna Convention (Ligji për Siguri në Komunikacion Rrugor) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/xk';

signs; // the whole registry
getSign('curve-to-left-curve-to-left'); // by slug id
getSignByCode('curve-to-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-left-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Kosovo](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Kosovo)

## Notes

No Kosovo-specific SVG sign diagrams exist on Wikimedia Commons. The sign set mirrors Serbia — Kosovo inherited the Yugoslav/Serbian road sign system and follows the Vienna Convention.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/xk)

## License

MIT © Karl Norling
