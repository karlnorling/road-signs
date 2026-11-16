import type { GHCategory, GHSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GHCategory, GHSign } from './types.js';
export { signs };

export const getAllSigns = (): GHSign[] => [...signs];

export const getSign = (id: string): GHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GHCategory): GHSign[] =>
  signs.filter((s) => s.category === category);
