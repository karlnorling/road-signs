import type { QACategory, QASign } from './types';
import { signs } from './signs.generated';

export type { QACategory, QASign } from './types';
export { signs };

export const getAllSigns = (): QASign[] => [...signs];

export const getSign = (id: string): QASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): QASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: QACategory): QASign[] =>
  signs.filter((s) => s.category === category);
