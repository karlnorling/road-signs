# @road-signs/iq

Road signs for Iraq — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/iq/).

## Install

```sh
npm install @road-signs/iq
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/iq';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Iraq](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iraq)
- [Iraqi Ministry of Transport (وزارة النقل)](https://www.motrans.gov.iq/)

## Notes

No SVG assets currently on Wikimedia Commons. Iraq uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/iq)

## License

MIT © Karl Norling
