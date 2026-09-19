import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NACategory, NASign } from './types';
import { signs } from './signs.generated';

export type { NACategory, NASign } from './types';
export { signs };

export const getAllSigns = (): NASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NACategory): NASign[] =>
  coreGetSignsByCategory(signs, category);
