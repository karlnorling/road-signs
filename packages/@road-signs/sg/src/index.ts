import type { SGCategory, SGSign } from './types.js';
import { signs } from './signs.generated.js';

export type { SGCategory, SGSign } from './types.js';
export { signs };

export const getAllSigns = (): SGSign[] => [...signs];

export const getSign = (id: string): SGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SGCategory): SGSign[] =>
  signs.filter((s) => s.category === category);
