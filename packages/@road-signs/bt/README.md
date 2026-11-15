# @road-signs/bt

Road signs for Bhutan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/bt
```

## At a glance

|                     |                                                   |
| ------------------- | ------------------------------------------------- |
| Signs               | 6                                                 |
| With vector artwork | 6                                                 |
| Categories          | `information`, `priority`                         |
| Standard            | Bhutan Road Safety and Transport Authority (RSTA) |
| Regulator           | RSTA                                              |
| Drive side          | left-hand                                         |
| Language(s)         | Dzongkha                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bt';

signs; // the whole registry
getSign('stop-stop'); // by slug id
getSignByCode('STOP'); // by official code
getSignsByCategory('information'); // by category
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

- [Wikipedia — Transport in Bhutan](https://en.wikipedia.org/wiki/Transport_in_Bhutan)

## Notes

Empty package: no publicly available SVG sign catalogue located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bt)

## License

MIT © Karl Norling
