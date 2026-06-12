import type { CNCategory, CNSign } from './types';
import { signs } from './signs.generated';

export type { CNCategory, CNSign } from './types';
export { signs };

export const getAllSigns = (): CNSign[] => [...signs];

export const getSign = (id: string): CNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CNCategory): CNSign[] =>
  signs.filter((s) => s.category === category);
