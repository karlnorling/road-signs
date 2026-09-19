import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CACategory, CASign } from './types';
import { signs } from './signs.generated';

export type { CACategory, CASign } from './types';
export { signs };

export const getAllSigns = (): CASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CACategory): CASign[] =>
  coreGetSignsByCategory(signs, category);
