/**
 * scrape-ph.ts — Philippines
 *
 * Vienna Convention (original signatory). American/Australian influences.
 * Categories: regulatory, warning, guide/information.
 *
 * Run via: yarn update --country=ph
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ph',
  country: 'Philippines',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Philippines',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'expressway', category: 'information' },
    { pattern: 'instruction', category: 'mandatory' },
    { pattern: 'hazard', category: 'warning' },
    { pattern: 'combination', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_the_Philippines',
    'SVG_warning_road_signs_of_the_Philippines',
    'SVG_priority_road_signs_of_the_Philippines',
    'SVG_prohibitory_road_signs_of_the_Philippines',
    'SVG_mandatory_road_signs_of_the_Philippines',
    'SVG_regulatory_road_signs_of_the_Philippines',
    'SVG_combination_road_signs_of_the_Philippines',
  ],
});
