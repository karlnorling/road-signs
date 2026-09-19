import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { DMCategory, DMSign } from './types';
import { signs } from './signs.generated';

export type { DMCategory, DMSign } from './types';
export { signs };

export const getAllSigns = (): DMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): DMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): DMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: DMCategory): DMSign[] =>
  coreGetSignsByCategory(signs, category);
