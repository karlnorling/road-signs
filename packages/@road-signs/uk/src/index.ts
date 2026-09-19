import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { UKCategory, UKSign } from './types';
import { signs } from './signs.generated';

export type { UKCategory, UKSign } from './types';
export { signs };

export const getAllSigns = (): UKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): UKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): UKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: UKCategory): UKSign[] =>
  coreGetSignsByCategory(signs, category);
