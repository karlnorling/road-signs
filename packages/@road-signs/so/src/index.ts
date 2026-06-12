import type { SOCategory, SOSign } from './types';
import { signs } from './signs.generated';

export type { SOCategory, SOSign } from './types';
export { signs };

export const getAllSigns = (): SOSign[] => [...signs];

export const getSign = (id: string): SOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SOCategory): SOSign[] =>
  signs.filter((s) => s.category === category);
