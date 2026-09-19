import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BWCategory, BWSign } from './types';
import { signs } from './signs.generated';

export type { BWCategory, BWSign } from './types';
export { signs };

export const getAllSigns = (): BWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BWCategory): BWSign[] =>
  coreGetSignsByCategory(signs, category);
