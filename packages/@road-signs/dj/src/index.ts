import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { DJCategory, DJSign } from './types';
import { signs } from './signs.generated';

export type { DJCategory, DJSign } from './types';
export { signs };

export const getAllSigns = (): DJSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): DJSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): DJSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: DJCategory): DJSign[] =>
  coreGetSignsByCategory(signs, category);
