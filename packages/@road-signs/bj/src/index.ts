import type { BJCategory, BJSign } from './types';
import { signs } from './signs.generated';

export type { BJCategory, BJSign } from './types';
export { signs };

export const getAllSigns = (): BJSign[] => [...signs];

export const getSign = (id: string): BJSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BJSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BJCategory): BJSign[] =>
  signs.filter((s) => s.category === category);
