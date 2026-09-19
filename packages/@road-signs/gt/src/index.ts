import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GTCategory, GTSign } from './types';
import { signs } from './signs.generated';

export type { GTCategory, GTSign } from './types';
export { signs };

export const getAllSigns = (): GTSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GTSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GTSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GTCategory): GTSign[] =>
  coreGetSignsByCategory(signs, category);
