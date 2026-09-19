import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LRCategory, LRSign } from './types';
import { signs } from './signs.generated';

export type { LRCategory, LRSign } from './types';
export { signs };

export const getAllSigns = (): LRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LRCategory): LRSign[] =>
  coreGetSignsByCategory(signs, category);
