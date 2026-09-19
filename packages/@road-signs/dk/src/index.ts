import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { DKCategory, DKSign } from './types';
import { signs } from './signs.generated';

export type { DKCategory, DKSign } from './types';
export { signs };

export const getAllSigns = (): DKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): DKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): DKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: DKCategory): DKSign[] =>
  coreGetSignsByCategory(signs, category);
