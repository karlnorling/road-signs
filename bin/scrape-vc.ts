/**
 * scrape-vc.ts — Saint Vincent and the Grenadines
 * British-derived (Road Traffic Act). Run via: yarn update --country=vc
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'vc',
  country: 'Saint Vincent and the Grenadines',
  commonsCategories: ['SVG_road_signs_in_Saint_Vincent_and_the_Grenadines'],
});
