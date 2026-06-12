/* oxlint-disable no-await-in-loop */

/**
 * fill-gaps.ts
 *
 * Downloads SVG files from Wikimedia Commons that exist in the registered
 * categories but are not yet present as local assets.
 *
 * Files with no extractable sign code (e.g. "North Dumfries Township Road 8")
 * use the slugified filename as their code — nothing is skipped.
 *
 * Steps:
 *   1. Fetch all SVG filenames from each registered Commons category
 *   2. Identify which are missing locally
 *   3. Download them via the same pipeline as create-assets.ts
 *   4. Append new entries to data/{cc}/scraped.json
 *   5. Re-run generate-source so the package picks them up
 *
 * Usage:
 *   yarn fill-gaps --country=ca
 *   yarn fill-gaps --all
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { processSign } from './create-assets';
import { generateSource } from './generate-source';

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; fill-gaps)';

// ---------------------------------------------------------------------------
// Commons category registry
// Each entry declares a Commons category and the sign category to use.
// 'infer' means derive the sign category from the sign code prefix.
// ---------------------------------------------------------------------------

type SignCategory = string;

interface CommonsEntry {
  category: string;
  signCategory: SignCategory | 'infer';
}

const COMMONS_REGISTRY: Record<string, CommonsEntry[]> = {
  al: [
    { category: 'SVG_road_signs_in_Albania', signCategory: 'infer' },
    { category: 'Diagrams_of_warning_road_signs_of_Albania', signCategory: 'warning' },
  ],
  ar: [
    { category: 'SVG_road_signs_in_Argentina', signCategory: 'infer' },
    { category: 'Road_signs_in_Argentina', signCategory: 'infer' },
  ],
  at: [{ category: 'SVG_road_signs_in_Austria', signCategory: 'infer' }],
  au: [
    { category: 'Road_signs_in_Australia', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Australia', signCategory: 'infer' },
  ],
  ba: [{ category: 'SVG_road_signs_in_Bosnia_and_Herzegovina', signCategory: 'infer' }],
  be: [
    { category: 'SVG_road_signs_in_Belgium', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Belgium', signCategory: 'warning' },
    { category: 'SVG_new_warning_road_signs_of_Belgium', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Belgium', signCategory: 'priority' },
    { category: 'SVG_new_priority_road_signs_of_Belgium', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Belgium', signCategory: 'prohibitory' },
    { category: 'SVG_new_prohibitory_road_signs_of_Belgium', signCategory: 'prohibitory' },
    { category: 'SVG_parking_road_signs_of_Belgium', signCategory: 'prohibitory' },
    { category: 'SVG_new_parking_road_signs_of_Belgium', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Belgium', signCategory: 'mandatory' },
    { category: 'SVG_new_mandatory_road_signs_of_Belgium', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Belgium', signCategory: 'information' },
    { category: 'SVG_tourist_road_signs_of_Belgium', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Belgium', signCategory: 'infer' },
  ],
  bg: [{ category: 'SVG_road_signs_in_Bulgaria', signCategory: 'infer' }],
  bn: [
    { category: 'SVG_road_signs_in_Brunei', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Brunei', signCategory: 'warning' },
    { category: 'SVG_information_road_signs_of_Brunei', signCategory: 'information' },
    { category: 'SVG_prohibitory_road_signs_of_Brunei', signCategory: 'prohibitory' },
    { category: 'SVG_regulatory_road_signs_of_Brunei', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Brunei', signCategory: 'mandatory' },
    { category: 'SVG_priority_road_signs_of_Brunei', signCategory: 'priority' },
  ],
  br: [
    { category: 'Road_signs_in_Brazil', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Brazil', signCategory: 'infer' },
  ],
  cl: [
    { category: 'SVG_road_signs_in_Chile', signCategory: 'infer' },
    { category: 'Road_signs_in_Chile', signCategory: 'infer' },
  ],
  co: [
    { category: 'SVG_road_signs_in_Colombia', signCategory: 'infer' },
    { category: 'Road_signs_in_Colombia', signCategory: 'infer' },
  ],
  cr: [
    { category: 'SVG_road_signs_in_Costa_Rica', signCategory: 'infer' },
    { category: 'Road_signs_in_Costa_Rica', signCategory: 'infer' },
  ],
  cy: [{ category: 'SVG_road_signs_in_Cyprus', signCategory: 'infer' }],
  ca: [
    { category: 'SVG_regulatory_road_signs_of_Canada', signCategory: 'regulatory' },
    { category: 'SVG_warning_road_signs_of_Canada', signCategory: 'warning' },
    { category: 'SVG_school_road_signs_of_Canada', signCategory: 'school' },
    { category: 'SVG_temporary_road_signs_of_Canada', signCategory: 'temporary' },
    { category: 'SVG_road_signs_of_British_Columbia', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_Quebec', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_Ontario', signCategory: 'information' },
    { category: 'SVG_road_signs_of_Alberta', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_Manitoba', signCategory: 'information' },
    { category: 'SVG_road_signs_of_Nova_Scotia', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_New_Brunswick', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_Saskatchewan', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_Prince_Edward_Island', signCategory: 'infer' },
    { category: 'SVG_road_signs_of_Newfoundland_and_Labrador', signCategory: 'infer' },
  ],
  ch: [{ category: 'SVG_road_signs_in_Switzerland', signCategory: 'infer' }],
  cz: [
    { category: 'SVG_road_signs_in_the_Czech_Republic', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_in_the_Czech_Republic', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_the_Czech_Republic', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_the_Czech_Republic', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_the_Czech_Republic', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_the_Czech_Republic', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_in_the_Czech_Republic', signCategory: 'infer' },
    { category: 'SVG_diagrams_of_route_signs_of_the_Czech_Republic', signCategory: 'information' },
  ],
  de: [
    { category: 'SVG_road_signs_in_Germany', signCategory: 'infer' },
    { category: 'Warnschilder_(Deutschland)', signCategory: 'warning' },
  ],
  dk: [
    { category: 'SVG_road_signs_in_Denmark', signCategory: 'infer' },
    { category: 'Road_signs_in_Denmark', signCategory: 'infer' },
  ],
  ec: [
    { category: 'SVG_road_signs_in_Ecuador', signCategory: 'infer' },
    { category: 'Road_signs_in_Ecuador', signCategory: 'infer' },
  ],
  ee: [{ category: 'SVG_road_signs_in_Estonia', signCategory: 'infer' }],
  es: [{ category: 'SVG_road_signs_in_Spain', signCategory: 'infer' }],
  il: [
    { category: 'SVG_road_signs_in_Israel', signCategory: 'infer' },
    { category: 'Road_signs_in_Israel', signCategory: 'infer' },
  ],
  is: [
    { category: 'SVG_road_signs_in_Iceland', signCategory: 'infer' },
    { category: 'Road_signs_in_Iceland', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Iceland', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Iceland', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Iceland', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Iceland', signCategory: 'mandatory' },
    { category: 'SVG_additional_road_signs_of_Iceland', signCategory: 'infer' },
  ],
  fi: [
    { category: 'SVG_road_signs_in_Finland', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Finland', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Finland', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Finland', signCategory: 'prohibitory' },
    { category: 'SVG_regulatory_road_signs_of_Finland', signCategory: 'prohibitory' },
    { category: 'SVG_special_regulation_road_signs_of_Finland', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Finland', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_in_Finland', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Finland', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Åland', signCategory: 'infer' },
  ],
  fr: [{ category: 'SVG_road_signs_in_France', signCategory: 'infer' }],
  gr: [{ category: 'SVG_road_signs_in_Greece', signCategory: 'infer' }],
  hr: [{ category: 'SVG_road_signs_in_Croatia', signCategory: 'infer' }],
  hu: [{ category: 'SVG_road_signs_in_Hungary', signCategory: 'infer' }],
  ie: [
    { category: 'Road_signs_in_Ireland', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Ireland', signCategory: 'infer' },
  ],
  in: [
    { category: 'Road_signs_in_India', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_India', signCategory: 'infer' },
  ],
  it: [{ category: 'SVG_road_signs_in_Italy', signCategory: 'infer' }],
  jp: [{ category: 'Road_signs_in_Japan', signCategory: 'infer' }],
  kr: [
    { category: 'Road_signs_in_South_Korea', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_South_Korea', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_South_Korea', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_South_Korea', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_South_Korea', signCategory: 'prohibitory' },
    { category: 'SVG_regulatory_road_signs_of_South_Korea', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_South_Korea', signCategory: 'mandatory' },
    { category: 'SVG_additional_road_signs_of_South_Korea', signCategory: 'infer' },
  ],
  li: [
    { category: 'SVG_road_signs_in_Liechtenstein', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Switzerland', signCategory: 'infer' },
  ],
  lt: [{ category: 'SVG_road_signs_in_Lithuania', signCategory: 'infer' }],
  lu: [
    { category: 'SVG_warning_road_signs_of_Luxembourg', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Luxembourg', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Luxembourg', signCategory: 'prohibitory' },
    { category: 'SVG_parking_road_signs_of_Luxembourg', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Luxembourg', signCategory: 'mandatory' },
    { category: 'SVG_lane_road_signs_of_Luxembourg', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Luxembourg', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Luxembourg', signCategory: 'information' },
    { category: 'SVG_zonal_road_signs_of_Luxembourg', signCategory: 'information' },
  ],
  lv: [{ category: 'SVG_road_signs_in_Latvia', signCategory: 'infer' }],
  ma: [
    { category: 'SVG_road_signs_in_Morocco', signCategory: 'infer' },
    { category: 'Road_signs_in_Morocco', signCategory: 'infer' },
  ],
  me: [
    { category: 'SVG_road_signs_in_Montenegro', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Montenegro', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Montenegro', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Montenegro', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Montenegro', signCategory: 'mandatory' },
    { category: 'SVG_service_road_signs_of_Montenegro', signCategory: 'information' },
    { category: 'SVG_road_signs_in_Yugoslavia', signCategory: 'infer' },
  ],
  mg: [
    { category: 'SVG_road_signs_in_Madagascar', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Madagascar', signCategory: 'warning' },
    { category: 'SVG_mandatory_road_signs_of_Madagascar', signCategory: 'mandatory' },
    { category: 'SVG_prohibitory_road_signs_of_Madagascar', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  my: [
    { category: 'SVG_road_signs_in_Malaysia', signCategory: 'infer' },
    { category: 'Road_signs_in_Malaysia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Malaysia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Malaysia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Malaysia', signCategory: 'prohibitory' },
    { category: 'SVG_regulatory_road_signs_of_Malaysia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Malaysia', signCategory: 'mandatory' },
    { category: 'SVG_diagrams_of_route_signs_of_Malaysia', signCategory: 'information' },
  ],
  mk: [
    { category: 'SVG_road_signs_in_North_Macedonia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_North_Macedonia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_North_Macedonia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_North_Macedonia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_North_Macedonia', signCategory: 'mandatory' },
  ],
  mt: [
    { category: 'SVG_road_signs_in_Malta', signCategory: 'infer' },
    { category: 'Road_signs_in_Malta', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Malta', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Malta', signCategory: 'prohibitory' },
  ],
  mu: [{ category: 'SVG_road_signs_in_Mauritius', signCategory: 'infer' }],
  mx: [
    { category: 'SVG_road_signs_in_Mexico', signCategory: 'infer' },
    { category: 'Road_signs_in_Mexico', signCategory: 'infer' },
  ],
  nl: [
    { category: 'SVG_road_signs_in_the_Netherlands', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_the_Netherlands', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_the_Netherlands', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_the_Netherlands', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_the_Netherlands', signCategory: 'mandatory' },
    { category: 'SVG_additional_road_signs_of_the_Netherlands', signCategory: 'infer' },
  ],
  no: [{ category: 'SVG_road_signs_in_Norway', signCategory: 'infer' }],
  nz: [
    { category: 'Road_signs_in_New_Zealand', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_New_Zealand', signCategory: 'infer' },
  ],
  pe: [
    { category: 'SVG_road_signs_in_Peru', signCategory: 'infer' },
    { category: 'Road_signs_in_Peru', signCategory: 'infer' },
  ],
  pl: [
    { category: 'SVG_road_signs_in_Poland', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Poland', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Poland', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Poland', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Poland', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Poland', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Poland', signCategory: 'infer' },
  ],
  pt: [{ category: 'SVG_road_signs_in_Portugal', signCategory: 'infer' }],
  ro: [{ category: 'SVG_road_signs_in_Romania', signCategory: 'infer' }],
  th: [
    { category: 'Road_signs_in_Thailand', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Thailand', signCategory: 'infer' },
  ],
  tr: [
    { category: 'SVG_road_signs_in_Turkey', signCategory: 'infer' },
    { category: 'Road_signs_in_Turkey', signCategory: 'infer' },
  ],
  tw: [
    { category: 'Road_signs_in_Taiwan', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Taiwan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Taiwan', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Taiwan', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Taiwan', signCategory: 'prohibitory' },
    { category: 'SVG_regulatory_road_signs_of_Taiwan', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Taiwan', signCategory: 'mandatory' },
    { category: 'SVG_direction_road_signs_in_Taiwan', signCategory: 'information' },
    { category: 'SVG_service_road_signs_in_Taiwan', signCategory: 'information' },
  ],
  rs: [{ category: 'SVG_road_signs_in_Serbia', signCategory: 'infer' }],
  sg: [
    { category: 'SVG_road_signs_in_Singapore', signCategory: 'infer' },
    { category: 'Road_signs_in_Singapore', signCategory: 'infer' },
  ],
  se: [
    { category: 'SVG_road_signs_in_Sweden', signCategory: 'infer' },
    { category: 'Road_signs_in_Sweden', signCategory: 'infer' },
  ],
  si: [{ category: 'SVG_road_signs_in_Slovenia', signCategory: 'infer' }],
  sk: [{ category: 'SVG_road_signs_in_Slovakia', signCategory: 'infer' }],
  ua: [{ category: 'SVG_road_signs_in_Ukraine', signCategory: 'infer' }],
  uk: [
    { category: 'Warning_signs_of_the_United_Kingdom', signCategory: 'warning' },
    { category: 'Regulatory_signs_of_the_United_Kingdom', signCategory: 'regulatory' },
    { category: 'Information_signs_of_the_United_Kingdom', signCategory: 'information' },
    { category: 'Direction_signs_of_the_United_Kingdom', signCategory: 'direction' },
    { category: 'Road_works_signs_of_the_United_Kingdom', signCategory: 'temporary' },
    { category: 'SVG_road_signs_in_the_United_Kingdom', signCategory: 'infer' },
  ],
  us: [], // FHWA source, no Commons categories
  uy: [
    { category: 'SVG_road_signs_in_Uruguay', signCategory: 'infer' },
    { category: 'Road_signs_in_Uruguay', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Uruguay', signCategory: 'warning' },
  ],
  // New countries — batch 2
  am: [
    { category: 'SVG_road_signs_in_Armenia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Armenia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Armenia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Armenia', signCategory: 'prohibitory' },
    { category: 'SVG_information_road_signs_of_Armenia', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Armenia', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Armenia', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Armenia', signCategory: 'prohibitory' },
    { category: 'SVG_special_regulation_road_signs_of_Armenia', signCategory: 'information' },
    { category: 'SVG_diagrams_of_route_signs_of_Armenia', signCategory: 'information' },
  ],
  az: [
    { category: 'SVG_road_signs_in_Azerbaijan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Azerbaijan', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Azerbaijan', signCategory: 'prohibitory' },
    { category: 'SVG_information_road_signs_of_Azerbaijan', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Azerbaijan', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Azerbaijan', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Azerbaijan', signCategory: 'prohibitory' },
    { category: 'SVG_diagrams_of_route_signs_of_Azerbaijan', signCategory: 'information' },
  ],
  bd: [
    { category: 'SVG_road_signs_in_Bangladesh', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Bangladesh', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Bangladesh', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Bangladesh', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Bangladesh', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_in_Bangladesh', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Bangladesh', signCategory: 'prohibitory' },
    { category: 'SVG_additional_road_signs_of_Bangladesh', signCategory: 'information' },
  ],
  bo: [
    { category: 'SVG_road_signs_in_Bolivia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Bolivia', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Bolivia', signCategory: 'prohibitory' },
  ],
  dz: [
    { category: 'SVG_road_signs_in_Algeria', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Algeria', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Algeria', signCategory: 'prohibitory' },
  ],
  gt: [
    { category: 'SVG_road_signs_in_Guatemala', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Guatemala', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Guatemala', signCategory: 'prohibitory' },
    { category: 'SVG_temporary_road_signs_of_Guatemala', signCategory: 'warning' },
    {
      category: 'SVG_road_signs_in_the_Central_American_Integration_System',
      signCategory: 'infer',
    },
  ],
  hn: [
    { category: 'SVG_road_signs_in_Honduras', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Honduras', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Honduras', signCategory: 'prohibitory' },
    { category: 'SVG_temporary_road_signs_of_Honduras', signCategory: 'warning' },
    {
      category: 'SVG_road_signs_in_the_Central_American_Integration_System',
      signCategory: 'infer',
    },
  ],
  jo: [
    { category: 'SVG_road_signs_in_Jordan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_in_Jordan', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Jordan', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Jordan', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Jordan', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_in_Jordan', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Jordan', signCategory: 'prohibitory' },
    { category: 'SVG_additional_road_signs_of_Jordan', signCategory: 'information' },
  ],
  kh: [
    { category: 'SVG_road_signs_in_Cambodia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Cambodia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Cambodia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Cambodia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Cambodia', signCategory: 'mandatory' },
    { category: 'SVG_regulatory_road_signs_of_Cambodia', signCategory: 'prohibitory' },
    { category: 'SVG_additional_road_signs_of_Cambodia', signCategory: 'information' },
  ],
  kw: [
    { category: 'SVG_road_signs_in_Kuwait', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Kuwait', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Kuwait', signCategory: 'prohibitory' },
  ],
  kz: [
    { category: 'SVG_road_signs_in_Kazakhstan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Kazakhstan', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Kazakhstan', signCategory: 'prohibitory' },
    { category: 'SVG_information_road_signs_of_Kazakhstan', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Kazakhstan', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Kazakhstan', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Kazakhstan', signCategory: 'prohibitory' },
  ],
  lb: [],
  lk: [
    { category: 'SVG_road_signs_in_Sri_Lanka', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Sri_Lanka', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Sri_Lanka', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Sri_Lanka', signCategory: 'prohibitory' },
    { category: 'SVG_regulatory_road_signs_of_Sri_Lanka', signCategory: 'prohibitory' },
    { category: 'SVG_additional_road_signs_of_Sri_Lanka', signCategory: 'information' },
  ],
  ly: [
    { category: 'SVG_road_signs_in_Libya', signCategory: 'infer' },
    { category: 'Diagrams_of_road_signs_of_Libya', signCategory: 'infer' },
  ],
  md: [
    { category: 'SVG_road_signs_in_Moldova', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Moldova', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Moldova', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Moldova', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Moldova', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Moldova', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Moldova', signCategory: 'information' },
    { category: 'SVG_tourist_road_signs_of_Moldova', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Moldova', signCategory: 'information' },
    { category: 'SVG_diagrams_of_route_signs_of_Moldova', signCategory: 'information' },
  ],
  mm: [
    { category: 'SVG_warning_road_signs_of_Myanmar', signCategory: 'warning' },
    { category: 'Diagrams_of_road_signs_of_Myanmar', signCategory: 'infer' },
  ],
  om: [
    { category: 'SVG_road_signs_in_Oman', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Oman', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Oman', signCategory: 'prohibitory' },
    { category: 'SVG_information_road_signs_of_Oman', signCategory: 'information' },
  ],
  pa: [
    { category: 'SVG_road_signs_in_Panama', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Panama', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Panama', signCategory: 'prohibitory' },
  ],
  pk: [
    { category: 'SVG_road_signs_in_Pakistan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Pakistan', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Pakistan', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Pakistan', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Pakistan', signCategory: 'mandatory' },
    { category: 'SVG_regulatory_road_signs_of_Pakistan', signCategory: 'prohibitory' },
  ],
  py: [
    { category: 'SVG_road_signs_in_Paraguay', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Paraguay', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Paraguay', signCategory: 'prohibitory' },
    { category: 'SVG_information_road_signs_of_Paraguay', signCategory: 'information' },
  ],
  qa: [
    { category: 'SVG_road_signs_in_Qatar', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Qatar', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Qatar', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Qatar', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Qatar', signCategory: 'mandatory' },
    { category: 'SVG_regulatory_road_signs_of_Qatar', signCategory: 'prohibitory' },
    { category: 'SVG_additional_road_signs_of_Qatar', signCategory: 'information' },
  ],
  tn: [
    { category: 'SVG_road_signs_in_Tunisia', signCategory: 'infer' },
    { category: 'Diagrams_of_road_signs_of_Tunisia', signCategory: 'infer' },
  ],
  ve: [
    { category: 'SVG_road_signs_in_Venezuela', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Venezuela', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Venezuela', signCategory: 'prohibitory' },
    { category: 'SVG_school_road_signs_of_Venezuela', signCategory: 'warning' },
  ],
  // New countries — batch 1
  ae: [
    { category: 'SVG_road_signs_in_the_United_Arab_Emirates', signCategory: 'infer' },
    {
      category: 'SVG_regulatory_road_signs_of_the_United_Arab_Emirates',
      signCategory: 'prohibitory',
    },
    { category: 'SVG_warning_road_signs_of_the_United_Arab_Emirates', signCategory: 'warning' },
  ],
  by: [
    { category: 'SVG_road_signs_in_Belarus', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Belarus', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Belarus', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Belarus', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Belarus', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Belarus', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Belarus', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Belarus', signCategory: 'information' },
  ],
  cn: [
    { category: 'SVG_road_signs_in_China', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_China', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_China', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_China', signCategory: 'mandatory' },
    { category: 'SVG_priority_road_signs_of_China', signCategory: 'priority' },
    { category: 'SVG_information_road_signs_of_China', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_China', signCategory: 'information' },
  ],
  eg: [
    { category: 'SVG_road_signs_in_Egypt', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Egypt', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Egypt', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Egypt', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Egypt', signCategory: 'mandatory' },
    { category: 'SVG_regulatory_road_signs_of_Egypt', signCategory: 'prohibitory' },
  ],
  ge: [
    { category: 'SVG_road_signs_in_Georgia_(country)', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Georgia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Georgia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Georgia', signCategory: 'prohibitory' },
    { category: 'SVG_information_road_signs_of_Georgia', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Georgia', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Georgia', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Georgia', signCategory: 'prohibitory' },
    { category: 'SVG_special_regulation_road_signs_of_Georgia', signCategory: 'information' },
  ],
  id: [
    { category: 'SVG_road_signs_in_Indonesia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Indonesia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Indonesia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Indonesia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Indonesia', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Indonesia', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Indonesia', signCategory: 'information' },
    { category: 'SVG_diagrams_of_route_signs_of_Indonesia', signCategory: 'information' },
  ],
  ke: [
    { category: 'SVG_road_signs_in_Kenya', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Kenya', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Kenya', signCategory: 'priority' },
  ],
  ng: [
    { category: 'SVG_road_signs_in_Nigeria', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Nigeria', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Nigeria', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Nigeria', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Nigeria', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Nigeria', signCategory: 'information' },
  ],
  ph: [
    { category: 'SVG_road_signs_in_the_Philippines', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_the_Philippines', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_the_Philippines', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_the_Philippines', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_the_Philippines', signCategory: 'mandatory' },
    { category: 'SVG_regulatory_road_signs_of_the_Philippines', signCategory: 'prohibitory' },
    { category: 'SVG_combination_road_signs_of_the_Philippines', signCategory: 'information' },
  ],
  ru: [
    { category: 'SVG_road_signs_in_Russia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Russia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Russia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Russia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Russia', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Russia', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Russia', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Russia', signCategory: 'information' },
    { category: 'SVG_special_regulation_road_signs_of_Russia', signCategory: 'information' },
  ],
  sa: [
    { category: 'SVG_road_signs_in_Saudi_Arabia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Saudi_Arabia', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Saudi_Arabia', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Saudi_Arabia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Saudi_Arabia', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Saudi_Arabia', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Saudi_Arabia', signCategory: 'prohibitory' },
    { category: 'SVG_diagrams_of_route_signs_of_Saudi_Arabia', signCategory: 'information' },
  ],
  vn: [
    { category: 'SVG_road_signs_in_Vietnam', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Vietnam', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Vietnam', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Vietnam', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Vietnam', signCategory: 'mandatory' },
    { category: 'SVG_additional_road_signs_of_Vietnam', signCategory: 'information' },
    { category: 'SVG_regulatory_road_signs_of_Vietnam', signCategory: 'prohibitory' },
  ],
  za: [
    { category: 'SVG_road_signs_in_South_Africa', signCategory: 'infer' },
    { category: 'Road_signs_in_South_Africa', signCategory: 'infer' },
  ],
  // Batch 3
  bz: [
    { category: 'SVG_road_signs_in_Belize', signCategory: 'infer' },
    {
      category: 'SVG_road_signs_in_the_Central_American_Integration_System',
      signCategory: 'infer',
    },
  ],
  cu: [
    { category: 'SVG_road_signs_in_Cuba', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Cuba', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Cuba', signCategory: 'prohibitory' },
  ],
  do: [
    { category: 'SVG_road_signs_in_the_Dominican_Republic', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_the_Dominican_Republic', signCategory: 'warning' },
  ],
  et: [
    { category: 'SVG_road_signs_in_Ethiopia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Ethiopia', signCategory: 'warning' },
  ],
  gh: [
    { category: 'SVG_road_signs_in_Ghana', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Ghana', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Ghana', signCategory: 'prohibitory' },
  ],
  kg: [
    { category: 'SVG_road_signs_in_Kyrgyzstan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Kyrgyzstan', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Kyrgyzstan', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Kyrgyzstan', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Kyrgyzstan', signCategory: 'information' },
  ],
  la: [
    { category: 'SVG_road_signs_in_Laos', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Laos', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Laos', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Laos', signCategory: 'mandatory' },
  ],
  mn: [
    { category: 'SVG_road_signs_in_Mongolia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Mongolia', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Mongolia', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Mongolia', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Mongolia', signCategory: 'information' },
  ],
  ni: [
    { category: 'SVG_road_signs_in_Nicaragua', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Nicaragua', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Nicaragua', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Central_American_Integration_System',
      signCategory: 'infer',
    },
  ],
  np: [
    { category: 'SVG_road_signs_in_Nepal', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Nepal', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Nepal', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Nepal', signCategory: 'mandatory' },
  ],
  sv: [
    { category: 'SVG_road_signs_in_El_Salvador', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_El_Salvador', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_El_Salvador', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Central_American_Integration_System',
      signCategory: 'infer',
    },
  ],
  tj: [
    { category: 'SVG_road_signs_in_Tajikistan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Tajikistan', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_Tajikistan', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Tajikistan', signCategory: 'mandatory' },
  ],
  tm: [{ category: 'SVG_road_signs_in_Turkmenistan', signCategory: 'infer' }],
  tz: [
    { category: 'SVG_road_signs_in_Tanzania', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Tanzania', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Tanzania', signCategory: 'prohibitory' },
  ],
  uz: [
    { category: 'SVG_road_signs_in_Uzbekistan', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Uzbekistan', signCategory: 'warning' },
    { category: 'SVG_priority_road_signs_of_Uzbekistan', signCategory: 'priority' },
    { category: 'SVG_prohibitory_road_signs_of_Uzbekistan', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Uzbekistan', signCategory: 'mandatory' },
    { category: 'SVG_information_road_signs_of_Uzbekistan', signCategory: 'information' },
    { category: 'SVG_service_road_signs_of_Uzbekistan', signCategory: 'information' },
    { category: 'SVG_additional_road_signs_of_Uzbekistan', signCategory: 'information' },
  ],
  zw: [
    { category: 'SVG_road_signs_in_Zimbabwe', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Zimbabwe', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Zimbabwe', signCategory: 'prohibitory' },
  ],
  // Batch 4
  ad: [{ category: 'SVG_road_signs_in_Andorra', signCategory: 'infer' }],
  bw: [
    { category: 'SVG_road_signs_in_Botswana', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Botswana', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Botswana', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  ci: [
    { category: 'SVG_road_signs_in_Ivory_Coast', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Ivory_Coast', signCategory: 'warning' },
  ],
  cm: [
    { category: 'SVG_road_signs_in_Cameroon', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Cameroon', signCategory: 'warning' },
  ],
  fj: [{ category: 'SVG_road_signs_in_Fiji', signCategory: 'infer' }],
  gy: [
    { category: 'SVG_road_signs_in_Guyana', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Guyana', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Guyana', signCategory: 'prohibitory' },
  ],
  ht: [
    { category: 'SVG_road_signs_in_Haiti', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Haiti', signCategory: 'warning' },
  ],
  ag: [{ category: 'Diagrams_of_road_signs_of_Antigua_and_Barbuda', signCategory: 'infer' }],
  bb: [{ category: 'SVG_road_signs_in_Barbados', signCategory: 'infer' }],
  bs: [{ category: 'Diagrams_of_road_signs_of_the_Bahamas', signCategory: 'infer' }],
  dm: [{ category: 'Diagrams_of_road_signs_of_Dominica', signCategory: 'infer' }],
  gd: [{ category: 'SVG_road_signs_in_Grenada', signCategory: 'infer' }],
  kn: [{ category: 'SVG_road_signs_in_Saint_Kitts_and_Nevis', signCategory: 'infer' }],
  lc: [{ category: 'SVG_road_signs_in_Saint_Lucia', signCategory: 'infer' }],
  sr: [
    { category: 'SVG_road_signs_in_Suriname', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_the_Netherlands', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_the_Netherlands', signCategory: 'warning' },
    { category: 'SVG_prohibitory_road_signs_of_the_Netherlands', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_the_Netherlands', signCategory: 'mandatory' },
    { category: 'SVG_priority_road_signs_of_the_Netherlands', signCategory: 'priority' },
    { category: 'SVG_additional_road_signs_of_the_Netherlands', signCategory: 'information' },
  ],
  vc: [{ category: 'SVG_road_signs_in_Saint_Vincent_and_the_Grenadines', signCategory: 'infer' }],
  iq: [
    { category: 'SVG_road_signs_in_Iraq', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Iraq', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Iraq', signCategory: 'prohibitory' },
  ],
  ir: [
    { category: 'SVG_road_signs_in_Iran', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Iran', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Iran', signCategory: 'prohibitory' },
    { category: 'SVG_mandatory_road_signs_of_Iran', signCategory: 'mandatory' },
  ],
  jm: [
    { category: 'SVG_road_signs_in_Jamaica', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Jamaica', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Jamaica', signCategory: 'prohibitory' },
  ],
  mc: [
    { category: 'SVG_road_signs_in_Monaco', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_France', signCategory: 'infer' },
  ],
  mz: [
    { category: 'SVG_road_signs_in_Mozambique', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Mozambique', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Mozambique', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  na: [
    { category: 'SVG_road_signs_in_Namibia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Namibia', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Namibia', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  pg: [{ category: 'SVG_road_signs_in_Papua_New_Guinea', signCategory: 'infer' }],
  rw: [
    { category: 'SVG_road_signs_in_Rwanda', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Rwanda', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Rwanda', signCategory: 'prohibitory' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  sm: [
    { category: 'SVG_road_signs_in_San_Marino', signCategory: 'infer' },
    { category: 'SVG_road_signs_in_Italy', signCategory: 'infer' },
  ],
  sn: [
    { category: 'SVG_road_signs_in_Senegal', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Senegal', signCategory: 'warning' },
  ],
  sy: [
    { category: 'SVG_road_signs_in_Syria', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Syria', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Syria', signCategory: 'prohibitory' },
  ],
  tt: [
    { category: 'SVG_road_signs_in_Trinidad_and_Tobago', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Trinidad_and_Tobago', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Trinidad_and_Tobago', signCategory: 'prohibitory' },
  ],
  ug: [
    { category: 'SVG_road_signs_in_Uganda', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Uganda', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Uganda', signCategory: 'prohibitory' },
  ],
  ye: [
    { category: 'SVG_road_signs_in_Yemen', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Yemen', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Yemen', signCategory: 'prohibitory' },
  ],
  xk: [{ category: 'SVG_road_signs_in_Serbia', signCategory: 'infer' }],
  zm: [
    { category: 'SVG_road_signs_in_Zambia', signCategory: 'infer' },
    { category: 'SVG_warning_road_signs_of_Zambia', signCategory: 'warning' },
    { category: 'SVG_regulatory_road_signs_of_Zambia', signCategory: 'prohibitory' },
    { category: 'Diagrams_of_road_signs_of_Zambia', signCategory: 'infer' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  ao: [{ category: 'SVG_road_signs_in_Angola', signCategory: 'infer' }],
  ls: [
    { category: 'SVG_road_signs_in_Lesotho', signCategory: 'infer' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  sz: [
    { category: 'SVG_road_signs_in_Eswatini', signCategory: 'infer' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
  mw: [
    { category: 'SVG_road_signs_in_Malawi', signCategory: 'infer' },
    {
      category: 'SVG_road_signs_in_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
    {
      category: 'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'warning',
    },
    {
      category: 'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'mandatory',
    },
    {
      category: 'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
      signCategory: 'infer',
    },
  ],
};

// ---------------------------------------------------------------------------
// Code / category inference helpers
// ---------------------------------------------------------------------------

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Extract a sign code from a Commons filename, or fall back to the slugified
 * filename so nothing is skipped.
 */
const extractCode = (title: string): string => {
  const base = title
    .replace(/^File:/i, '')
    .replace(/\.svg$/i, '')
    .replace(/_/g, ' ');

  // Strip common country prefixes.
  const stripped = base
    .replace(/^CA-MUTCDC\s+/i, '')
    .replace(/^CA-[A-Z]{2}\s+road\s+sign\s+/i, '')
    .replace(/^Canada\s+road\s+sign\s+/i, '')
    .replace(/^Canada\s+/i, '')
    .replace(/^British\s+Columbia\s+/i, '')
    .replace(/^SVG\s+road\s+signs?\s+(?:of|in)\s+\w+\s*/i, '')
    .replace(/^(?:France|Germany|Italy|Spain|Sweden|Poland|Netherlands)\s+road\s+sign\s+/i, '')
    .replace(/^UK\s+traffic\s+sign\s+/i, '')
    .trim();

  // Try to match a real sign code: letters + numbers pattern.
  const codeMatch = stripped.toUpperCase().match(/\b([A-Z]{1,4}-?\d+(?:[.-]\d+)*[A-Z]{0,2})\b/);

  if (codeMatch) {
    const candidate = codeMatch[1];
    // Reject plain words (no digits).
    if (/\d/.test(candidate)) return candidate;
  }

  // Fallback: slugify the stripped name (or full base if stripping removed everything).
  return slugify(stripped || base) || slugify(base);
};

/**
 * Infer the sign category from the code prefix, with a sensible default.
 * Covers MUTCDC (CA), Vienna Convention (EU), SE, UK prefix patterns.
 */
const inferCategory = (code: string, cc: string): string => {
  const u = code.toUpperCase().replace(/[-_\s]/g, '');

  // CA — MUTCDC
  if (cc === 'ca') {
    if (u.startsWith('TC')) return 'temporary';
    if (u.startsWith('WC')) return 'school';
    if (u.startsWith('WA') || u.startsWith('WB') || u.startsWith('W')) return 'warning';
    if (u.startsWith('RA') || u.startsWith('RB') || u.startsWith('R')) return 'regulatory';
    if (u.startsWith('S')) return 'school';
    if (u.startsWith('T')) return 'temporary';
    if (u.startsWith('A')) return 'warning'; // QC
    if (u.startsWith('P')) return 'regulatory'; // QC
    if (u.startsWith('D') || /^[GIM]/.test(u)) return 'information';
  }

  // SE — Vägmärkesförordning
  if (cc === 'se') {
    if (u.startsWith('A')) return 'warning';
    if (u.startsWith('B')) return 'priority';
    if (u.startsWith('C')) return 'prohibitory';
    if (u.startsWith('D')) return 'mandatory';
    return 'information';
  }

  // UK — TSRGD numeric
  if (cc === 'uk') {
    const num = parseInt(u, 10);
    if (num >= 500 && num < 900) return 'warning';
    if (num >= 200 && num < 500) return 'regulatory';
    if (num >= 900) return 'temporary';
    return 'information';
  }

  // Norway / Finland — numeric codes (1xx warning, 2xx priority, 3xx prohibitory, 4xx mandatory)
  if (cc === 'no' || cc === 'fi') {
    const num = parseInt(u, 10);
    if (num >= 100 && num < 200) return 'warning';
    if (num >= 200 && num < 300) return 'priority';
    if (num >= 300 && num < 400) return 'prohibitory';
    if (num >= 400 && num < 500) return 'mandatory';
    return 'information';
  }

  // Switzerland — decimal codes (1.xx warning, 2.xx priority, 3.xx prohibitory, 4.xx mandatory)
  if (cc === 'ch') {
    const firstDigit = u[0];
    if (firstDigit === '1') return 'warning';
    if (firstDigit === '2') return 'priority';
    if (firstDigit === '3') return 'prohibitory';
    if (firstDigit === '4') return 'mandatory';
    return 'information';
  }

  // Brazil — CTB series letters
  if (cc === 'br') {
    if (u.startsWith('A')) return 'warning';
    if (u.startsWith('R')) return 'prohibitory';
    return 'information';
  }

  // Vienna Convention (AT, BE, DE, DK, ES, FR, IE, IT, NL, PL, PT, …)
  if (u.startsWith('A') || u.startsWith('J')) return 'warning';
  if (u.startsWith('B')) return 'priority';
  if (u.startsWith('C')) return 'prohibitory';
  if (u.startsWith('D')) return 'mandatory';

  return 'information';
};

// ---------------------------------------------------------------------------
// Commons API
// ---------------------------------------------------------------------------

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const fetchCommonsCategory = async (categoryName: string): Promise<string[]> => {
  const files: string[] = [];
  let continueParam = '';

  for (let page = 0; page < 20; page++) {
    const url =
      `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers` +
      `&cmtitle=Category:${encodeURIComponent(categoryName)}&cmtype=file&cmlimit=500` +
      `&cmcontinue=${encodeURIComponent(continueParam)}&format=json&origin=*`;

    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      console.warn(`  Commons API ${res.status} for ${categoryName}`);
      break;
    }

    const json = (await res.json()) as {
      query: { categorymembers: Array<{ title: string }> };
      continue?: { cmcontinue: string };
    };

    for (const m of json.query?.categorymembers ?? []) {
      if (m.title.toLowerCase().endsWith('.svg')) files.push(m.title);
    }

    if (!json.continue?.cmcontinue) break;
    continueParam = json.continue.cmcontinue;
    await sleep(150);
  }

  return files;
};

// ---------------------------------------------------------------------------
// Local asset helpers
// ---------------------------------------------------------------------------

const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const buildLocalPathTokens = (assetsRoot: string): Set<string> => {
  const files = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  // Only the basename token. The previous "any path containing token" rule
  // produced false positives where short remote names were swallowed by long
  // local paths (and vice versa), causing legitimately missing signs to be
  // marked as present.
  const tokens = new Set<string>();
  for (const f of files) tokens.add(normalise(path.basename(f, '.svg')));
  return tokens;
};

const isMissingLocally = (commonsTitle: string, localTokens: Set<string>): boolean => {
  const token = normalise(commonsTitle.replace(/^File:/i, '').replace(/\.svg$/i, ''));
  if (!token) return true;
  // Exact-match on the basename. Anything else gets downloaded — duplicates
  // are de-duped later by `dedup-scraped` / `update.ts`.
  return !localTokens.has(token);
};

// ---------------------------------------------------------------------------
// scraped.json helpers
// ---------------------------------------------------------------------------

interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string;
  category: string;
}

type ScrapedData = Record<string, ScrapedSign[]>;

const loadScraped = (cc: string): ScrapedData => {
  const p = path.join('data', cc, 'scraped.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf-8')) : {};
};

const saveScraped = (cc: string, data: ScrapedData): void => {
  const p = path.join('data', cc, 'scraped.json');
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
};

// ---------------------------------------------------------------------------
// Main fill logic per country
// ---------------------------------------------------------------------------

const fillCountry = async (cc: string): Promise<void> => {
  const entries = COMMONS_REGISTRY[cc];
  if (!entries || entries.length === 0) {
    console.log(`  No Commons categories registered for ${cc.toUpperCase()} — skipping`);
    return;
  }

  const pkgDir = path.join('packages', '@road-signs', cc);
  const assetsRoot = path.join(pkgDir, 'assets');
  const scraped = loadScraped(cc);

  // Build set of codes already in scraped.json to avoid duplicates.
  const existingCodes = new Set(
    Object.values(scraped)
      .flat()
      .map((s) => s.code),
  );

  let localTokens = buildLocalPathTokens(assetsRoot);
  let totalDownloaded = 0;
  let totalAdded = 0;

  for (const entry of entries) {
    console.log(`  [${cc}] ${entry.category}`);
    const remoteFiles = await fetchCommonsCategory(entry.category);
    const missing = remoteFiles.filter((f) => isMissingLocally(f, localTokens));

    if (missing.length === 0) {
      console.log(`    ✓ nothing missing (${remoteFiles.length} remote)`);
      continue;
    }

    console.log(`    ${missing.length} missing of ${remoteFiles.length} remote — downloading…`);

    for (const title of missing) {
      const code = extractCode(title);
      const signCategory =
        entry.signCategory === 'infer' ? inferCategory(code, cc) : entry.signCategory;

      const filePageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(title).replace(/%20/g, '_')}`;

      try {
        await processSign(assetsRoot, signCategory, code, filePageUrl);
        totalDownloaded++;

        // Refresh local token set so subsequent deduplication is accurate.
        localTokens = buildLocalPathTokens(assetsRoot);

        // Add to scraped.json if code is new.
        if (!existingCodes.has(code)) {
          const name =
            title
              .replace(/^File:/i, '')
              .replace(/\.svg$/i, '')
              .replace(/_/g, ' ')
              .replace(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '')
              .trim() || code;

          if (!scraped[signCategory]) scraped[signCategory] = [];
          scraped[signCategory].push({ code, name, imageUrl: filePageUrl, category: signCategory });
          existingCodes.add(code);
          totalAdded++;
        }
      } catch (err) {
        console.warn(`    ✗ ${code}: ${(err as Error).message}`);
      }
    }

    // Persist after each category so partial progress is saved.
    saveScraped(cc, scraped);
  }

  console.log(`  Done: ${totalDownloaded} downloaded, ${totalAdded} added to scraped.json`);

  if (totalDownloaded > 0) {
    console.log(`  Regenerating source…`);
    await generateSource(cc);
  }
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const ALL_COUNTRIES = Object.keys(COMMONS_REGISTRY).filter((cc) => COMMONS_REGISTRY[cc].length > 0);

const getCountries = (): string[] => {
  if (process.argv.includes('--all')) return ALL_COUNTRIES;
  const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  if (!cc) {
    console.error('Usage: yarn fill-gaps --country=XX | --all');
    process.exit(1);
  }
  if (!COMMONS_REGISTRY[cc]) {
    console.error(`Unknown country "${cc}". Known: ${ALL_COUNTRIES.join(', ')}`);
    process.exit(1);
  }
  return [cc];
};

(async () => {
  const countries = getCountries();
  console.log(`fill-gaps: ${countries.join(', ')}\n`);

  for (const cc of countries) {
    console.log(`\n=== ${cc.toUpperCase()} ===`);
    await fillCountry(cc);
  }

  console.log('\nAll done.');
})();
