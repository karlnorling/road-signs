import type { BFCategory, BFSign } from './types';
import { signs } from './signs.generated';

export type { BFCategory, BFSign } from './types';
export { signs };

export const getAllSigns = (): BFSign[] => [...signs];

export const getSign = (id: string): BFSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BFSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BFCategory): BFSign[] =>
  signs.filter((s) => s.category === category);
