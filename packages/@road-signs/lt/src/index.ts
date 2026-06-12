import type { LTCategory, LTSign } from './types';
import { signs } from './signs.generated';

export type { LTCategory, LTSign } from './types';
export { signs };

export const getAllSigns = (): LTSign[] => [...signs];

export const getSign = (id: string): LTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LTCategory): LTSign[] =>
  signs.filter((s) => s.category === category);
