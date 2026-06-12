/**
 * scrape-uy.ts — Uruguay
 *
 * Uruguayan signs follow the Vienna Convention variant
 * (Decreto 374/004 — Reglamento Nacional de Tránsito).
 * Wikipedia uses Spanish section headings.
 *
 * Run via: yarn update --country=uy
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'uy',
  country: 'Uruguay',
  commonsCategories: ['SVG_road_signs_in_Uruguay', 'SVG_warning_road_signs_of_Uruguay'],
});
