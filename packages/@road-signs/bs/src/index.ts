import type { BSCategory, BSSign } from './types';
import { signs } from './signs.generated';

export type { BSCategory, BSSign } from './types';
export { signs };

export const getAllSigns = (): BSSign[] => [...signs];

export const getSign = (id: string): BSSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BSSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BSCategory): BSSign[] =>
  signs.filter((s) => s.category === category);
