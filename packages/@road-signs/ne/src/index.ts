import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NECategory, NESign } from './types';
import { signs } from './signs.generated';

export type { NECategory, NESign } from './types';
export { signs };

export const getAllSigns = (): NESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NECategory): NESign[] =>
  coreGetSignsByCategory(signs, category);
