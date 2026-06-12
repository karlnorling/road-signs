/**
 * scrape-mm.ts — Myanmar
 * Vienna Convention (since 2019). Very sparse Commons SVG coverage.
 * Run via: yarn update --country=mm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'mm',
  country: 'Myanmar',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Myanmar',
  commonsCategories: ['SVG_warning_road_signs_of_Myanmar', 'Diagrams_of_road_signs_of_Myanmar'],
});
