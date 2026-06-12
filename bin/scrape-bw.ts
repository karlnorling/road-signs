/**
 * scrape-bw.ts — Botswana
 * British-derived (Road Traffic Act). Run via: yarn update --country=bw
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'bw',
  country: 'Botswana',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Botswana',
  commonsCategories: [
    'SVG_road_signs_in_Botswana',
    'SVG_warning_road_signs_of_Botswana',
    'SVG_regulatory_road_signs_of_Botswana',
  ],
});
