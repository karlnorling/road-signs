import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SVCategory, SVSign } from './types';
import { signs } from './signs.generated';

export type { SVCategory, SVSign } from './types';
export { signs };

export const getAllSigns = (): SVSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SVSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SVSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SVCategory): SVSign[] =>
  coreGetSignsByCategory(signs, category);
