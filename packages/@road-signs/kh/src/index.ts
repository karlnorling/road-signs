import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KHCategory, KHSign } from './types';
import { signs } from './signs.generated';

export type { KHCategory, KHSign } from './types';
export { signs };

export const getAllSigns = (): KHSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KHSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KHSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KHCategory): KHSign[] =>
  coreGetSignsByCategory(signs, category);
