import type { SCCategory, SCSign } from './types';
import { signs } from './signs.generated';

export type { SCCategory, SCSign } from './types';
export { signs };

export const getAllSigns = (): SCSign[] => [...signs];

export const getSign = (id: string): SCSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SCSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SCCategory): SCSign[] =>
  signs.filter((s) => s.category === category);
