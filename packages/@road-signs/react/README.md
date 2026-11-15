# @road-signs/react

Accessible React component for road signs — works with any country package.

## Install

```sh
npm install @road-signs/react
```

## Usage

```ts
import { getSign } from '@road-signs/us';
import { RoadSign } from '@road-signs/react';

const sign = getSign('w1-1r-turn-right')!;

<RoadSign sign={sign} size={64} />;
```

Every sign renders from its country package alone — the artwork is inline
SVG, with the accessible name and description injected into it automatically.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/react)

## License

MIT © Karl Norling
