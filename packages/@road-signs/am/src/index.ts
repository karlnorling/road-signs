import type { AMCategory, AMSign } from './types';
import { signs } from './signs.generated';

export type { AMCategory, AMSign } from './types';
export { signs };

export const getAllSigns = (): AMSign[] => [...signs];

export const getSign = (id: string): AMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AMCategory): AMSign[] =>
  signs.filter((s) => s.category === category);
