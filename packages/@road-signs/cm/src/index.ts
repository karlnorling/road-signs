import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CMCategory, CMSign } from './types';
import { signs } from './signs.generated';

export type { CMCategory, CMSign } from './types';
export { signs };

export const getAllSigns = (): CMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CMCategory): CMSign[] =>
  coreGetSignsByCategory(signs, category);
