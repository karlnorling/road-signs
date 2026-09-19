import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MRCategory, MRSign } from './types';
import { signs } from './signs.generated';

export type { MRCategory, MRSign } from './types';
export { signs };

export const getAllSigns = (): MRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MRCategory): MRSign[] =>
  coreGetSignsByCategory(signs, category);
