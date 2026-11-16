import type { PECategory, PESign } from './types.js';
import { signs } from './signs.generated.js';

export type { PECategory, PESign } from './types.js';
export { signs };

export const getAllSigns = (): PESign[] => [...signs];

export const getSign = (id: string): PESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PECategory): PESign[] =>
  signs.filter((s) => s.category === category);
