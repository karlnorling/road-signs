import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { HUCategory, HUSign } from './types';
import { signs } from './signs.generated';

export type { HUCategory, HUSign } from './types';
export { signs };

export const getAllSigns = (): HUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): HUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): HUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: HUCategory): HUSign[] =>
  coreGetSignsByCategory(signs, category);
