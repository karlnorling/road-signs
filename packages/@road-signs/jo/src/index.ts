import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { JOCategory, JOSign } from './types';
import { signs } from './signs.generated';

export type { JOCategory, JOSign } from './types';
export { signs };

export const getAllSigns = (): JOSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): JOSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): JOSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: JOCategory): JOSign[] =>
  coreGetSignsByCategory(signs, category);
