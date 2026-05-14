import type { USCategory, USSign } from './types';
import { signs } from './signs.generated';

export type { USCategory, USSign } from './types';
export { signs };

export const getAllSigns = (): USSign[] => [...signs];

export const getSign = (id: string): USSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): USSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: USCategory): USSign[] =>
  signs.filter((s) => s.category === category);
