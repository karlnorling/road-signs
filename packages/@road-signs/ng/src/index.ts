import type { NGCategory, NGSign } from './types';
import { signs } from './signs.generated';

export type { NGCategory, NGSign } from './types';
export { signs };

export const getAllSigns = (): NGSign[] => [...signs];

export const getSign = (id: string): NGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NGCategory): NGSign[] =>
  signs.filter((s) => s.category === category);
