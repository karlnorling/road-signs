import type { THCategory, THSign } from './types';
import { signs } from './signs.generated';

export type { THCategory, THSign } from './types';
export { signs };

export const getAllSigns = (): THSign[] => [...signs];

export const getSign = (id: string): THSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): THSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: THCategory): THSign[] =>
  signs.filter((s) => s.category === category);
