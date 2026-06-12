/**
 * scrape-dm.ts — Dominica
 * British-derived (Road Traffic Act). Run via: yarn update --country=dm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'dm',
  country: 'Dominica',
  commonsCategories: ['Diagrams_of_road_signs_of_Dominica'],
});
