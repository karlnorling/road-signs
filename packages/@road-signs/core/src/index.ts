import type { Sign } from './types';

export type { Sign, SignAssets } from './types';

export const getAllSigns = <T extends Sign>(registry: readonly T[]): T[] => [...registry];

export const getSign = <T extends Sign>(registry: readonly T[], id: string): T | undefined =>
  registry.find((s) => s.id === id);

export const getSignByCode = <T extends Sign>(registry: readonly T[], code: string): T | undefined =>
  registry.find((s) => s.code === code);

export const getSignsByCategory = <T extends Sign>(
  registry: readonly T[],
  category: T['category'],
): T[] => registry.filter((s) => s.category === category);
