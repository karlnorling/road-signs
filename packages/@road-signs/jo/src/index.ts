import type { JOCategory, JOSign } from './types';
import { signs } from './signs.generated';

export type { JOCategory, JOSign } from './types';
export { signs };

export const getAllSigns = (): JOSign[] => [...signs];

export const getSign = (id: string): JOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): JOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: JOCategory): JOSign[] =>
  signs.filter((s) => s.category === category);
