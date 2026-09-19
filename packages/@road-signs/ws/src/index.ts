import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { WSCategory, WSSign } from './types';
import { signs } from './signs.generated';

export type { WSCategory, WSSign } from './types';
export { signs };

export const getAllSigns = (): WSSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): WSSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): WSSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: WSCategory): WSSign[] =>
  coreGetSignsByCategory(signs, category);
