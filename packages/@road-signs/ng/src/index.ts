import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NGCategory, NGSign } from './types';
import { signs } from './signs.generated';

export type { NGCategory, NGSign } from './types';
export { signs };

export const getAllSigns = (): NGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NGCategory): NGSign[] =>
  coreGetSignsByCategory(signs, category);
