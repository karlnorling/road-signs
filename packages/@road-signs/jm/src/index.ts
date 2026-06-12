import type { JMCategory, JMSign } from './types';
import { signs } from './signs.generated';

export type { JMCategory, JMSign } from './types';
export { signs };

export const getAllSigns = (): JMSign[] => [...signs];

export const getSign = (id: string): JMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): JMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: JMCategory): JMSign[] =>
  signs.filter((s) => s.category === category);
