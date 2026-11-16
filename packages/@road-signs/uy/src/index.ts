import type { UYCategory, UYSign } from './types.js';
import { signs } from './signs.generated.js';

export type { UYCategory, UYSign } from './types.js';
export { signs };

export const getAllSigns = (): UYSign[] => [...signs];

export const getSign = (id: string): UYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): UYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: UYCategory): UYSign[] =>
  signs.filter((s) => s.category === category);
