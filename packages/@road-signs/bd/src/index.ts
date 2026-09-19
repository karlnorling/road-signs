import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BDCategory, BDSign } from './types';
import { signs } from './signs.generated';

export type { BDCategory, BDSign } from './types';
export { signs };

export const getAllSigns = (): BDSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BDSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BDSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BDCategory): BDSign[] =>
  coreGetSignsByCategory(signs, category);
