import type { LACategory, LASign } from './types';
import { signs } from './signs.generated';

export type { LACategory, LASign } from './types';
export { signs };

export const getAllSigns = (): LASign[] => [...signs];

export const getSign = (id: string): LASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LACategory): LASign[] =>
  signs.filter((s) => s.category === category);
