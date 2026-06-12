/**
 * scrape-la.ts — Laos
 * Vienna Convention. Run via: yarn update --country=la
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'la',
  country: 'Laos',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Laos',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Laos',
    'SVG_warning_road_signs_of_Laos',
    'SVG_prohibitory_road_signs_of_Laos',
    'SVG_mandatory_road_signs_of_Laos',
  ],
});
