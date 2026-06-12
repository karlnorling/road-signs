/**
 * scrape-ly.ts — Libya
 * Vienna Convention (Arabic-only signage). Very sparse Commons coverage.
 * Run via: yarn update --country=ly
 */
import { createViennaScraper } from './scrape-vienna';
// SVG Commons coverage is extremely sparse for Libya.
export default createViennaScraper({
  cc: 'ly',
  country: 'Libya',
  commonsCategories: ['SVG_road_signs_in_Libya', 'Diagrams_of_road_signs_of_Libya'],
});
