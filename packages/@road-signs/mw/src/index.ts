import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MWCategory, MWSign } from './types';
import { signs } from './signs.generated';

export type { MWCategory, MWSign } from './types';
export { signs };

export const getAllSigns = (): MWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MWCategory): MWSign[] =>
  coreGetSignsByCategory(signs, category);
