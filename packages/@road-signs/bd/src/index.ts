import type { BDCategory, BDSign } from './types';
import { signs } from './signs.generated';

export type { BDCategory, BDSign } from './types';
export { signs };

export const getAllSigns = (): BDSign[] => [...signs];

export const getSign = (id: string): BDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BDCategory): BDSign[] =>
  signs.filter((s) => s.category === category);
