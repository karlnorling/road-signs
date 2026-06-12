/**
 * scrape-bb.ts — Barbados
 * British-derived (Road Traffic Act). Run via: yarn update --country=bb
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'bb',
  country: 'Barbados',
  commonsCategories: ['SVG_road_signs_in_Barbados'],
});
