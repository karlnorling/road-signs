import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NOCategory, NOSign } from './types';
import { signs } from './signs.generated';

export type { NOCategory, NOSign } from './types';
export { signs };

export const getAllSigns = (): NOSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NOSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NOSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NOCategory): NOSign[] =>
  coreGetSignsByCategory(signs, category);
