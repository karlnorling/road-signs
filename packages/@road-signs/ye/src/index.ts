import type { YECategory, YESign } from './types.js';
import { signs } from './signs.generated.js';

export type { YECategory, YESign } from './types.js';
export { signs };

export const getAllSigns = (): YESign[] => [...signs];

export const getSign = (id: string): YESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): YESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: YECategory): YESign[] =>
  signs.filter((s) => s.category === category);
