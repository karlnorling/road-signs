import type { SECategory, SESign } from './types';
import { signs } from './signs.generated';

export type { SECategory, SESign } from './types';
export { signs };

export const getAllSigns = (): SESign[] => [...signs];

export const getSign = (id: string): SESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SECategory): SESign[] =>
  signs.filter((s) => s.category === category);
