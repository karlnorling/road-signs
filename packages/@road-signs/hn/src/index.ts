import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { HNCategory, HNSign } from './types';
import { signs } from './signs.generated';

export type { HNCategory, HNSign } from './types';
export { signs };

export const getAllSigns = (): HNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): HNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): HNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: HNCategory): HNSign[] =>
  coreGetSignsByCategory(signs, category);
