import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GYCategory, GYSign } from './types';
import { signs } from './signs.generated';

export type { GYCategory, GYSign } from './types';
export { signs };

export const getAllSigns = (): GYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GYCategory): GYSign[] =>
  coreGetSignsByCategory(signs, category);
