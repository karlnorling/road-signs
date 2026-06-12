import type { PHCategory, PHSign } from './types';
import { signs } from './signs.generated';

export type { PHCategory, PHSign } from './types';
export { signs };

export const getAllSigns = (): PHSign[] => [...signs];

export const getSign = (id: string): PHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PHCategory): PHSign[] =>
  signs.filter((s) => s.category === category);
