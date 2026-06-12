/**
 * scrape-tj.ts — Tajikistan
 * Vienna Convention. Run via: yarn update --country=tj
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'tj',
  country: 'Tajikistan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Tajikistan',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Tajikistan',
    'SVG_warning_road_signs_of_Tajikistan',
    'SVG_prohibitory_road_signs_of_Tajikistan',
    'SVG_mandatory_road_signs_of_Tajikistan',
  ],
});
