export interface SignAssets {
  jpg: Record<number, string>;
  png: Record<number, string>;
  svg: string;
  webp: Record<number, string>;
}

/**
 * A single road sign. TCategory is narrowed per country package
 * (e.g. USCategory = 'warning' | 'regulatory' | ...).
 */
export interface Sign<TCategory extends string = string> {
  assets: SignAssets;
  category: TCategory;
  /** Official sign code, e.g. "W1-1" (US), "670" (UK). */
  code: string;
  description: string;
  /** Slug ID, e.g. "w1-1-turn". */
  id: string;
  name: string;
  /** Inline SVG string, SVGO-optimised. */
  svg: string;
}
