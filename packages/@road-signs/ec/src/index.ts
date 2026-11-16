import type { ECCategory, ECSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ECCategory, ECSign } from './types.js';
export { signs };

export const getAllSigns = (): ECSign[] => [...signs];

export const getSign = (id: string): ECSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ECSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ECCategory): ECSign[] =>
  signs.filter((s) => s.category === category);
