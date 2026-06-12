/**
 * scrape-et.ts — Ethiopia
 * British-influenced. Run via: yarn update --country=et
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'et',
  country: 'Ethiopia',
  commonsCategories: ['SVG_road_signs_in_Ethiopia', 'SVG_warning_road_signs_of_Ethiopia'],
});
