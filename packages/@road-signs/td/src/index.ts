import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TDCategory, TDSign } from './types';
import { signs } from './signs.generated';

export type { TDCategory, TDSign } from './types';
export { signs };

export const getAllSigns = (): TDSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TDSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TDSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TDCategory): TDSign[] =>
  coreGetSignsByCategory(signs, category);
