import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { IRCategory, IRSign } from './types';
import { signs } from './signs.generated';

export type { IRCategory, IRSign } from './types';
export { signs };

export const getAllSigns = (): IRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): IRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): IRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: IRCategory): IRSign[] =>
  coreGetSignsByCategory(signs, category);
