import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ESCategory, ESSign } from './types';
import { signs } from './signs.generated';

export type { ESCategory, ESSign } from './types';
export { signs };

export const getAllSigns = (): ESSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ESSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ESSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ESCategory): ESSign[] =>
  coreGetSignsByCategory(signs, category);
