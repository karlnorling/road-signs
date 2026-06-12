/**
 * scrape-mk.ts — North Macedonia
 *
 * North Macedonian signs follow the Vienna Convention (Закон за безбедност на сообраќајот на патиштата).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=mk
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'mk',
  country: 'North Macedonia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_North_Macedonia',
  commonsCategories: ['SVG_road_signs_in_North_Macedonia'],
});
