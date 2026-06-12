/**
 * scrape-iq.ts — Iraq
 * Vienna Convention, bilingual Arabic/English. Run via: yarn update --country=iq
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'iq',
  country: 'Iraq',
  commonsCategories: [
    'SVG_road_signs_in_Iraq',
    'SVG_warning_road_signs_of_Iraq',
    'SVG_regulatory_road_signs_of_Iraq',
  ],
});
