import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LCCategory, LCSign } from './types';
import { signs } from './signs.generated';

export type { LCCategory, LCSign } from './types';
export { signs };

export const getAllSigns = (): LCSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LCSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LCSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LCCategory): LCSign[] =>
  coreGetSignsByCategory(signs, category);
