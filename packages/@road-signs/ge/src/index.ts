import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { GECategory, GESign } from './types';
import { signs } from './signs.generated';

export type { GECategory, GESign } from './types';
export { signs };

export const getAllSigns = (): GESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): GESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): GESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: GECategory): GESign[] =>
  coreGetSignsByCategory(signs, category);
