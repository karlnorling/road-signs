/**
 * scrape-gd.ts — Grenada
 * British-derived (Road Traffic Act). Run via: yarn update --country=gd
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'gd',
  country: 'Grenada',
  commonsCategories: ['SVG_road_signs_in_Grenada'],
});
