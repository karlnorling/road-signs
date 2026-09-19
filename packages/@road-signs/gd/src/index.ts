import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GDCategory, GDSign } from './types';
import { signs } from './signs.generated';

export type { GDCategory, GDSign } from './types';
export { signs };

export const getAllSigns = (): GDSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GDSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GDSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GDCategory): GDSign[] =>
  coreGetSignsByCategory(signs, category);
