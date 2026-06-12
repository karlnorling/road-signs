/**
 * scrape-sv.ts — El Salvador
 * SIECA. Run via: yarn update --country=sv
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'sv',
  country: 'El Salvador',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_El_Salvador',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_El_Salvador',
    'SVG_warning_road_signs_of_El_Salvador',
    'SVG_regulatory_road_signs_of_El_Salvador',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
});
