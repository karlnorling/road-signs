import type { GNCategory, GNSign } from './types';
import { signs } from './signs.generated';

export type { GNCategory, GNSign } from './types';
export { signs };

export const getAllSigns = (): GNSign[] => [...signs];

export const getSign = (id: string): GNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GNCategory): GNSign[] =>
  signs.filter((s) => s.category === category);
