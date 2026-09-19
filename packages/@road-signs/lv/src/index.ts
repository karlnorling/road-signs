import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LVCategory, LVSign } from './types';
import { signs } from './signs.generated';

export type { LVCategory, LVSign } from './types';
export { signs };

export const getAllSigns = (): LVSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LVSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LVSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LVCategory): LVSign[] =>
  coreGetSignsByCategory(signs, category);
