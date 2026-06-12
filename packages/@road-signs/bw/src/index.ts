import type { BWCategory, BWSign } from './types';
import { signs } from './signs.generated';

export type { BWCategory, BWSign } from './types';
export { signs };

export const getAllSigns = (): BWSign[] => [...signs];

export const getSign = (id: string): BWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BWCategory): BWSign[] =>
  signs.filter((s) => s.category === category);
