import type { NZCategory, NZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { NZCategory, NZSign } from './types.js';
export { signs };

export const getAllSigns = (): NZSign[] => [...signs];

export const getSign = (id: string): NZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NZCategory): NZSign[] =>
  signs.filter((s) => s.category === category);
