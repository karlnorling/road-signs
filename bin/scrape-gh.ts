/**
 * scrape-gh.ts — Ghana
 * British-derived. Run via: yarn update --country=gh
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'gh',
  country: 'Ghana',
  commonsCategories: [
    'SVG_road_signs_in_Ghana',
    'SVG_warning_road_signs_of_Ghana',
    'SVG_regulatory_road_signs_of_Ghana',
  ],
});
