# @road-signs/ca

Road signs for Canada — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ca
```

## At a glance

|                     |                                                               |
| ------------------- | ------------------------------------------------------------- |
| Signs               | 245                                                           |
| With vector artwork | 245                                                           |
| Categories          | `information`, `regulatory`, `school`, `temporary`, `warning` |
| Standard            | MUTCDC (Manual of Uniform Traffic Control Devices for Canada) |
| Regulator           | Transport Canada (MUTCDC)                                     |
| Drive side          | right-hand                                                    |
| Language(s)         | English, French                                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ca';

signs; // the whole registry
getSign(
  'a-blue-metric-reminder-signage-used-in-ontario-canada-is-seen-near-the-us-borders-a-blue-metric-reminder-signage-used-in-ontario-canada-is-seen-near-the-us-borders',
); // by slug id
getSignByCode('a-blue-metric-reminder-signage-used-in-ontario-canada-is-seen-near-the-us-borders'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  'a-blue-metric-reminder-signage-used-in-ontario-canada-is-seen-near-the-us-borders-a-blue-metric-reminder-signage-used-in-ontario-canada-is-seen-near-the-us-borders',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Regulatory signs of Canada](https://commons.wikimedia.org/wiki/Category:SVG_regulatory_road_signs_of_Canada)
- [Wikimedia Commons — Warning signs of Canada](https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Canada)
- [Wikimedia Commons — School signs of Canada](https://commons.wikimedia.org/wiki/Category:SVG_school_road_signs_of_Canada)
- [Wikimedia Commons — Temporary signs of Canada](https://commons.wikimedia.org/wiki/Category:SVG_temporary_road_signs_of_Canada)
- [Wikimedia Commons — British Columbia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_British_Columbia)
- [Wikimedia Commons — Quebec](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Quebec)
- [Wikimedia Commons — Ontario](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Ontario)
- [Wikimedia Commons — Alberta](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Alberta)
- [Wikimedia Commons — Manitoba](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Manitoba)
- [Wikimedia Commons — Nova Scotia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Nova_Scotia)
- [Wikimedia Commons — New Brunswick](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_New_Brunswick)
- [Wikimedia Commons — Saskatchewan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Saskatchewan)
- [Wikimedia Commons — Prince Edward Island](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Prince_Edward_Island)
- [Wikimedia Commons — Newfoundland and Labrador](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Newfoundland_and_Labrador)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ca)

## License

MIT © Karl Norling
