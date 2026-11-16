import type { KMCategory, KMSign } from './types.js';
import { signs } from './signs.generated.js';

export type { KMCategory, KMSign } from './types.js';
export { signs };

export const getAllSigns = (): KMSign[] => [...signs];

export const getSign = (id: string): KMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KMCategory): KMSign[] =>
  signs.filter((s) => s.category === category);
