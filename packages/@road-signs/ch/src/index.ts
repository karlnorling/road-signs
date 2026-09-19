import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CHCategory, CHSign } from './types';
import { signs } from './signs.generated';

export type { CHCategory, CHSign } from './types';
export { signs };

export const getAllSigns = (): CHSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CHSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CHSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CHCategory): CHSign[] =>
  coreGetSignsByCategory(signs, category);
