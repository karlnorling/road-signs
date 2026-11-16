import type { CGCategory, CGSign } from './types.js';
import { signs } from './signs.generated.js';

export type { CGCategory, CGSign } from './types.js';
export { signs };

export const getAllSigns = (): CGSign[] => [...signs];

export const getSign = (id: string): CGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CGCategory): CGSign[] =>
  signs.filter((s) => s.category === category);
