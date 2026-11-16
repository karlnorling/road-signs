import type { PWCategory, PWSign } from './types.js';
import { signs } from './signs.generated.js';

export type { PWCategory, PWSign } from './types.js';
export { signs };

export const getAllSigns = (): PWSign[] => [...signs];

export const getSign = (id: string): PWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PWCategory): PWSign[] =>
  signs.filter((s) => s.category === category);
