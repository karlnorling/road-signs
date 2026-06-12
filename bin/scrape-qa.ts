/**
 * scrape-qa.ts — Qatar
 * UK-influenced; Vienna Convention since 2022. Run via: yarn update --country=qa
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'qa',
  country: 'Qatar',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Qatar',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'historic', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Qatar',
    'SVG_warning_road_signs_of_Qatar',
    'SVG_priority_road_signs_of_Qatar',
    'SVG_prohibitory_road_signs_of_Qatar',
    'SVG_mandatory_road_signs_of_Qatar',
    'SVG_regulatory_road_signs_of_Qatar',
    'SVG_additional_road_signs_of_Qatar',
  ],
});
