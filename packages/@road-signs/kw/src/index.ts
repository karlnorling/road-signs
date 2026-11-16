import type { KWCategory, KWSign } from './types.js';
import { signs } from './signs.generated.js';

export type { KWCategory, KWSign } from './types.js';
export { signs };

export const getAllSigns = (): KWSign[] => [...signs];

export const getSign = (id: string): KWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KWCategory): KWSign[] =>
  signs.filter((s) => s.category === category);
