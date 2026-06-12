import type { SKCategory, SKSign } from './types';
import { signs } from './signs.generated';

export type { SKCategory, SKSign } from './types';
export { signs };

export const getAllSigns = (): SKSign[] => [...signs];

export const getSign = (id: string): SKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SKCategory): SKSign[] =>
  signs.filter((s) => s.category === category);
