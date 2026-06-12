/**
 * scrape-sa.ts — Saudi Arabia
 *
 * Vienna Convention. Bilingual Arabic/English signs.
 * Categories: warning, regulatory/prohibitory, guide/information, temporary.
 *
 * Run via: yarn update --country=sa
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'sa',
  country: 'Saudi Arabia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Saudi_Arabia',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'guide', category: 'information' },
    { pattern: 'temporary', category: 'warning' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Saudi_Arabia',
    'SVG_warning_road_signs_of_Saudi_Arabia',
    'SVG_priority_road_signs_of_Saudi_Arabia',
    'SVG_prohibitory_road_signs_of_Saudi_Arabia',
    'SVG_mandatory_road_signs_of_Saudi_Arabia',
    'SVG_information_road_signs_of_Saudi_Arabia',
    'SVG_regulatory_road_signs_of_Saudi_Arabia',
    'SVG_diagrams_of_route_signs_of_Saudi_Arabia',
  ],
});
