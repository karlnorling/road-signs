import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MACategory, MASign } from './types';
import { signs } from './signs.generated';

export type { MACategory, MASign } from './types';
export { signs };

export const getAllSigns = (): MASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MACategory): MASign[] =>
  coreGetSignsByCategory(signs, category);
