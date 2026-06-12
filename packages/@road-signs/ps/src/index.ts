import type { PSCategory, PSSign } from './types';
import { signs } from './signs.generated';

export type { PSCategory, PSSign } from './types';
export { signs };

export const getAllSigns = (): PSSign[] => [...signs];

export const getSign = (id: string): PSSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PSSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PSCategory): PSSign[] =>
  signs.filter((s) => s.category === category);
