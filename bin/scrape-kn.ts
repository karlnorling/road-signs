/**
 * scrape-kn.ts — Saint Kitts and Nevis
 * British-derived (Road Traffic Act). Run via: yarn update --country=kn
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'kn',
  country: 'Saint Kitts and Nevis',
  commonsCategories: ['SVG_road_signs_in_Saint_Kitts_and_Nevis'],
});
