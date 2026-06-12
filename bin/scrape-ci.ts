/**
 * scrape-ci.ts — Côte d'Ivoire
 * Vienna Convention / French-influenced. Run via: yarn update --country=ci
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ci',
  country: "Côte d'Ivoire",
  commonsCategories: ['SVG_road_signs_in_Ivory_Coast', 'SVG_warning_road_signs_of_Ivory_Coast'],
});
