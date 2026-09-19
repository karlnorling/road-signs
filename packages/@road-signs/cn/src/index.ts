import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CNCategory, CNSign } from './types';
import { signs } from './signs.generated';

export type { CNCategory, CNSign } from './types';
export { signs };

export const getAllSigns = (): CNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CNCategory): CNSign[] =>
  coreGetSignsByCategory(signs, category);
