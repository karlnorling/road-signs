import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SECategory, SESign } from './types';
import { signs } from './signs.generated';

export type { SECategory, SESign } from './types';
export { signs };

export const getAllSigns = (): SESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SECategory): SESign[] =>
  coreGetSignsByCategory(signs, category);
