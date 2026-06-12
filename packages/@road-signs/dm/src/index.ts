import type { DMCategory, DMSign } from './types';
import { signs } from './signs.generated';

export type { DMCategory, DMSign } from './types';
export { signs };

export const getAllSigns = (): DMSign[] => [...signs];

export const getSign = (id: string): DMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DMCategory): DMSign[] =>
  signs.filter((s) => s.category === category);
