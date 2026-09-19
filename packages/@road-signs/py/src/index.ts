import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PYCategory, PYSign } from './types';
import { signs } from './signs.generated';

export type { PYCategory, PYSign } from './types';
export { signs };

export const getAllSigns = (): PYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PYCategory): PYSign[] =>
  coreGetSignsByCategory(signs, category);
