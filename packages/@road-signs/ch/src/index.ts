import type { CHCategory, CHSign } from './types';
import { signs } from './signs.generated';

export type { CHCategory, CHSign } from './types';
export { signs };

export const getAllSigns = (): CHSign[] => [...signs];

export const getSign = (id: string): CHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CHCategory): CHSign[] =>
  signs.filter((s) => s.category === category);
