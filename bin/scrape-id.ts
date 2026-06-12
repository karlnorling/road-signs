/**
 * scrape-id.ts — Indonesia
 *
 * Vienna Convention based. Categories: warning, prohibitory, mandatory,
 * directional/information.
 *
 * Run via: yarn update --country=id
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'id',
  country: 'Indonesia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Indonesia',
  headingMapExtra: [
    { pattern: 'directional', category: 'information' },
    { pattern: 'toll road', category: 'information' },
    { pattern: 'temporary', category: 'warning' },
    { pattern: 'electronic', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Indonesia',
    'SVG_warning_road_signs_of_Indonesia',
    'SVG_priority_road_signs_of_Indonesia',
    'SVG_prohibitory_road_signs_of_Indonesia',
    'SVG_mandatory_road_signs_of_Indonesia',
    'SVG_information_road_signs_of_Indonesia',
    'SVG_additional_road_signs_of_Indonesia',
    'SVG_diagrams_of_route_signs_of_Indonesia',
  ],
});
