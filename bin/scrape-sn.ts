/**
 * scrape-sn.ts — Senegal
 * Vienna Convention / French-influenced. Run via: yarn update --country=sn
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'sn',
  country: 'Senegal',
  commonsCategories: ['SVG_road_signs_in_Senegal', 'SVG_warning_road_signs_of_Senegal'],
});
