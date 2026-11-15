# @road-signs/ht

Road signs for Haiti — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/ht/).

## Install

```sh
npm install @road-signs/ht
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ht';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Haiti](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Haiti)
- [Ministère des Travaux Publics, Transports et Communications (MTPTC)](https://mtptc.gouv.ht/)

## Notes

No SVG assets currently on Wikimedia Commons. Haiti uses a French-influenced sign system based on the Vienna Convention. The governing authority is the Ministère des Travaux Publics, Transports et Communications (MTPTC). No publicly available official sign manual PDF has been located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ht)

## License

MIT © Karl Norling
