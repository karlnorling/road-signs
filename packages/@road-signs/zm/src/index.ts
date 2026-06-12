import type { ZMCategory, ZMSign } from './types';
import { signs } from './signs.generated';

export type { ZMCategory, ZMSign } from './types';
export { signs };

export const getAllSigns = (): ZMSign[] => [...signs];

export const getSign = (id: string): ZMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ZMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ZMCategory): ZMSign[] =>
  signs.filter((s) => s.category === category);
