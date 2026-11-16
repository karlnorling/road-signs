import type { LCCategory, LCSign } from './types.js';
import { signs } from './signs.generated.js';

export type { LCCategory, LCSign } from './types.js';
export { signs };

export const getAllSigns = (): LCSign[] => [...signs];

export const getSign = (id: string): LCSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LCSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LCCategory): LCSign[] =>
  signs.filter((s) => s.category === category);
