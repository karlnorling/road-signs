/**
 * scrape-cm.ts — Cameroon
 * Vienna Convention / French-influenced. Run via: yarn update --country=cm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'cm',
  country: 'Cameroon',
  commonsCategories: ['SVG_road_signs_in_Cameroon', 'SVG_warning_road_signs_of_Cameroon'],
});
