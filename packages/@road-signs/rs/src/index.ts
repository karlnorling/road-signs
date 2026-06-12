import type { RSCategory, RSSign } from './types';
import { signs } from './signs.generated';

export type { RSCategory, RSSign } from './types';
export { signs };

export const getAllSigns = (): RSSign[] => [...signs];

export const getSign = (id: string): RSSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): RSSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: RSCategory): RSSign[] =>
  signs.filter((s) => s.category === category);
