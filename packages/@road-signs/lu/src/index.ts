import type { LUCategory, LUSign } from './types';
import { signs } from './signs.generated';

export type { LUCategory, LUSign } from './types';
export { signs };

export const getAllSigns = (): LUSign[] => [...signs];

export const getSign = (id: string): LUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LUCategory): LUSign[] =>
  signs.filter((s) => s.category === category);
