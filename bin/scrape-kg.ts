/**
 * scrape-kg.ts — Kyrgyzstan
 * Vienna Convention. Run via: yarn update --country=kg
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'kg',
  country: 'Kyrgyzstan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Kyrgyzstan',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Kyrgyzstan',
    'SVG_warning_road_signs_of_Kyrgyzstan',
    'SVG_prohibitory_road_signs_of_Kyrgyzstan',
    'SVG_mandatory_road_signs_of_Kyrgyzstan',
    'SVG_information_road_signs_of_Kyrgyzstan',
  ],
});
