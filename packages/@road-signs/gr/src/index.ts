import type { GRCategory, GRSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GRCategory, GRSign } from './types.js';
export { signs };

export const getAllSigns = (): GRSign[] => [...signs];

export const getSign = (id: string): GRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GRCategory): GRSign[] =>
  signs.filter((s) => s.category === category);
