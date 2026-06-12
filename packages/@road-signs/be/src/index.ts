import type { BECategory, BESign } from './types';
import { signs } from './signs.generated';

export type { BECategory, BESign } from './types';
export { signs };

export const getAllSigns = (): BESign[] => [...signs];

export const getSign = (id: string): BESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BECategory): BESign[] =>
  signs.filter((s) => s.category === category);
