import type { DECategory, DESign } from './types';
import { signs } from './signs.generated';

export type { DECategory, DESign } from './types';
export { signs };

export const getAllSigns = (): DESign[] => [...signs];

export const getSign = (id: string): DESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DECategory): DESign[] =>
  signs.filter((s) => s.category === category);
