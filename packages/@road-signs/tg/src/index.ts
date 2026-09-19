import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TGCategory, TGSign } from './types';
import { signs } from './signs.generated';

export type { TGCategory, TGSign } from './types';
export { signs };

export const getAllSigns = (): TGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TGCategory): TGSign[] =>
  coreGetSignsByCategory(signs, category);
