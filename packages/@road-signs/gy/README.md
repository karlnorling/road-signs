# @road-signs/gy

Road signs for Guyana — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/gy/).

## Install

```sh
npm install @road-signs/gy
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/gy';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Guyana](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Guyana)
- [Ministry of Public Works — road infrastructure authority](https://mopw.gov.gy/)
- [Motor Vehicles and Road Traffic Act (PDF)](https://moha.gov.gy/wp-content/uploads/2021/04/Motor-Vehicle-and-Road-Act.pdf)

## Notes

No SVG assets currently on Wikimedia Commons. Guyana follows a British-derived sign system. Sign specifications are governed by the Motor Vehicles and Road Traffic Act, administered by the Ministry of Public Works.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/gy)

## License

MIT © Karl Norling
