import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GWCategory, GWSign } from './types';
import { signs } from './signs.generated';

export type { GWCategory, GWSign } from './types';
export { signs };

export const getAllSigns = (): GWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GWCategory): GWSign[] =>
  coreGetSignsByCategory(signs, category);
