import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ROCategory, ROSign } from './types';
import { signs } from './signs.generated';

export type { ROCategory, ROSign } from './types';
export { signs };

export const getAllSigns = (): ROSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ROSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ROSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ROCategory): ROSign[] =>
  coreGetSignsByCategory(signs, category);
