import type { SLCategory, SLSign } from './types';
import { signs } from './signs.generated';

export type { SLCategory, SLSign } from './types';
export { signs };

export const getAllSigns = (): SLSign[] => [...signs];

export const getSign = (id: string): SLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SLCategory): SLSign[] =>
  signs.filter((s) => s.category === category);
