import type { PACategory, PASign } from './types.js';
import { signs } from './signs.generated.js';

export type { PACategory, PASign } from './types.js';
export { signs };

export const getAllSigns = (): PASign[] => [...signs];

export const getSign = (id: string): PASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PACategory): PASign[] =>
  signs.filter((s) => s.category === category);
