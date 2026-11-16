import type { KHCategory, KHSign } from './types.js';
import { signs } from './signs.generated.js';

export type { KHCategory, KHSign } from './types.js';
export { signs };

export const getAllSigns = (): KHSign[] => [...signs];

export const getSign = (id: string): KHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KHCategory): KHSign[] =>
  signs.filter((s) => s.category === category);
