import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GRCategory, GRSign } from './types';
import { signs } from './signs.generated';

export type { GRCategory, GRSign } from './types';
export { signs };

export const getAllSigns = (): GRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GRCategory): GRSign[] =>
  coreGetSignsByCategory(signs, category);
