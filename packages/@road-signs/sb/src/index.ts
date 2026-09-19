import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SBCategory, SBSign } from './types';
import { signs } from './signs.generated';

export type { SBCategory, SBSign } from './types';
export { signs };

export const getAllSigns = (): SBSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SBSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SBSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SBCategory): SBSign[] =>
  coreGetSignsByCategory(signs, category);
