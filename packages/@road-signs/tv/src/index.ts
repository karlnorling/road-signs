import type { TVCategory, TVSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TVCategory, TVSign } from './types.js';
export { signs };

export const getAllSigns = (): TVSign[] => [...signs];

export const getSign = (id: string): TVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TVCategory): TVSign[] =>
  signs.filter((s) => s.category === category);
