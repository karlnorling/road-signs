import type { KPCategory, KPSign } from './types.js';
import { signs } from './signs.generated.js';

export type { KPCategory, KPSign } from './types.js';
export { signs };

export const getAllSigns = (): KPSign[] => [...signs];

export const getSign = (id: string): KPSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KPSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KPCategory): KPSign[] =>
  signs.filter((s) => s.category === category);
