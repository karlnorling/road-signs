# @road-signs/sn

Road signs for Senegal — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/sn/).

## Install

```sh
npm install @road-signs/sn
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sn';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Senegal](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Senegal)
- [Ministère des Infrastructures et des Transports Terrestres](https://www.transports.gouv.sn/)
- [Code de la Route Sénégal (reference guide)](https://codesenegal.com/)

## Notes

No SVG assets currently on Wikimedia Commons. Senegal uses a French-influenced Code de la Route based on the Vienna Convention. The governing authority is the Ministère des Infrastructures et des Transports Terrestres.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sn)

## License

MIT © Karl Norling
