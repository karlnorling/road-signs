import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { USCategory, USSign } from './types';
import { signs } from './signs.generated';

export type { USCategory, USSign } from './types';
export { signs };

export const getAllSigns = (): USSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): USSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): USSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: USCategory): USSign[] =>
  coreGetSignsByCategory(signs, category);
