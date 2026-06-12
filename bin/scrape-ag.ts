/**
 * scrape-ag.ts — Antigua and Barbuda
 * British-derived (Road Traffic Act). Run via: yarn update --country=ag
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ag',
  country: 'Antigua and Barbuda',
  commonsCategories: ['Diagrams_of_road_signs_of_Antigua_and_Barbuda'],
});
