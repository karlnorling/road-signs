import type { CVCategory, CVSign } from './types.js';
import { signs } from './signs.generated.js';

export type { CVCategory, CVSign } from './types.js';
export { signs };

export const getAllSigns = (): CVSign[] => [...signs];

export const getSign = (id: string): CVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CVCategory): CVSign[] =>
  signs.filter((s) => s.category === category);
