import type { ETCategory, ETSign } from './types';
import { signs } from './signs.generated';

export type { ETCategory, ETSign } from './types';
export { signs };

export const getAllSigns = (): ETSign[] => [...signs];

export const getSign = (id: string): ETSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ETSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ETCategory): ETSign[] =>
  signs.filter((s) => s.category === category);
