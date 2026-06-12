/**
 * scrape-by.ts — Belarus
 *
 * Vienna Convention (STB 1140-2013). Similar to Russian signs.
 * Categories: warning, priority, prohibitory, mandatory, information, service, additional.
 *
 * Run via: yarn update --country=by
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'by',
  country: 'Belarus',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Belarus',
  headingMapExtra: [
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Belarus',
    'SVG_warning_road_signs_of_Belarus',
    'SVG_priority_road_signs_of_Belarus',
    'SVG_prohibitory_road_signs_of_Belarus',
    'SVG_mandatory_road_signs_of_Belarus',
    'SVG_information_road_signs_of_Belarus',
    'SVG_service_road_signs_of_Belarus',
    'SVG_additional_road_signs_of_Belarus',
  ],
});
