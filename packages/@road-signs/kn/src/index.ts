import type { KNCategory, KNSign } from './types';
import { signs } from './signs.generated';

export type { KNCategory, KNSign } from './types';
export { signs };

export const getAllSigns = (): KNSign[] => [...signs];

export const getSign = (id: string): KNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KNCategory): KNSign[] =>
  signs.filter((s) => s.category === category);
