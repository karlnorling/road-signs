import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GNCategory, GNSign } from './types';
import { signs } from './signs.generated';

export type { GNCategory, GNSign } from './types';
export { signs };

export const getAllSigns = (): GNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GNCategory): GNSign[] =>
  coreGetSignsByCategory(signs, category);
