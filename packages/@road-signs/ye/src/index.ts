import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { YECategory, YESign } from './types';
import { signs } from './signs.generated';

export type { YECategory, YESign } from './types';
export { signs };

export const getAllSigns = (): YESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): YESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): YESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: YECategory): YESign[] =>
  coreGetSignsByCategory(signs, category);
