import type { PLCategory, PLSign } from './types';
import { signs } from './signs.generated';

export type { PLCategory, PLSign } from './types';
export { signs };

export const getAllSigns = (): PLSign[] => [...signs];

export const getSign = (id: string): PLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PLCategory): PLSign[] =>
  signs.filter((s) => s.category === category);
