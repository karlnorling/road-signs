import type { GWCategory, GWSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GWCategory, GWSign } from './types.js';
export { signs };

export const getAllSigns = (): GWSign[] => [...signs];

export const getSign = (id: string): GWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GWCategory): GWSign[] =>
  signs.filter((s) => s.category === category);
