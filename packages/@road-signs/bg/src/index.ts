import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BGCategory, BGSign } from './types';
import { signs } from './signs.generated';

export type { BGCategory, BGSign } from './types';
export { signs };

export const getAllSigns = (): BGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BGCategory): BGSign[] =>
  coreGetSignsByCategory(signs, category);
