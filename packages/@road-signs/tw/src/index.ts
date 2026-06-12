import type { TWCategory, TWSign } from './types';
import { signs } from './signs.generated';

export type { TWCategory, TWSign } from './types';
export { signs };

export const getAllSigns = (): TWSign[] => [...signs];

export const getSign = (id: string): TWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TWCategory): TWSign[] =>
  signs.filter((s) => s.category === category);
