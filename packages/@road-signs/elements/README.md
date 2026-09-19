# @road-signs/elements

Framework-free custom elements for road signs — works with any country package.

## Install

```sh
npm install @road-signs/elements
```

## Usage

```ts
import { registerRoadSign } from '@road-signs/elements';
import { getSign } from '@road-signs/us';

registerRoadSign('road-sign-us', getSign);

// <road-sign-us sign-id="w1-1-turn" size="64"></road-sign-us>
```

Every sign renders from the package alone: vector signs carry inline SVG,
and the handful with no vector source carry a base64 PNG data URI.
Accessible name and description are injected into the SVG automatically.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/elements)

## License

MIT © Karl Norling
