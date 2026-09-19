import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ALCategory, ALSign } from './types';
import { signs } from './signs.generated';

export type { ALCategory, ALSign } from './types';
export { signs };

export const getAllSigns = (): ALSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ALSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ALSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ALCategory): ALSign[] =>
  coreGetSignsByCategory(signs, category);
