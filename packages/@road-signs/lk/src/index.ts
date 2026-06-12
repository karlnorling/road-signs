import type { LKCategory, LKSign } from './types';
import { signs } from './signs.generated';

export type { LKCategory, LKSign } from './types';
export { signs };

export const getAllSigns = (): LKSign[] => [...signs];

export const getSign = (id: string): LKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LKCategory): LKSign[] =>
  signs.filter((s) => s.category === category);
