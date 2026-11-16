import type { JMCategory, JMSign } from './types.js';
import { signs } from './signs.generated.js';

export type { JMCategory, JMSign } from './types.js';
export { signs };

export const getAllSigns = (): JMSign[] => [...signs];

export const getSign = (id: string): JMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): JMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: JMCategory): JMSign[] =>
  signs.filter((s) => s.category === category);
