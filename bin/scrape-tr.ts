/**
 * scrape-tr.ts — Turkey
 *
 * Turkish signs follow the Karayolları Trafik Yönetmeliği,
 * a Vienna Convention variant. Wikipedia uses English headings.
 *
 * Run via: yarn update --country=tr
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'tr',
  country: 'Turkey',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Turkey',
  headingMapExtra: [
    { pattern: 'cautionary', category: 'warning' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'instruction', category: 'mandatory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'temporary', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Turkey', 'Road_signs_in_Turkey'],
});
