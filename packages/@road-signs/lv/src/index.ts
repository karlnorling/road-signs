import type { LVCategory, LVSign } from './types';
import { signs } from './signs.generated';

export type { LVCategory, LVSign } from './types';
export { signs };

export const getAllSigns = (): LVSign[] => [...signs];

export const getSign = (id: string): LVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LVCategory): LVSign[] =>
  signs.filter((s) => s.category === category);
