import type { LYCategory, LYSign } from './types';
import { signs } from './signs.generated';

export type { LYCategory, LYSign } from './types';
export { signs };

export const getAllSigns = (): LYSign[] => [...signs];

export const getSign = (id: string): LYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LYCategory): LYSign[] =>
  signs.filter((s) => s.category === category);
