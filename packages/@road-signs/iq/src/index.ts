import type { IQCategory, IQSign } from './types';
import { signs } from './signs.generated';

export type { IQCategory, IQSign } from './types';
export { signs };

export const getAllSigns = (): IQSign[] => [...signs];

export const getSign = (id: string): IQSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): IQSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: IQCategory): IQSign[] =>
  signs.filter((s) => s.category === category);
