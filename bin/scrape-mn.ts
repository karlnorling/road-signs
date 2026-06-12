/**
 * scrape-mn.ts — Mongolia
 * Vienna Convention. Run via: yarn update --country=mn
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'mn',
  country: 'Mongolia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Mongolia',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Mongolia',
    'SVG_warning_road_signs_of_Mongolia',
    'SVG_prohibitory_road_signs_of_Mongolia',
    'SVG_mandatory_road_signs_of_Mongolia',
    'SVG_information_road_signs_of_Mongolia',
  ],
});
