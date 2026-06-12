import type { SVCategory, SVSign } from './types';
import { signs } from './signs.generated';

export type { SVCategory, SVSign } from './types';
export { signs };

export const getAllSigns = (): SVSign[] => [...signs];

export const getSign = (id: string): SVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SVCategory): SVSign[] =>
  signs.filter((s) => s.category === category);
