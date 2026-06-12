/**
 * scrape-ge.ts — Georgia
 *
 * Vienna Convention. Commons category uses "(country)" disambiguator.
 * Categories: warning, priority, prohibitory, mandatory, information, service, additional.
 *
 * Run via: yarn update --country=ge
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ge',
  country: 'Georgia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Georgia',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Georgia_(country)',
    'SVG_warning_road_signs_of_Georgia',
    'SVG_priority_road_signs_of_Georgia',
    'SVG_prohibitory_road_signs_of_Georgia',
    'SVG_information_road_signs_of_Georgia',
    'SVG_service_road_signs_of_Georgia',
    'SVG_additional_road_signs_of_Georgia',
    'SVG_regulatory_road_signs_of_Georgia',
    'SVG_special_regulation_road_signs_of_Georgia',
  ],
});
