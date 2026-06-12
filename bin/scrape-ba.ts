/**
 * scrape-ba.ts — Bosnia and Herzegovina
 *
 * Bosnian signs follow the Vienna Convention (Zakon o osnovama bezbjednosti saobraćaja na cestama).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=ba
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ba',
  country: 'Bosnia and Herzegovina',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Bosnia_and_Herzegovina',
  commonsCategories: ['SVG_road_signs_in_Bosnia_and_Herzegovina'],
});
