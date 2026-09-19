import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { HRCategory, HRSign } from './types';
import { signs } from './signs.generated';

export type { HRCategory, HRSign } from './types';
export { signs };

export const getAllSigns = (): HRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): HRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): HRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: HRCategory): HRSign[] =>
  coreGetSignsByCategory(signs, category);
