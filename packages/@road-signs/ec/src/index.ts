import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ECCategory, ECSign } from './types';
import { signs } from './signs.generated';

export type { ECCategory, ECSign } from './types';
export { signs };

export const getAllSigns = (): ECSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ECSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ECSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ECCategory): ECSign[] =>
  coreGetSignsByCategory(signs, category);
