import type { AOCategory, AOSign } from './types';
import { signs } from './signs.generated';

export type { AOCategory, AOSign } from './types';
export { signs };

export const getAllSigns = (): AOSign[] => [...signs];

export const getSign = (id: string): AOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AOCategory): AOSign[] =>
  signs.filter((s) => s.category === category);
