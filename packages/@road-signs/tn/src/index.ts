import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TNCategory, TNSign } from './types';
import { signs } from './signs.generated';

export type { TNCategory, TNSign } from './types';
export { signs };

export const getAllSigns = (): TNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TNCategory): TNSign[] =>
  coreGetSignsByCategory(signs, category);
