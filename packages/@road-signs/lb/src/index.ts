import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LBCategory, LBSign } from './types';
import { signs } from './signs.generated';

export type { LBCategory, LBSign } from './types';
export { signs };

export const getAllSigns = (): LBSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LBSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LBSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LBCategory): LBSign[] =>
  coreGetSignsByCategory(signs, category);
