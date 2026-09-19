import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ADCategory, ADSign } from './types';
import { signs } from './signs.generated';

export type { ADCategory, ADSign } from './types';
export { signs };

export const getAllSigns = (): ADSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ADSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ADSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ADCategory): ADSign[] =>
  coreGetSignsByCategory(signs, category);
