/**
 * scrape-ie.ts — Ireland
 *
 * Irish signs are governed by the Road Traffic (Signs) Regulations.
 * Sign designs are similar to UK but with Irish-specific additions.
 * Categories: warning, regulatory (prohibitory), information, direction.
 *
 * Run via: yarn update --country=ie
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ie',
  country: 'Ireland',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Ireland',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'speed limit', category: 'prohibitory' },
    { pattern: 'no entry', category: 'prohibitory' },
    { pattern: 'yield', category: 'priority' },
    { pattern: 'stop', category: 'priority' },
    { pattern: 'motorway', category: 'information' },
    { pattern: 'direction', category: 'information' },
    { pattern: 'tourist', category: 'information' },
    { pattern: 'temporary', category: 'information' },
    { pattern: 'road work', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_Ireland', 'SVG_road_signs_in_Ireland'],
});
