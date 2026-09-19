import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GQCategory, GQSign } from './types';
import { signs } from './signs.generated';

export type { GQCategory, GQSign } from './types';
export { signs };

export const getAllSigns = (): GQSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GQSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GQSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GQCategory): GQSign[] =>
  coreGetSignsByCategory(signs, category);
