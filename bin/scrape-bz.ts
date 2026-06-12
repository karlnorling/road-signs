/**
 * scrape-bz.ts — Belize
 * UK-influenced / SIECA. Run via: yarn update --country=bz
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'bz',
  country: 'Belize',
  commonsCategories: [
    'SVG_road_signs_in_Belize',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
});
