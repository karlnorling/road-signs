import type { GECategory, GESign } from './types.js';
import { signs } from './signs.generated.js';

export type { GECategory, GESign } from './types.js';
export { signs };

export const getAllSigns = (): GESign[] => [...signs];

export const getSign = (id: string): GESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GECategory): GESign[] =>
  signs.filter((s) => s.category === category);
