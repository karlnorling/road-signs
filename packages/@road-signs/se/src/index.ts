import type { SECategory, SESign } from './types.js';
import { signs } from './signs.generated.js';

export type { SECategory, SESign } from './types.js';
export { signs };

export const getAllSigns = (): SESign[] => [...signs];

export const getSign = (id: string): SESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SECategory): SESign[] =>
  signs.filter((s) => s.category === category);
