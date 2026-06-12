/**
 * scrape-rw.ts — Rwanda
 * Vienna Convention / Belgian-influenced. Run via: yarn update --country=rw
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'rw',
  country: 'Rwanda',
  commonsCategories: [
    'SVG_road_signs_in_Rwanda',
    'SVG_warning_road_signs_of_Rwanda',
    'SVG_regulatory_road_signs_of_Rwanda',
  ],
});
