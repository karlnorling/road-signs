/**
 * scrape-in.ts — India
 *
 * Indian signs follow the Motor Vehicles Act (IRC:67 standard).
 * Wikipedia organises by function with English headings.
 *
 * Run via: yarn update --country=in
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'in',
  country: 'India',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_India',
  headingMapExtra: [
    { pattern: 'mandatory', category: 'prohibitory' },
    { pattern: 'cautionary', category: 'warning' },
    { pattern: 'informatory', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_India', 'SVG_road_signs_in_India'],
});
