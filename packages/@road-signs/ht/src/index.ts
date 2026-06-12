import type { HTCategory, HTSign } from './types';
import { signs } from './signs.generated';

export type { HTCategory, HTSign } from './types';
export { signs };

export const getAllSigns = (): HTSign[] => [...signs];

export const getSign = (id: string): HTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): HTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: HTCategory): HTSign[] =>
  signs.filter((s) => s.category === category);
