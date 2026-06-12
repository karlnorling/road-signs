import type { MECategory, MESign } from './types';
import { signs } from './signs.generated';

export type { MECategory, MESign } from './types';
export { signs };

export const getAllSigns = (): MESign[] => [...signs];

export const getSign = (id: string): MESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MECategory): MESign[] =>
  signs.filter((s) => s.category === category);
