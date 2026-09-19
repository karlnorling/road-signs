import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { IQCategory, IQSign } from './types';
import { signs } from './signs.generated';

export type { IQCategory, IQSign } from './types';
export { signs };

export const getAllSigns = (): IQSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): IQSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): IQSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: IQCategory): IQSign[] =>
  coreGetSignsByCategory(signs, category);
