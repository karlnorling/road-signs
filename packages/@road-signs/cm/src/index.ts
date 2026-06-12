import type { CMCategory, CMSign } from './types';
import { signs } from './signs.generated';

export type { CMCategory, CMSign } from './types';
export { signs };

export const getAllSigns = (): CMSign[] => [...signs];

export const getSign = (id: string): CMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CMCategory): CMSign[] =>
  signs.filter((s) => s.category === category);
