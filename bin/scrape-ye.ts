/**
 * scrape-ye.ts — Yemen
 * Vienna Convention, bilingual Arabic/English. Run via: yarn update --country=ye
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ye',
  country: 'Yemen',
  commonsCategories: [
    'SVG_road_signs_in_Yemen',
    'SVG_warning_road_signs_of_Yemen',
    'SVG_regulatory_road_signs_of_Yemen',
  ],
});
