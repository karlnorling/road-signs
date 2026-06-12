import type { SMCategory, SMSign } from './types';
import { signs } from './signs.generated';

export type { SMCategory, SMSign } from './types';
export { signs };

export const getAllSigns = (): SMSign[] => [...signs];

export const getSign = (id: string): SMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SMCategory): SMSign[] =>
  signs.filter((s) => s.category === category);
