import type { BACategory, BASign } from './types';
import { signs } from './signs.generated';

export type { BACategory, BASign } from './types';
export { signs };

export const getAllSigns = (): BASign[] => [...signs];

export const getSign = (id: string): BASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BACategory): BASign[] =>
  signs.filter((s) => s.category === category);
