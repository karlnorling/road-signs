/**
 * scrape-th.ts — Thailand
 *
 * Thai signs follow the Land Traffic Act (พระราชบัญญัติจราจรทางบก).
 * Wikipedia organises signs by function with English headings.
 *
 * Run via: yarn update --country=th
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'th',
  country: 'Thailand',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Thailand',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'instruction', category: 'mandatory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'temporary', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_Thailand', 'SVG_road_signs_in_Thailand'],
});
