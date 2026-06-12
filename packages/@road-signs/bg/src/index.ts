import type { BGCategory, BGSign } from './types';
import { signs } from './signs.generated';

export type { BGCategory, BGSign } from './types';
export { signs };

export const getAllSigns = (): BGSign[] => [...signs];

export const getSign = (id: string): BGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BGCategory): BGSign[] =>
  signs.filter((s) => s.category === category);
