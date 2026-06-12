/**
 * scrape-bg.ts — Bulgaria
 *
 * Bulgarian signs follow the Vienna Convention (Закон за движението по пътищата).
 * Codes: А (warning), Б/В (priority/prohibitory), Г (mandatory), Д/Е (information).
 * Wikipedia uses the transliterated Latin prefixes A, B, C, D, E.
 *
 * Run via: yarn update --country=bg
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'bg',
  country: 'Bulgaria',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Bulgaria',
  commonsCategories: ['SVG_road_signs_in_Bulgaria'],
});
