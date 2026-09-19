import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CFCategory, CFSign } from './types';
import { signs } from './signs.generated';

export type { CFCategory, CFSign } from './types';
export { signs };

export const getAllSigns = (): CFSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CFSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CFSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CFCategory): CFSign[] =>
  coreGetSignsByCategory(signs, category);
