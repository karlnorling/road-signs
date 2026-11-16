import type { LICategory, LISign } from './types.js';
import { signs } from './signs.generated.js';

export type { LICategory, LISign } from './types.js';
export { signs };

export const getAllSigns = (): LISign[] => [...signs];

export const getSign = (id: string): LISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LICategory): LISign[] =>
  signs.filter((s) => s.category === category);
