export interface SignAssets {
  jpg: Record<number, string>;
  png: Record<number, string>;
  /** Relative path to the SVG source file. Absent for PDF-extracted (PNG-only) signs. */
  svg?: string;
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
  /** Inline SVG string, SVGO-optimised. Absent for PDF-extracted (PNG-only) signs. */
  svg?: string;
}

/**
 * Standard five-category taxonomy shared by Vienna Convention countries.
 * Used by: AT, BE, CH, CZ, DE, DK, ES, FI, FR, GR, HR, HU, IE, IS, IT,
 *           LI, LT, LV, ME, MT, NL, NO, PL, PT, RO, RS, SE, SI, SK, TR…
 */
export type ViennaCategory =
  | 'information'
  | 'mandatory'
  | 'priority'
  | 'prohibitory'
  | 'warning';

export type ViennaSign = Sign<ViennaCategory>;
