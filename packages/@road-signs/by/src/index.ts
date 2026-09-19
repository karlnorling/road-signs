import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BYCategory, BYSign } from './types';
import { signs } from './signs.generated';

export type { BYCategory, BYSign } from './types';
export { signs };

export const getAllSigns = (): BYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BYCategory): BYSign[] =>
  coreGetSignsByCategory(signs, category);
