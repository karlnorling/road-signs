import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { DOCategory, DOSign } from './types';
import { signs } from './signs.generated';

export type { DOCategory, DOSign } from './types';
export { signs };

export const getAllSigns = (): DOSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): DOSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): DOSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: DOCategory): DOSign[] =>
  coreGetSignsByCategory(signs, category);
