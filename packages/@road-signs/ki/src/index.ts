import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KICategory, KISign } from './types';
import { signs } from './signs.generated';

export type { KICategory, KISign } from './types';
export { signs };

export const getAllSigns = (): KISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KICategory): KISign[] =>
  coreGetSignsByCategory(signs, category);
