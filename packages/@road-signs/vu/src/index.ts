import type { VUCategory, VUSign } from './types';
import { signs } from './signs.generated';

export type { VUCategory, VUSign } from './types';
export { signs };

export const getAllSigns = (): VUSign[] => [...signs];

export const getSign = (id: string): VUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): VUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: VUCategory): VUSign[] =>
  signs.filter((s) => s.category === category);
