import type { OMCategory, OMSign } from './types';
import { signs } from './signs.generated';

export type { OMCategory, OMSign } from './types';
export { signs };

export const getAllSigns = (): OMSign[] => [...signs];

export const getSign = (id: string): OMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): OMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: OMCategory): OMSign[] =>
  signs.filter((s) => s.category === category);
