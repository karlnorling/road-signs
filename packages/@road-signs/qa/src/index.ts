import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { QACategory, QASign } from './types';
import { signs } from './signs.generated';

export type { QACategory, QASign } from './types';
export { signs };

export const getAllSigns = (): QASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): QASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): QASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: QACategory): QASign[] =>
  coreGetSignsByCategory(signs, category);
