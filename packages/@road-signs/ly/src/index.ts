import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LYCategory, LYSign } from './types';
import { signs } from './signs.generated';

export type { LYCategory, LYSign } from './types';
export { signs };

export const getAllSigns = (): LYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LYCategory): LYSign[] =>
  coreGetSignsByCategory(signs, category);
