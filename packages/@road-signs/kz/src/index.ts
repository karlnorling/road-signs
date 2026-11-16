import type { KZCategory, KZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { KZCategory, KZSign } from './types.js';
export { signs };

export const getAllSigns = (): KZSign[] => [...signs];

export const getSign = (id: string): KZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KZCategory): KZSign[] =>
  signs.filter((s) => s.category === category);
