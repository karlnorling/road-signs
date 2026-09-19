import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TJCategory, TJSign } from './types';
import { signs } from './signs.generated';

export type { TJCategory, TJSign } from './types';
export { signs };

export const getAllSigns = (): TJSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TJSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TJSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TJCategory): TJSign[] =>
  coreGetSignsByCategory(signs, category);
