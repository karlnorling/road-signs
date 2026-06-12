import type { SSCategory, SSSign } from './types';
import { signs } from './signs.generated';

export type { SSCategory, SSSign } from './types';
export { signs };

export const getAllSigns = (): SSSign[] => [...signs];

export const getSign = (id: string): SSSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SSSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SSCategory): SSSign[] =>
  signs.filter((s) => s.category === category);
