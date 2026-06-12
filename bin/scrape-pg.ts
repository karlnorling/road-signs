/**
 * scrape-pg.ts — Papua New Guinea
 * British-derived (Motor Traffic Act). Run via: yarn update --country=pg
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'pg',
  country: 'Papua New Guinea',
  commonsCategories: ['SVG_road_signs_in_Papua_New_Guinea'],
});
