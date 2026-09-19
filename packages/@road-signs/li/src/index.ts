import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LICategory, LISign } from './types';
import { signs } from './signs.generated';

export type { LICategory, LISign } from './types';
export { signs };

export const getAllSigns = (): LISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LICategory): LISign[] =>
  coreGetSignsByCategory(signs, category);
