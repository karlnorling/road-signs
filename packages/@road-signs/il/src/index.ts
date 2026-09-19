import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ILCategory, ILSign } from './types';
import { signs } from './signs.generated';

export type { ILCategory, ILSign } from './types';
export { signs };

export const getAllSigns = (): ILSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ILSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ILSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ILCategory): ILSign[] =>
  coreGetSignsByCategory(signs, category);
