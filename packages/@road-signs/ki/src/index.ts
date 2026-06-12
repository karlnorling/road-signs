import type { KICategory, KISign } from './types';
import { signs } from './signs.generated';

export type { KICategory, KISign } from './types';
export { signs };

export const getAllSigns = (): KISign[] => [...signs];

export const getSign = (id: string): KISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KICategory): KISign[] =>
  signs.filter((s) => s.category === category);
