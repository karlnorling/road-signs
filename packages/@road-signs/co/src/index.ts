import type { COCategory, COSign } from './types';
import { signs } from './signs.generated';

export type { COCategory, COSign } from './types';
export { signs };

export const getAllSigns = (): COSign[] => [...signs];

export const getSign = (id: string): COSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): COSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: COCategory): COSign[] =>
  signs.filter((s) => s.category === category);
