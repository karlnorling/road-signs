import type { HNCategory, HNSign } from './types';
import { signs } from './signs.generated';

export type { HNCategory, HNSign } from './types';
export { signs };

export const getAllSigns = (): HNSign[] => [...signs];

export const getSign = (id: string): HNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): HNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: HNCategory): HNSign[] =>
  signs.filter((s) => s.category === category);
