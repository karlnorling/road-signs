import type { KGCategory, KGSign } from './types.js';
import { signs } from './signs.generated.js';

export type { KGCategory, KGSign } from './types.js';
export { signs };

export const getAllSigns = (): KGSign[] => [...signs];

export const getSign = (id: string): KGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KGCategory): KGSign[] =>
  signs.filter((s) => s.category === category);
