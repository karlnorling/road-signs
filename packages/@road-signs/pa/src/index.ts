import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PACategory, PASign } from './types';
import { signs } from './signs.generated';

export type { PACategory, PASign } from './types';
export { signs };

export const getAllSigns = (): PASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PACategory): PASign[] =>
  coreGetSignsByCategory(signs, category);
