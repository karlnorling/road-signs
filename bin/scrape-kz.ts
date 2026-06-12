/**
 * scrape-kz.ts — Kazakhstan
 * Vienna Convention (ST RK 1125-2021). Run via: yarn update --country=kz
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'kz',
  country: 'Kazakhstan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Kazakhstan',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Kazakhstan',
    'SVG_warning_road_signs_of_Kazakhstan',
    'SVG_prohibitory_road_signs_of_Kazakhstan',
    'SVG_information_road_signs_of_Kazakhstan',
    'SVG_service_road_signs_of_Kazakhstan',
    'SVG_additional_road_signs_of_Kazakhstan',
    'SVG_regulatory_road_signs_of_Kazakhstan',
  ],
});
