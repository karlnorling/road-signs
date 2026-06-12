/**
 * scrape-bs.ts — Bahamas
 * British-derived (Road Traffic Act). Run via: yarn update --country=bs
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'bs',
  country: 'Bahamas',
  commonsCategories: ['Diagrams_of_road_signs_of_the_Bahamas'],
});
