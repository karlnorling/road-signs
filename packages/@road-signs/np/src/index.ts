import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NPCategory, NPSign } from './types';
import { signs } from './signs.generated';

export type { NPCategory, NPSign } from './types';
export { signs };

export const getAllSigns = (): NPSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NPSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NPSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NPCategory): NPSign[] =>
  coreGetSignsByCategory(signs, category);
