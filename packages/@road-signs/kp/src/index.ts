import type { KPCategory, KPSign } from './types';
import { signs } from './signs.generated';

export type { KPCategory, KPSign } from './types';
export { signs };

export const getAllSigns = (): KPSign[] => [...signs];

export const getSign = (id: string): KPSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KPSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KPCategory): KPSign[] =>
  signs.filter((s) => s.category === category);
