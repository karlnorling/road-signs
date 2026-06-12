/**
 * scrape-mz.ts — Mozambique
 * Vienna Convention / Portuguese-influenced. Run via: yarn update --country=mz
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'mz',
  country: 'Mozambique',
  commonsCategories: [
    'SVG_road_signs_in_Mozambique',
    'SVG_warning_road_signs_of_Mozambique',
    'SVG_regulatory_road_signs_of_Mozambique',
  ],
});
