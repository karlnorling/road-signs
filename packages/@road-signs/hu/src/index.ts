import type { HUCategory, HUSign } from './types';
import { signs } from './signs.generated';

export type { HUCategory, HUSign } from './types';
export { signs };

export const getAllSigns = (): HUSign[] => [...signs];

export const getSign = (id: string): HUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): HUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: HUCategory): HUSign[] =>
  signs.filter((s) => s.category === category);
