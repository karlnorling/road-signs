import type { OMCategory, OMSign } from './types.js';
import { signs } from './signs.generated.js';

export type { OMCategory, OMSign } from './types.js';
export { signs };

export const getAllSigns = (): OMSign[] => [...signs];

export const getSign = (id: string): OMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): OMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: OMCategory): OMSign[] =>
  signs.filter((s) => s.category === category);
