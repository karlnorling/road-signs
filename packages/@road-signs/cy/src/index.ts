import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CYCategory, CYSign } from './types';
import { signs } from './signs.generated';

export type { CYCategory, CYSign } from './types';
export { signs };

export const getAllSigns = (): CYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CYCategory): CYSign[] =>
  coreGetSignsByCategory(signs, category);
