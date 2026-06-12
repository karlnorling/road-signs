/**
 * scrape-ru.ts — Russia
 *
 * Vienna Convention. Categories: warning, priority, prohibitory, mandatory,
 * special regulation, information, service, additional plates.
 *
 * Run via: yarn update --country=ru
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ru',
  country: 'Russia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Russia',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Russia',
    'SVG_warning_road_signs_of_Russia',
    'SVG_priority_road_signs_of_Russia',
    'SVG_prohibitory_road_signs_of_Russia',
    'SVG_mandatory_road_signs_of_Russia',
    'SVG_information_road_signs_of_Russia',
    'SVG_service_road_signs_of_Russia',
    'SVG_additional_road_signs_of_Russia',
    'SVG_special_regulation_road_signs_of_Russia',
  ],
});
