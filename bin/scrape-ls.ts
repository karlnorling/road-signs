/**
 * scrape-ls.ts — Lesotho
 *
 * Lesotho uses the SADC regional sign standard (Road signs in the Southern
 * African Development Community). No Lesotho-specific SVG diagrams exist on
 * Wikimedia Commons; signs are sourced from the shared SADC category.
 * Run via: yarn update --country=ls
 */
import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ls',
  country: 'Lesotho',
  commonsCategories: ['SVG_road_signs_in_Lesotho'],
});
