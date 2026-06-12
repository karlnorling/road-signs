/**
 * scrape-my.ts — Malaysia
 *
 * Malaysian signs follow the Road Transport Act 1987.
 * Left-hand traffic; signs broadly follow the Vienna Convention.
 *
 * Run via: yarn update --country=my
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'my',
  country: 'Malaysia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Malaysia',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'instruction', category: 'mandatory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'temporary', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Malaysia', 'Road_signs_in_Malaysia'],
});
