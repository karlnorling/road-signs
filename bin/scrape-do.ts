/**
 * scrape-do.ts — Dominican Republic
 * MUTCD-influenced. Run via: yarn update --country=do
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'do',
  country: 'Dominican Republic',
  commonsCategories: [
    'SVG_road_signs_in_the_Dominican_Republic',
    'SVG_warning_road_signs_of_the_Dominican_Republic',
  ],
});
