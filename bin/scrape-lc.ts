/**
 * scrape-lc.ts — Saint Lucia
 * British-derived (Road Traffic Act). Run via: yarn update --country=lc
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'lc',
  country: 'Saint Lucia',
  commonsCategories: ['SVG_road_signs_in_Saint_Lucia'],
});
