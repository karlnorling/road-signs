import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MCCategory, MCSign } from './types';
import { signs } from './signs.generated';

export type { MCCategory, MCSign } from './types';
export { signs };

export const getAllSigns = (): MCSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MCSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MCSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MCCategory): MCSign[] =>
  coreGetSignsByCategory(signs, category);
