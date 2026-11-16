import type { SDCategory, SDSign } from './types.js';
import { signs } from './signs.generated.js';

export type { SDCategory, SDSign } from './types.js';
export { signs };

export const getAllSigns = (): SDSign[] => [...signs];

export const getSign = (id: string): SDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SDCategory): SDSign[] =>
  signs.filter((s) => s.category === category);
