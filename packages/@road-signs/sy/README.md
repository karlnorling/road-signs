# @road-signs/sy

Road signs for Syria — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/sy/).

## Install

```sh
npm install @road-signs/sy
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sy';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Syria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Syria)
- [Syrian Ministry of Transport (وزارة النقل)](https://www.mot.gov.sy/)

## Notes

No SVG assets currently on Wikimedia Commons. Syria uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sy)

## License

MIT © Karl Norling
