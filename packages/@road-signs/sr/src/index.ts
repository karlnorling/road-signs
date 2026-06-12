import type { SRCategory, SRSign } from './types';
import { signs } from './signs.generated';

export type { SRCategory, SRSign } from './types';
export { signs };

export const getAllSigns = (): SRSign[] => [...signs];

export const getSign = (id: string): SRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SRCategory): SRSign[] =>
  signs.filter((s) => s.category === category);
