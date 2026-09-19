import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KNCategory, KNSign } from './types';
import { signs } from './signs.generated';

export type { KNCategory, KNSign } from './types';
export { signs };

export const getAllSigns = (): KNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KNCategory): KNSign[] =>
  coreGetSignsByCategory(signs, category);
