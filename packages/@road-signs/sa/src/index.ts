import type { SACategory, SASign } from './types.js';
import { signs } from './signs.generated.js';

export type { SACategory, SASign } from './types.js';
export { signs };

export const getAllSigns = (): SASign[] => [...signs];

export const getSign = (id: string): SASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SACategory): SASign[] =>
  signs.filter((s) => s.category === category);
