import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MECategory, MESign } from './types';
import { signs } from './signs.generated';

export type { MECategory, MESign } from './types';
export { signs };

export const getAllSigns = (): MESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MECategory): MESign[] =>
  coreGetSignsByCategory(signs, category);
