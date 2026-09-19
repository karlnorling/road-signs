import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PHCategory, PHSign } from './types';
import { signs } from './signs.generated';

export type { PHCategory, PHSign } from './types';
export { signs };

export const getAllSigns = (): PHSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PHSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PHSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PHCategory): PHSign[] =>
  coreGetSignsByCategory(signs, category);
