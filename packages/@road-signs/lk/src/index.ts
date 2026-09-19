import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LKCategory, LKSign } from './types';
import { signs } from './signs.generated';

export type { LKCategory, LKSign } from './types';
export { signs };

export const getAllSigns = (): LKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LKCategory): LKSign[] =>
  coreGetSignsByCategory(signs, category);
