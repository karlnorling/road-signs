import type { CLCategory, CLSign } from './types';
import { signs } from './signs.generated';

export type { CLCategory, CLSign } from './types';
export { signs };

export const getAllSigns = (): CLSign[] => [...signs];

export const getSign = (id: string): CLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CLCategory): CLSign[] =>
  signs.filter((s) => s.category === category);
