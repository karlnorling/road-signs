import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AGCategory, AGSign } from './types';
import { signs } from './signs.generated';

export type { AGCategory, AGSign } from './types';
export { signs };

export const getAllSigns = (): AGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AGCategory): AGSign[] =>
  coreGetSignsByCategory(signs, category);
