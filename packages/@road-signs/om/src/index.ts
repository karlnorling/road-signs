import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { OMCategory, OMSign } from './types';
import { signs } from './signs.generated';

export type { OMCategory, OMSign } from './types';
export { signs };

export const getAllSigns = (): OMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): OMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): OMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: OMCategory): OMSign[] =>
  coreGetSignsByCategory(signs, category);
