import type { CVCategory, CVSign } from './types';
import { signs } from './signs.generated';

export type { CVCategory, CVSign } from './types';
export { signs };

export const getAllSigns = (): CVSign[] => [...signs];

export const getSign = (id: string): CVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CVCategory): CVSign[] =>
  signs.filter((s) => s.category === category);
