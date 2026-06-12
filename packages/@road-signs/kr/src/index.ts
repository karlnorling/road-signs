import type { KRCategory, KRSign } from './types';
import { signs } from './signs.generated';

export type { KRCategory, KRSign } from './types';
export { signs };

export const getAllSigns = (): KRSign[] => [...signs];

export const getSign = (id: string): KRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KRCategory): KRSign[] =>
  signs.filter((s) => s.category === category);
