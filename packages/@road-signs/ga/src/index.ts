import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GACategory, GASign } from './types';
import { signs } from './signs.generated';

export type { GACategory, GASign } from './types';
export { signs };

export const getAllSigns = (): GASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GACategory): GASign[] =>
  coreGetSignsByCategory(signs, category);
