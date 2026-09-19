import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MYCategory, MYSign } from './types';
import { signs } from './signs.generated';

export type { MYCategory, MYSign } from './types';
export { signs };

export const getAllSigns = (): MYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MYCategory): MYSign[] =>
  coreGetSignsByCategory(signs, category);
