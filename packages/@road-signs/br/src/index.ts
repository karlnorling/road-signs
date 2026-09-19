import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BRCategory, BRSign } from './types';
import { signs } from './signs.generated';

export type { BRCategory, BRSign } from './types';
export { signs };

export const getAllSigns = (): BRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BRCategory): BRSign[] =>
  coreGetSignsByCategory(signs, category);
