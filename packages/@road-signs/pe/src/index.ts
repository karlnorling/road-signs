import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PECategory, PESign } from './types';
import { signs } from './signs.generated';

export type { PECategory, PESign } from './types';
export { signs };

export const getAllSigns = (): PESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PECategory): PESign[] =>
  coreGetSignsByCategory(signs, category);
