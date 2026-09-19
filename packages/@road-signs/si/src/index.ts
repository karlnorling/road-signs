import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SICategory, SISign } from './types';
import { signs } from './signs.generated';

export type { SICategory, SISign } from './types';
export { signs };

export const getAllSigns = (): SISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SICategory): SISign[] =>
  coreGetSignsByCategory(signs, category);
