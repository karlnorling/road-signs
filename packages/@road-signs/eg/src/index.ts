import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { EGCategory, EGSign } from './types';
import { signs } from './signs.generated';

export type { EGCategory, EGSign } from './types';
export { signs };

export const getAllSigns = (): EGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): EGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): EGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: EGCategory): EGSign[] =>
  coreGetSignsByCategory(signs, category);
