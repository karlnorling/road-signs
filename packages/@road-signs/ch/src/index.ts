import type { CHCategory, CHSign } from './types.js';
import { signs } from './signs.generated.js';

export type { CHCategory, CHSign } from './types.js';
export { signs };

export const getAllSigns = (): CHSign[] => [...signs];

export const getSign = (id: string): CHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CHCategory): CHSign[] =>
  signs.filter((s) => s.category === category);
