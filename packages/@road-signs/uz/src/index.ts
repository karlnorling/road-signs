import type { UZCategory, UZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { UZCategory, UZSign } from './types.js';
export { signs };

export const getAllSigns = (): UZSign[] => [...signs];

export const getSign = (id: string): UZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): UZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: UZCategory): UZSign[] =>
  signs.filter((s) => s.category === category);
