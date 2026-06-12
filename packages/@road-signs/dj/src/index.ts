import type { DJCategory, DJSign } from './types';
import { signs } from './signs.generated';

export type { DJCategory, DJSign } from './types';
export { signs };

export const getAllSigns = (): DJSign[] => [...signs];

export const getSign = (id: string): DJSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DJSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DJCategory): DJSign[] =>
  signs.filter((s) => s.category === category);
