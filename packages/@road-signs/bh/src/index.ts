import type { BHCategory, BHSign } from './types';
import { signs } from './signs.generated';

export type { BHCategory, BHSign } from './types';
export { signs };

export const getAllSigns = (): BHSign[] => [...signs];

export const getSign = (id: string): BHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BHCategory): BHSign[] =>
  signs.filter((s) => s.category === category);
