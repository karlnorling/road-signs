import type { BZCategory, BZSign } from './types';
import { signs } from './signs.generated';

export type { BZCategory, BZSign } from './types';
export { signs };

export const getAllSigns = (): BZSign[] => [...signs];

export const getSign = (id: string): BZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BZCategory): BZSign[] =>
  signs.filter((s) => s.category === category);
