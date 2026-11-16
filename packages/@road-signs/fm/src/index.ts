import type { FMCategory, FMSign } from './types.js';
import { signs } from './signs.generated.js';

export type { FMCategory, FMSign } from './types.js';
export { signs };

export const getAllSigns = (): FMSign[] => [...signs];

export const getSign = (id: string): FMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): FMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: FMCategory): FMSign[] =>
  signs.filter((s) => s.category === category);
