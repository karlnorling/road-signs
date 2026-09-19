import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GHCategory, GHSign } from './types';
import { signs } from './signs.generated';

export type { GHCategory, GHSign } from './types';
export { signs };

export const getAllSigns = (): GHSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GHSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GHSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GHCategory): GHSign[] =>
  coreGetSignsByCategory(signs, category);
