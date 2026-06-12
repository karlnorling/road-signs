/**
 * scrape-il.ts — Israel
 *
 * Israeli signs follow the Traffic Ordinance (New Version) — Vienna Convention.
 * Codes are numeric: 1xx (warning), 2xx (priority), 3xx (prohibitory),
 * 4xx (mandatory), 5xx (information/guide).
 *
 * Run via: yarn update --country=il
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'il',
  country: 'Israel',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Israel',
  headingMapExtra: [
    { pattern: 'cautionary', category: 'warning' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'temporary', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Israel', 'Road_signs_in_Israel'],
});
