/**
 * scrape-ht.ts — Haiti
 * Vienna Convention / French-influenced. Run via: yarn update --country=ht
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ht',
  country: 'Haiti',
  commonsCategories: ['SVG_road_signs_in_Haiti', 'SVG_warning_road_signs_of_Haiti'],
});
