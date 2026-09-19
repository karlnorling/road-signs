import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GMCategory, GMSign } from './types';
import { signs } from './signs.generated';

export type { GMCategory, GMSign } from './types';
export { signs };

export const getAllSigns = (): GMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GMCategory): GMSign[] =>
  coreGetSignsByCategory(signs, category);
