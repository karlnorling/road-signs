import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TLCategory, TLSign } from './types';
import { signs } from './signs.generated';

export type { TLCategory, TLSign } from './types';
export { signs };

export const getAllSigns = (): TLSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TLSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TLSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TLCategory): TLSign[] =>
  coreGetSignsByCategory(signs, category);
