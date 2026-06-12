import type { UGCategory, UGSign } from './types';
import { signs } from './signs.generated';

export type { UGCategory, UGSign } from './types';
export { signs };

export const getAllSigns = (): UGSign[] => [...signs];

export const getSign = (id: string): UGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): UGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: UGCategory): UGSign[] =>
  signs.filter((s) => s.category === category);
