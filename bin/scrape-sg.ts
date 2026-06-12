/**
 * scrape-sg.ts — Singapore
 *
 * Singapore signs follow the Road Traffic Act (Cap. 276).
 * Left-hand traffic; signs broadly follow the Vienna Convention.
 * Codes: W (warning), R (regulatory/prohibitory), D (directional/information).
 *
 * Run via: yarn update --country=sg
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'sg',
  country: 'Singapore',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Singapore',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'directional', category: 'information' },
    { pattern: 'temporary', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Singapore', 'Road_signs_in_Singapore'],
});
