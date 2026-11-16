import type { NECategory, NESign } from './types.js';
import { signs } from './signs.generated.js';

export type { NECategory, NESign } from './types.js';
export { signs };

export const getAllSigns = (): NESign[] => [...signs];

export const getSign = (id: string): NESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NECategory): NESign[] =>
  signs.filter((s) => s.category === category);
