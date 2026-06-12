/**
 * scrape-ua.ts — Ukraine
 *
 * Ukrainian signs follow the Vienna Convention (Правила дорожнього руху).
 * Codes: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory),
 *        4.xx (mandatory), 5.xx (information), 6.xx (additional).
 *
 * Run via: yarn update --country=ua
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ua',
  country: 'Ukraine',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Ukraine',
  headingMapExtra: [
    { pattern: 'additional panel', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Ukraine'],
});
