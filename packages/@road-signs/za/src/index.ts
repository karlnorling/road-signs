import type { ZACategory, ZASign } from './types.js';
import { signs } from './signs.generated.js';

export type { ZACategory, ZASign } from './types.js';
export { signs };

export const getAllSigns = (): ZASign[] => [...signs];

export const getSign = (id: string): ZASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ZASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ZACategory): ZASign[] =>
  signs.filter((s) => s.category === category);
