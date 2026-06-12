import type { NRCategory, NRSign } from './types';
import { signs } from './signs.generated';

export type { NRCategory, NRSign } from './types';
export { signs };

export const getAllSigns = (): NRSign[] => [...signs];

export const getSign = (id: string): NRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NRCategory): NRSign[] =>
  signs.filter((s) => s.category === category);
