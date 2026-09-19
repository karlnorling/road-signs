import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BJCategory, BJSign } from './types';
import { signs } from './signs.generated';

export type { BJCategory, BJSign } from './types';
export { signs };

export const getAllSigns = (): BJSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BJSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BJSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BJCategory): BJSign[] =>
  coreGetSignsByCategory(signs, category);
