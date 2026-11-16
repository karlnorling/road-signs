import type { INCategory, INSign } from './types.js';
import { signs } from './signs.generated.js';

export type { INCategory, INSign } from './types.js';
export { signs };

export const getAllSigns = (): INSign[] => [...signs];

export const getSign = (id: string): INSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): INSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: INCategory): INSign[] =>
  signs.filter((s) => s.category === category);
