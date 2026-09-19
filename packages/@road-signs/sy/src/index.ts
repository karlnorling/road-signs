import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SYCategory, SYSign } from './types';
import { signs } from './signs.generated';

export type { SYCategory, SYSign } from './types';
export { signs };

export const getAllSigns = (): SYSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SYSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SYSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SYCategory): SYSign[] =>
  coreGetSignsByCategory(signs, category);
