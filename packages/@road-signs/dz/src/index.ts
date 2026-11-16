import type { DZCategory, DZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { DZCategory, DZSign } from './types.js';
export { signs };

export const getAllSigns = (): DZSign[] => [...signs];

export const getSign = (id: string): DZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DZCategory): DZSign[] =>
  signs.filter((s) => s.category === category);
