# @road-signs/vue

Accessible Vue 3 component for road signs — works with any country package.

## Install

```sh
npm install @road-signs/vue
```

## Usage

```ts
import { getSign } from '@road-signs/us';
import { RoadSign } from '@road-signs/vue';

const sign = getSign('w1-1-turn');

// <RoadSign :sign="sign" :size="64" />
```

Every sign renders from the package alone: vector signs carry inline SVG,
and the handful with no vector source carry a base64 PNG data URI.
Accessible name and description are injected into the SVG automatically.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/vue)

## License

MIT © Karl Norling
