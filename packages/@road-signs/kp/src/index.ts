import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KPCategory, KPSign } from './types';
import { signs } from './signs.generated';

export type { KPCategory, KPSign } from './types';
export { signs };

export const getAllSigns = (): KPSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KPSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KPSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KPCategory): KPSign[] =>
  coreGetSignsByCategory(signs, category);
