import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MHCategory, MHSign } from './types';
import { signs } from './signs.generated';

export type { MHCategory, MHSign } from './types';
export { signs };

export const getAllSigns = (): MHSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MHSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MHSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MHCategory): MHSign[] =>
  coreGetSignsByCategory(signs, category);
