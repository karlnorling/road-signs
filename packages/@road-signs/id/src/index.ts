import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { IDCategory, IDSign } from './types';
import { signs } from './signs.generated';

export type { IDCategory, IDSign } from './types';
export { signs };

export const getAllSigns = (): IDSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): IDSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): IDSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: IDCategory): IDSign[] =>
  coreGetSignsByCategory(signs, category);
