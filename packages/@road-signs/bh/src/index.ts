import type { BHCategory, BHSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BHCategory, BHSign } from './types.js';
export { signs };

export const getAllSigns = (): BHSign[] => [...signs];

export const getSign = (id: string): BHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BHCategory): BHSign[] =>
  signs.filter((s) => s.category === category);
