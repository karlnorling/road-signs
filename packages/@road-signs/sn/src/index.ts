import type { SNCategory, SNSign } from './types';
import { signs } from './signs.generated';

export type { SNCategory, SNSign } from './types';
export { signs };

export const getAllSigns = (): SNSign[] => [...signs];

export const getSign = (id: string): SNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SNCategory): SNSign[] =>
  signs.filter((s) => s.category === category);
