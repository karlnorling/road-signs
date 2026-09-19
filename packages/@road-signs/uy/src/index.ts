import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { UYCategory, UYSign } from './types';
import { signs } from './signs.generated';

export type { UYCategory, UYSign } from './types';
export { signs };

export const getAllSigns = (): UYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): UYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): UYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: UYCategory): UYSign[] =>
  coreGetSignsByCategory(signs, category);
