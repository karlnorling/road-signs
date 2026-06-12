import type { NICategory, NISign } from './types';
import { signs } from './signs.generated';

export type { NICategory, NISign } from './types';
export { signs };

export const getAllSigns = (): NISign[] => [...signs];

export const getSign = (id: string): NISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NICategory): NISign[] =>
  signs.filter((s) => s.category === category);
