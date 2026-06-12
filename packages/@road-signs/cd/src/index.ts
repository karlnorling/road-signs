import type { CDCategory, CDSign } from './types';
import { signs } from './signs.generated';

export type { CDCategory, CDSign } from './types';
export { signs };

export const getAllSigns = (): CDSign[] => [...signs];

export const getSign = (id: string): CDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CDCategory): CDSign[] =>
  signs.filter((s) => s.category === category);
