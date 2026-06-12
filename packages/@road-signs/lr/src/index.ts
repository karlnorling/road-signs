import type { LRCategory, LRSign } from './types';
import { signs } from './signs.generated';

export type { LRCategory, LRSign } from './types';
export { signs };

export const getAllSigns = (): LRSign[] => [...signs];

export const getSign = (id: string): LRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LRCategory): LRSign[] =>
  signs.filter((s) => s.category === category);
