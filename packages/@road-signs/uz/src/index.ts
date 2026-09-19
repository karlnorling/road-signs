import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { UZCategory, UZSign } from './types';
import { signs } from './signs.generated';

export type { UZCategory, UZSign } from './types';
export { signs };

export const getAllSigns = (): UZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): UZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): UZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: UZCategory): UZSign[] =>
  coreGetSignsByCategory(signs, category);
