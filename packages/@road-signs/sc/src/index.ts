import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SCCategory, SCSign } from './types';
import { signs } from './signs.generated';

export type { SCCategory, SCSign } from './types';
export { signs };

export const getAllSigns = (): SCSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SCSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SCSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SCCategory): SCSign[] =>
  coreGetSignsByCategory(signs, category);
