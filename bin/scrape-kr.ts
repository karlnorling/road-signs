/**
 * scrape-kr.ts — South Korea
 *
 * South Korean signs follow the Road Traffic Act (도로교통법).
 * Codes are numeric: 1xx (regulatory/prohibitory), 2xx (warning), 3xx (instruction), 4xx (guide).
 *
 * Run via: yarn update --country=kr
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'kr',
  country: 'South Korea',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_South_Korea',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'instruction', category: 'mandatory' },
    { pattern: 'guide', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_South_Korea', 'SVG_road_signs_in_South_Korea'],
});
