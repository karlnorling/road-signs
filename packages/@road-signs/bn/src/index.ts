import type { BNCategory, BNSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BNCategory, BNSign } from './types.js';
export { signs };

export const getAllSigns = (): BNSign[] => [...signs];

export const getSign = (id: string): BNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BNCategory): BNSign[] =>
  signs.filter((s) => s.category === category);
