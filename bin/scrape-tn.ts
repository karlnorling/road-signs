/**
 * scrape-tn.ts — Tunisia
 * Vienna Convention (French-influenced). Very sparse Commons coverage.
 * Run via: yarn update --country=tn
 */
import { createViennaScraper } from './scrape-vienna';
// SVG Commons coverage is very sparse for Tunisia.
export default createViennaScraper({
  cc: 'tn',
  country: 'Tunisia',
  commonsCategories: ['SVG_road_signs_in_Tunisia', 'Diagrams_of_road_signs_of_Tunisia'],
});
