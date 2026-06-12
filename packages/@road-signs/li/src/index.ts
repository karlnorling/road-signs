import type { LICategory, LISign } from './types';
import { signs } from './signs.generated';

export type { LICategory, LISign } from './types';
export { signs };

export const getAllSigns = (): LISign[] => [...signs];

export const getSign = (id: string): LISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LICategory): LISign[] =>
  signs.filter((s) => s.category === category);
