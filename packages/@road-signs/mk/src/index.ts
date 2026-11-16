import type { MKCategory, MKSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MKCategory, MKSign } from './types.js';
export { signs };

export const getAllSigns = (): MKSign[] => [...signs];

export const getSign = (id: string): MKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MKCategory): MKSign[] =>
  signs.filter((s) => s.category === category);
