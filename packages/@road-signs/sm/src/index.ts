/**
 * @road-signs/sm — San Marino road signs.
 *
 * San Marino is fully integrated into the Italian road-sign system
 * (Codice della Strada). Rather than ship a duplicate ~60MB registry,
 * this package re-exports the Italian catalogue under SM-prefixed names.
 */

import {
  signs,
  getAllSigns as itGetAllSigns,
  getSign as itGetSign,
  getSignByCode as itGetSignByCode,
  getSignsByCategory as itGetSignsByCategory,
} from '@road-signs/it';
import type { ITCategory, ITSign } from '@road-signs/it';

export type { ITCategory as SMCategory, ITSign as SMSign } from '@road-signs/it';

export { signs };

export const getAllSigns = (): ITSign[] => itGetAllSigns();

export const getSign = (id: string): ITSign | undefined => itGetSign(id);

export const getSignByCode = (code: string): ITSign | undefined => itGetSignByCode(code);

export const getSignsByCategory = (category: ITCategory): ITSign[] =>
  itGetSignsByCategory(category);
