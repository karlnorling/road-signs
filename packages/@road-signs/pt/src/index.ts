import type { PTCategory, PTSign } from './types';
import { signs } from './signs.generated';

export type { PTCategory, PTSign } from './types';
export { signs };

export const getAllSigns = (): PTSign[] => [...signs];

export const getSign = (id: string): PTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PTCategory): PTSign[] =>
  signs.filter((s) => s.category === category);
