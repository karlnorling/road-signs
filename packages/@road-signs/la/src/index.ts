import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LACategory, LASign } from './types';
import { signs } from './signs.generated';

export type { LACategory, LASign } from './types';
export { signs };

export const getAllSigns = (): LASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LACategory): LASign[] =>
  coreGetSignsByCategory(signs, category);
