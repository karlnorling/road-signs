import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LUCategory, LUSign } from './types';
import { signs } from './signs.generated';

export type { LUCategory, LUSign } from './types';
export { signs };

export const getAllSigns = (): LUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LUCategory): LUSign[] =>
  coreGetSignsByCategory(signs, category);
