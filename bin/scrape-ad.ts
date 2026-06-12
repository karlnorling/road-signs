/**
 * scrape-ad.ts — Andorra
 * Vienna Convention / Spanish-influenced. Run via: yarn update --country=ad
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ad',
  country: 'Andorra',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_the_European_microstates',
  commonsCategories: ['SVG_road_signs_in_Andorra'],
});
