import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MDCategory, MDSign } from './types';
import { signs } from './signs.generated';

export type { MDCategory, MDSign } from './types';
export { signs };

export const getAllSigns = (): MDSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MDSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MDSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MDCategory): MDSign[] =>
  coreGetSignsByCategory(signs, category);
