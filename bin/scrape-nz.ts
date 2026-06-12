/**
 * scrape-nz.ts — New Zealand
 *
 * New Zealand signs follow the Traffic Control Devices Rule (NZTA).
 * Similar to AS1742 (Australia). Wikipedia organises by function.
 *
 * Run via: yarn update --country=nz
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'nz',
  country: 'New Zealand',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_New_Zealand',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'give way', category: 'priority' },
    { pattern: 'speed', category: 'prohibitory' },
    { pattern: 'temporary', category: 'information' },
    { pattern: 'directional', category: 'information' },
    { pattern: 'guide', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_New_Zealand', 'SVG_road_signs_in_New_Zealand'],
});
