import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CVCategory, CVSign } from './types';
import { signs } from './signs.generated';

export type { CVCategory, CVSign } from './types';
export { signs };

export const getAllSigns = (): CVSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CVSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CVSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CVCategory): CVSign[] =>
  coreGetSignsByCategory(signs, category);
