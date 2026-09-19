import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BECategory, BESign } from './types';
import { signs } from './signs.generated';

export type { BECategory, BESign } from './types';
export { signs };

export const getAllSigns = (): BESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BECategory): BESign[] =>
  coreGetSignsByCategory(signs, category);
