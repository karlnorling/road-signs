/**
 * scrape-ae.ts — United Arab Emirates
 *
 * British-derived system. Bilingual Arabic/English.
 * Categories: regulatory, warning, information.
 *
 * Run via: yarn update --country=ae
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ae',
  country: 'United Arab Emirates',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_the_United_Arab_Emirates',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'hazard', category: 'warning' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_the_United_Arab_Emirates',
    'SVG_regulatory_road_signs_of_the_United_Arab_Emirates',
    'SVG_warning_road_signs_of_the_United_Arab_Emirates',
  ],
});
