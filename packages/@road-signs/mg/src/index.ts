import type { MGCategory, MGSign } from './types';
import { signs } from './signs.generated';

export type { MGCategory, MGSign } from './types';
export { signs };

export const getAllSigns = (): MGSign[] => [...signs];

export const getSign = (id: string): MGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MGCategory): MGSign[] =>
  signs.filter((s) => s.category === category);
