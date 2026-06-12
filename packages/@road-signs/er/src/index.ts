import type { ERCategory, ERSign } from './types';
import { signs } from './signs.generated';

export type { ERCategory, ERSign } from './types';
export { signs };

export const getAllSigns = (): ERSign[] => [...signs];

export const getSign = (id: string): ERSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ERSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ERCategory): ERSign[] =>
  signs.filter((s) => s.category === category);
