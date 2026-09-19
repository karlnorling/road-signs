import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MGCategory, MGSign } from './types';
import { signs } from './signs.generated';

export type { MGCategory, MGSign } from './types';
export { signs };

export const getAllSigns = (): MGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MGCategory): MGSign[] =>
  coreGetSignsByCategory(signs, category);
