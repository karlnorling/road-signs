import type { BBCategory, BBSign } from './types';
import { signs } from './signs.generated';

export type { BBCategory, BBSign } from './types';
export { signs };

export const getAllSigns = (): BBSign[] => [...signs];

export const getSign = (id: string): BBSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BBSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BBCategory): BBSign[] =>
  signs.filter((s) => s.category === category);
