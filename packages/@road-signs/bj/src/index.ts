import type { BJCategory, BJSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BJCategory, BJSign } from './types.js';
export { signs };

export const getAllSigns = (): BJSign[] => [...signs];

export const getSign = (id: string): BJSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BJSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BJCategory): BJSign[] =>
  signs.filter((s) => s.category === category);
