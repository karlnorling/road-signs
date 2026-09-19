import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { INCategory, INSign } from './types';
import { signs } from './signs.generated';

export type { INCategory, INSign } from './types';
export { signs };

export const getAllSigns = (): INSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): INSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): INSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: INCategory): INSign[] =>
  coreGetSignsByCategory(signs, category);
