/**
 * scrape-vn.ts — Vietnam
 *
 * Vienna Convention adjacent. Chinese/French influences.
 * Categories: prohibition, warning, mandatory, information, supplementary.
 *
 * Run via: yarn update --country=vn
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'vn',
  country: 'Vietnam',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Vietnam',
  headingMapExtra: [
    { pattern: 'prohibition', category: 'prohibitory' },
    { pattern: 'supplementary', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Vietnam',
    'SVG_warning_road_signs_of_Vietnam',
    'SVG_priority_road_signs_of_Vietnam',
    'SVG_prohibitory_road_signs_of_Vietnam',
    'SVG_mandatory_road_signs_of_Vietnam',
    'SVG_additional_road_signs_of_Vietnam',
    'SVG_regulatory_road_signs_of_Vietnam',
  ],
});
