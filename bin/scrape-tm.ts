/**
 * scrape-tm.ts — Turkmenistan
 * Vienna Convention, commons-only. Run via: yarn update --country=tm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'tm',
  country: 'Turkmenistan',
  commonsCategories: ['SVG_road_signs_in_Turkmenistan'],
});
