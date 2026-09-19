import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MKCategory, MKSign } from './types';
import { signs } from './signs.generated';

export type { MKCategory, MKSign } from './types';
export { signs };

export const getAllSigns = (): MKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MKCategory): MKSign[] =>
  coreGetSignsByCategory(signs, category);
