import type { MXCategory, MXSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MXCategory, MXSign } from './types.js';
export { signs };

export const getAllSigns = (): MXSign[] => [...signs];

export const getSign = (id: string): MXSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MXSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MXCategory): MXSign[] =>
  signs.filter((s) => s.category === category);
