import type { AZCategory, AZSign } from './types';
import { signs } from './signs.generated';

export type { AZCategory, AZSign } from './types';
export { signs };

export const getAllSigns = (): AZSign[] => [...signs];

export const getSign = (id: string): AZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AZCategory): AZSign[] =>
  signs.filter((s) => s.category === category);
