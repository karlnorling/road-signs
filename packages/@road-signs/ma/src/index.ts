import type { MACategory, MASign } from './types';
import { signs } from './signs.generated';

export type { MACategory, MASign } from './types';
export { signs };

export const getAllSigns = (): MASign[] => [...signs];

export const getSign = (id: string): MASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MACategory): MASign[] =>
  signs.filter((s) => s.category === category);
