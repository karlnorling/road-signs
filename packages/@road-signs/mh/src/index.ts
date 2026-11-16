import type { MHCategory, MHSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MHCategory, MHSign } from './types.js';
export { signs };

export const getAllSigns = (): MHSign[] => [...signs];

export const getSign = (id: string): MHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MHCategory): MHSign[] =>
  signs.filter((s) => s.category === category);
