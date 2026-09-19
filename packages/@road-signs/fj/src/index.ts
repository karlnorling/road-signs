import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { FJCategory, FJSign } from './types';
import { signs } from './signs.generated';

export type { FJCategory, FJSign } from './types';
export { signs };

export const getAllSigns = (): FJSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): FJSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): FJSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: FJCategory): FJSign[] =>
  coreGetSignsByCategory(signs, category);
