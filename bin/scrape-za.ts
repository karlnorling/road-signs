/**
 * scrape-za.ts — South Africa
 *
 * South African signs follow the SARTSM (South African Road Traffic Signs Manual).
 * Codes: W (warning), R (regulatory/prohibitory), G (guidance/information), T (temporary).
 *
 * Run via: yarn update --country=za
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'za',
  country: 'South Africa',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_South_Africa',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'guidance', category: 'information' },
    { pattern: 'temporary', category: 'information' },
    { pattern: 'route marker', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_South_Africa', 'Road_signs_in_South_Africa'],
});
