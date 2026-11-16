import type { LVCategory, LVSign } from './types.js';
import { signs } from './signs.generated.js';

export type { LVCategory, LVSign } from './types.js';
export { signs };

export const getAllSigns = (): LVSign[] => [...signs];

export const getSign = (id: string): LVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LVCategory): LVSign[] =>
  signs.filter((s) => s.category === category);
