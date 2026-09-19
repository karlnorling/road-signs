import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SLCategory, SLSign } from './types';
import { signs } from './signs.generated';

export type { SLCategory, SLSign } from './types';
export { signs };

export const getAllSigns = (): SLSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SLSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SLSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SLCategory): SLSign[] =>
  coreGetSignsByCategory(signs, category);
