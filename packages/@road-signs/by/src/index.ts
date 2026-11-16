import type { BYCategory, BYSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BYCategory, BYSign } from './types.js';
export { signs };

export const getAllSigns = (): BYSign[] => [...signs];

export const getSign = (id: string): BYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BYCategory): BYSign[] =>
  signs.filter((s) => s.category === category);
