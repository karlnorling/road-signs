import type { AGCategory, AGSign } from './types';
import { signs } from './signs.generated';

export type { AGCategory, AGSign } from './types';
export { signs };

export const getAllSigns = (): AGSign[] => [...signs];

export const getSign = (id: string): AGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AGCategory): AGSign[] =>
  signs.filter((s) => s.category === category);
