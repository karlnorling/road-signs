/* oxlint-disable no-await-in-loop */

/**
 * verify.ts
 *
 * Checks completeness of road sign data for one or all countries.
 *
 * Checks:
 *   1. Coverage     — scraped signs (data/{cc}/scraped.json) vs SVG assets on disk
 *   2. Duplicates   — same code appearing in more than one category
 *   3. Commons gaps — remote SVG file count per Commons category vs local matches
 *                     (skipped with --no-network)
 *
 * Usage:
 *   yarn verify --country=ca
 *   yarn verify --all
 *   yarn verify --country=ca --no-network   # skip live Commons check
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: string;
}

type ScrapedData = Record<string, ScrapedSign[]>;

// ---------------------------------------------------------------------------
// Commons category registry — mirrors what each scraper uses.
// ---------------------------------------------------------------------------

const COMMONS_REGISTRY: Record<string, string[]> = {
  al: ['SVG_road_signs_in_Albania', 'Diagrams_of_warning_road_signs_of_Albania'],
  ao: ['SVG_road_signs_in_Angola'],
  ar: ['SVG_road_signs_in_Argentina', 'Road_signs_in_Argentina'],
  at: ['SVG_road_signs_in_Austria'],
  au: ['Road_signs_in_Australia', 'SVG_road_signs_in_Australia'],
  ba: ['SVG_road_signs_in_Bosnia_and_Herzegovina'],
  be: [
    'SVG_road_signs_in_Belgium',
    'SVG_warning_road_signs_of_Belgium',
    'SVG_new_warning_road_signs_of_Belgium',
    'SVG_priority_road_signs_of_Belgium',
    'SVG_new_priority_road_signs_of_Belgium',
    'SVG_prohibitory_road_signs_of_Belgium',
    'SVG_new_prohibitory_road_signs_of_Belgium',
    'SVG_parking_road_signs_of_Belgium',
    'SVG_new_parking_road_signs_of_Belgium',
    'SVG_mandatory_road_signs_of_Belgium',
    'SVG_new_mandatory_road_signs_of_Belgium',
    'SVG_information_road_signs_of_Belgium',
    'SVG_tourist_road_signs_of_Belgium',
    'SVG_additional_road_signs_of_Belgium',
  ],
  bg: ['SVG_road_signs_in_Bulgaria'],
  bn: [
    'SVG_road_signs_in_Brunei',
    'SVG_warning_road_signs_of_Brunei',
    'SVG_information_road_signs_of_Brunei',
    'SVG_prohibitory_road_signs_of_Brunei',
    'SVG_regulatory_road_signs_of_Brunei',
    'SVG_mandatory_road_signs_of_Brunei',
    'SVG_priority_road_signs_of_Brunei',
  ],
  br: ['Road_signs_in_Brazil', 'SVG_road_signs_in_Brazil'],
  cl: ['SVG_road_signs_in_Chile', 'Road_signs_in_Chile'],
  co: ['SVG_road_signs_in_Colombia', 'Road_signs_in_Colombia'],
  cr: ['SVG_road_signs_in_Costa_Rica', 'Road_signs_in_Costa_Rica'],
  cy: ['SVG_road_signs_in_Cyprus'],
  ca: [
    'SVG_regulatory_road_signs_of_Canada',
    'SVG_warning_road_signs_of_Canada',
    'SVG_school_road_signs_of_Canada',
    'SVG_temporary_road_signs_of_Canada',
    'SVG_road_signs_of_British_Columbia',
    'SVG_road_signs_of_Quebec',
    'SVG_road_signs_of_Ontario',
    'SVG_road_signs_of_Alberta',
    'SVG_road_signs_of_Manitoba',
    'SVG_road_signs_of_Nova_Scotia',
    'SVG_road_signs_of_New_Brunswick',
    'SVG_road_signs_of_Saskatchewan',
    'SVG_road_signs_of_Prince_Edward_Island',
    'SVG_road_signs_of_Newfoundland_and_Labrador',
  ],
  ch: ['SVG_road_signs_in_Switzerland'],
  de: ['SVG_road_signs_in_Germany', 'Warnschilder_(Deutschland)'],
  dk: ['SVG_road_signs_in_Denmark', 'Road_signs_in_Denmark'],
  ec: ['SVG_road_signs_in_Ecuador', 'Road_signs_in_Ecuador'],
  ee: ['SVG_road_signs_in_Estonia'],
  is: [
    'SVG_road_signs_in_Iceland',
    'Road_signs_in_Iceland',
    'SVG_warning_road_signs_of_Iceland',
    'SVG_priority_road_signs_of_Iceland',
    'SVG_prohibitory_road_signs_of_Iceland',
    'SVG_mandatory_road_signs_of_Iceland',
    'SVG_additional_road_signs_of_Iceland',
  ],
  es: ['SVG_road_signs_in_Spain'],
  fi: [
    'SVG_road_signs_in_Finland',
    'SVG_warning_road_signs_of_Finland',
    'SVG_priority_road_signs_of_Finland',
    'SVG_prohibitory_road_signs_of_Finland',
    'SVG_regulatory_road_signs_of_Finland',
    'SVG_special_regulation_road_signs_of_Finland',
    'SVG_mandatory_road_signs_of_Finland',
    'SVG_information_road_signs_in_Finland',
    'SVG_additional_road_signs_of_Finland',
    'SVG_road_signs_in_Åland',
  ],
  fr: ['SVG_road_signs_in_France'],
  cz: [
    'SVG_road_signs_in_the_Czech_Republic',
    'SVG_warning_road_signs_in_the_Czech_Republic',
    'SVG_priority_road_signs_of_the_Czech_Republic',
    'SVG_prohibitory_road_signs_of_the_Czech_Republic',
    'SVG_mandatory_road_signs_of_the_Czech_Republic',
    'SVG_information_road_signs_of_the_Czech_Republic',
    'SVG_additional_road_signs_in_the_Czech_Republic',
    'SVG_diagrams_of_route_signs_of_the_Czech_Republic',
  ],
  gr: ['SVG_road_signs_in_Greece'],
  hr: ['SVG_road_signs_in_Croatia'],
  hu: ['SVG_road_signs_in_Hungary'],
  ie: ['Road_signs_in_Ireland', 'SVG_road_signs_in_Ireland'],
  il: ['SVG_road_signs_in_Israel', 'Road_signs_in_Israel'],
  in: ['Road_signs_in_India', 'SVG_road_signs_in_India'],
  it: ['SVG_road_signs_in_Italy'],
  jp: ['Road_signs_in_Japan'],
  kp: ['SVG_road_signs_in_North_Korea'],
  kr: [
    'Road_signs_in_South_Korea',
    'SVG_road_signs_in_South_Korea',
    'SVG_warning_road_signs_of_South_Korea',
    'SVG_priority_road_signs_of_South_Korea',
    'SVG_prohibitory_road_signs_of_South_Korea',
    'SVG_regulatory_road_signs_of_South_Korea',
    'SVG_mandatory_road_signs_of_South_Korea',
    'SVG_additional_road_signs_of_South_Korea',
  ],
  li: ['SVG_road_signs_in_Liechtenstein', 'SVG_road_signs_in_Switzerland'],
  ls: [
    'SVG_road_signs_in_Lesotho',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  lt: ['SVG_road_signs_in_Lithuania'],
  lu: ['SVG_road_signs_in_Luxembourg'],
  lv: ['SVG_road_signs_in_Latvia'],
  ma: ['SVG_road_signs_in_Morocco', 'Road_signs_in_Morocco'],
  me: [
    'SVG_road_signs_in_Montenegro',
    'SVG_warning_road_signs_of_Montenegro',
    'SVG_priority_road_signs_of_Montenegro',
    'SVG_prohibitory_road_signs_of_Montenegro',
    'SVG_mandatory_road_signs_of_Montenegro',
    'SVG_service_road_signs_of_Montenegro',
    'SVG_road_signs_in_Yugoslavia',
  ],
  mg: [
    'SVG_road_signs_in_Madagascar',
    'SVG_warning_road_signs_of_Madagascar',
    'SVG_mandatory_road_signs_of_Madagascar',
    'SVG_prohibitory_road_signs_of_Madagascar',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  my: [
    'SVG_road_signs_in_Malaysia',
    'Road_signs_in_Malaysia',
    'SVG_warning_road_signs_of_Malaysia',
    'SVG_priority_road_signs_of_Malaysia',
    'SVG_prohibitory_road_signs_of_Malaysia',
    'SVG_regulatory_road_signs_of_Malaysia',
    'SVG_mandatory_road_signs_of_Malaysia',
    'SVG_diagrams_of_route_signs_of_Malaysia',
  ],
  mk: [
    'SVG_road_signs_in_North_Macedonia',
    'SVG_warning_road_signs_of_North_Macedonia',
    'SVG_priority_road_signs_of_North_Macedonia',
    'SVG_prohibitory_road_signs_of_North_Macedonia',
    'SVG_mandatory_road_signs_of_North_Macedonia',
  ],
  mt: [
    'SVG_road_signs_in_Malta',
    'Road_signs_in_Malta',
    'SVG_warning_road_signs_of_Malta',
    'SVG_prohibitory_road_signs_of_Malta',
  ],
  mu: ['SVG_road_signs_in_Mauritius'],
  mw: [
    'SVG_road_signs_in_Malawi',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  mx: ['SVG_road_signs_in_Mexico', 'Road_signs_in_Mexico'],
  nl: [
    'SVG_road_signs_in_the_Netherlands',
    'SVG_warning_road_signs_of_the_Netherlands',
    'SVG_priority_road_signs_of_the_Netherlands',
    'SVG_prohibitory_road_signs_of_the_Netherlands',
    'SVG_mandatory_road_signs_of_the_Netherlands',
    'SVG_additional_road_signs_of_the_Netherlands',
  ],
  no: ['SVG_road_signs_in_Norway'],
  nz: ['Road_signs_in_New_Zealand', 'SVG_road_signs_in_New_Zealand'],
  pe: ['SVG_road_signs_in_Peru', 'Road_signs_in_Peru'],
  pl: [
    'SVG_road_signs_in_Poland',
    'SVG_warning_road_signs_of_Poland',
    'SVG_priority_road_signs_of_Poland',
    'SVG_prohibitory_road_signs_of_Poland',
    'SVG_mandatory_road_signs_of_Poland',
    'SVG_information_road_signs_of_Poland',
    'SVG_additional_road_signs_of_Poland',
  ],
  pt: ['SVG_road_signs_in_Portugal'],
  ro: ['SVG_road_signs_in_Romania'],
  rs: ['SVG_road_signs_in_Serbia'],
  xk: ['SVG_road_signs_in_Serbia'],
  sg: ['SVG_road_signs_in_Singapore', 'Road_signs_in_Singapore'],
  th: ['Road_signs_in_Thailand', 'SVG_road_signs_in_Thailand'],
  tr: ['SVG_road_signs_in_Turkey', 'Road_signs_in_Turkey'],
  tw: [
    'Road_signs_in_Taiwan',
    'SVG_road_signs_in_Taiwan',
    'SVG_warning_road_signs_of_Taiwan',
    'SVG_priority_road_signs_of_Taiwan',
    'SVG_prohibitory_road_signs_of_Taiwan',
    'SVG_regulatory_road_signs_of_Taiwan',
    'SVG_mandatory_road_signs_of_Taiwan',
    'SVG_direction_road_signs_in_Taiwan',
    'SVG_service_road_signs_in_Taiwan',
  ],
  ua: ['SVG_road_signs_in_Ukraine'],
  se: ['SVG_road_signs_in_Sweden', 'Road_signs_in_Sweden'],
  si: ['SVG_road_signs_in_Slovenia'],
  sk: ['SVG_road_signs_in_Slovakia'],
  uk: [
    'Warning_signs_of_the_United_Kingdom',
    'Regulatory_signs_of_the_United_Kingdom',
    'Information_signs_of_the_United_Kingdom',
    'Direction_signs_of_the_United_Kingdom',
    'Road_works_signs_of_the_United_Kingdom',
    'SVG_road_signs_in_the_United_Kingdom',
  ],
  // US uses FHWA ZIP + Wikipedia — no Commons categories.
  us: [],
  uy: ['SVG_road_signs_in_Uruguay', 'Road_signs_in_Uruguay', 'SVG_warning_road_signs_of_Uruguay'],
  // New countries
  ae: [
    'SVG_road_signs_in_the_United_Arab_Emirates',
    'SVG_regulatory_road_signs_of_the_United_Arab_Emirates',
    'SVG_warning_road_signs_of_the_United_Arab_Emirates',
  ],
  by: [
    'SVG_road_signs_in_Belarus',
    'SVG_warning_road_signs_of_Belarus',
    'SVG_priority_road_signs_of_Belarus',
    'SVG_prohibitory_road_signs_of_Belarus',
    'SVG_mandatory_road_signs_of_Belarus',
    'SVG_information_road_signs_of_Belarus',
    'SVG_service_road_signs_of_Belarus',
    'SVG_additional_road_signs_of_Belarus',
  ],
  cn: [
    'SVG_road_signs_in_China',
    'SVG_warning_road_signs_of_China',
    'SVG_prohibitory_road_signs_of_China',
    'SVG_mandatory_road_signs_of_China',
    'SVG_information_road_signs_of_China',
  ],
  eg: ['SVG_road_signs_in_Egypt'],
  ge: [
    'SVG_road_signs_in_Georgia_(country)',
    'SVG_warning_road_signs_of_Georgia',
    'SVG_priority_road_signs_of_Georgia',
    'SVG_prohibitory_road_signs_of_Georgia',
    'SVG_information_road_signs_of_Georgia',
  ],
  id: [
    'SVG_road_signs_in_Indonesia',
    'SVG_warning_road_signs_of_Indonesia',
    'SVG_priority_road_signs_of_Indonesia',
    'SVG_prohibitory_road_signs_of_Indonesia',
    'SVG_mandatory_road_signs_of_Indonesia',
    'SVG_information_road_signs_of_Indonesia',
  ],
  ke: [
    'SVG_road_signs_in_Kenya',
    'SVG_warning_road_signs_of_Kenya',
    'SVG_priority_road_signs_of_Kenya',
  ],
  ng: [
    'SVG_road_signs_in_Nigeria',
    'SVG_warning_road_signs_of_Nigeria',
    'SVG_priority_road_signs_of_Nigeria',
    'SVG_prohibitory_road_signs_of_Nigeria',
    'SVG_mandatory_road_signs_of_Nigeria',
    'SVG_information_road_signs_of_Nigeria',
  ],
  ph: [
    'SVG_road_signs_in_the_Philippines',
    'SVG_warning_road_signs_of_the_Philippines',
    'SVG_prohibitory_road_signs_of_the_Philippines',
    'SVG_mandatory_road_signs_of_the_Philippines',
    'SVG_regulatory_road_signs_of_the_Philippines',
  ],
  ru: [
    'SVG_road_signs_in_Russia',
    'SVG_warning_road_signs_of_Russia',
    'SVG_priority_road_signs_of_Russia',
    'SVG_prohibitory_road_signs_of_Russia',
    'SVG_mandatory_road_signs_of_Russia',
    'SVG_information_road_signs_of_Russia',
    'SVG_service_road_signs_of_Russia',
    'SVG_additional_road_signs_of_Russia',
  ],
  sa: [
    'SVG_road_signs_in_Saudi_Arabia',
    'SVG_warning_road_signs_of_Saudi_Arabia',
    'SVG_prohibitory_road_signs_of_Saudi_Arabia',
    'SVG_mandatory_road_signs_of_Saudi_Arabia',
    'SVG_information_road_signs_of_Saudi_Arabia',
  ],
  vn: [
    'SVG_road_signs_in_Vietnam',
    'SVG_warning_road_signs_of_Vietnam',
    'SVG_prohibitory_road_signs_of_Vietnam',
    'SVG_mandatory_road_signs_of_Vietnam',
    'SVG_additional_road_signs_of_Vietnam',
  ],
  za: ['SVG_road_signs_in_South_Africa', 'Road_signs_in_South_Africa'],
  // Batch 3
  bz: ['SVG_road_signs_in_Belize', 'SVG_road_signs_in_the_Central_American_Integration_System'],
  cu: [
    'SVG_road_signs_in_Cuba',
    'SVG_warning_road_signs_of_Cuba',
    'SVG_regulatory_road_signs_of_Cuba',
  ],
  do: [
    'SVG_road_signs_in_the_Dominican_Republic',
    'SVG_warning_road_signs_of_the_Dominican_Republic',
  ],
  et: ['SVG_road_signs_in_Ethiopia', 'SVG_warning_road_signs_of_Ethiopia'],
  gh: [
    'SVG_road_signs_in_Ghana',
    'SVG_warning_road_signs_of_Ghana',
    'SVG_regulatory_road_signs_of_Ghana',
  ],
  kg: [
    'SVG_road_signs_in_Kyrgyzstan',
    'SVG_warning_road_signs_of_Kyrgyzstan',
    'SVG_prohibitory_road_signs_of_Kyrgyzstan',
    'SVG_mandatory_road_signs_of_Kyrgyzstan',
    'SVG_information_road_signs_of_Kyrgyzstan',
  ],
  la: [
    'SVG_road_signs_in_Laos',
    'SVG_warning_road_signs_of_Laos',
    'SVG_prohibitory_road_signs_of_Laos',
    'SVG_mandatory_road_signs_of_Laos',
  ],
  mn: [
    'SVG_road_signs_in_Mongolia',
    'SVG_warning_road_signs_of_Mongolia',
    'SVG_prohibitory_road_signs_of_Mongolia',
    'SVG_mandatory_road_signs_of_Mongolia',
    'SVG_information_road_signs_of_Mongolia',
  ],
  ni: [
    'SVG_road_signs_in_Nicaragua',
    'SVG_warning_road_signs_of_Nicaragua',
    'SVG_regulatory_road_signs_of_Nicaragua',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
  np: [
    'SVG_road_signs_in_Nepal',
    'SVG_warning_road_signs_of_Nepal',
    'SVG_prohibitory_road_signs_of_Nepal',
    'SVG_mandatory_road_signs_of_Nepal',
  ],
  sv: [
    'SVG_road_signs_in_El_Salvador',
    'SVG_warning_road_signs_of_El_Salvador',
    'SVG_regulatory_road_signs_of_El_Salvador',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
  tj: [
    'SVG_road_signs_in_Tajikistan',
    'SVG_warning_road_signs_of_Tajikistan',
    'SVG_prohibitory_road_signs_of_Tajikistan',
    'SVG_mandatory_road_signs_of_Tajikistan',
  ],
  tm: ['SVG_road_signs_in_Turkmenistan'],
  tz: [
    'SVG_road_signs_in_Tanzania',
    'SVG_warning_road_signs_of_Tanzania',
    'SVG_regulatory_road_signs_of_Tanzania',
  ],
  uz: [
    'SVG_road_signs_in_Uzbekistan',
    'SVG_warning_road_signs_of_Uzbekistan',
    'SVG_priority_road_signs_of_Uzbekistan',
    'SVG_prohibitory_road_signs_of_Uzbekistan',
    'SVG_mandatory_road_signs_of_Uzbekistan',
    'SVG_information_road_signs_of_Uzbekistan',
    'SVG_service_road_signs_of_Uzbekistan',
    'SVG_additional_road_signs_of_Uzbekistan',
  ],
  zw: [
    'SVG_road_signs_in_Zimbabwe',
    'SVG_warning_road_signs_of_Zimbabwe',
    'SVG_regulatory_road_signs_of_Zimbabwe',
  ],
  // Batch 4
  ad: ['SVG_road_signs_in_Andorra'],
  bw: [
    'SVG_road_signs_in_Botswana',
    'SVG_warning_road_signs_of_Botswana',
    'SVG_regulatory_road_signs_of_Botswana',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  ci: ['SVG_road_signs_in_Ivory_Coast', 'SVG_warning_road_signs_of_Ivory_Coast'],
  cm: ['SVG_road_signs_in_Cameroon', 'SVG_warning_road_signs_of_Cameroon'],
  ag: ['Diagrams_of_road_signs_of_Antigua_and_Barbuda'],
  bb: ['SVG_road_signs_in_Barbados'],
  bs: ['Diagrams_of_road_signs_of_the_Bahamas'],
  dm: ['Diagrams_of_road_signs_of_Dominica'],
  fj: ['SVG_road_signs_in_Fiji'],
  gd: ['SVG_road_signs_in_Grenada'],
  gy: [
    'SVG_road_signs_in_Guyana',
    'SVG_warning_road_signs_of_Guyana',
    'SVG_regulatory_road_signs_of_Guyana',
  ],
  ht: ['SVG_road_signs_in_Haiti', 'SVG_warning_road_signs_of_Haiti'],
  kn: ['SVG_road_signs_in_Saint_Kitts_and_Nevis'],
  lc: ['SVG_road_signs_in_Saint_Lucia'],
  sr: [
    'SVG_road_signs_in_Suriname',
    'SVG_road_signs_in_the_Netherlands',
    'SVG_warning_road_signs_of_the_Netherlands',
    'SVG_prohibitory_road_signs_of_the_Netherlands',
    'SVG_mandatory_road_signs_of_the_Netherlands',
    'SVG_priority_road_signs_of_the_Netherlands',
    'SVG_additional_road_signs_of_the_Netherlands',
  ],
  vc: ['SVG_road_signs_in_Saint_Vincent_and_the_Grenadines'],
  iq: [
    'SVG_road_signs_in_Iraq',
    'SVG_warning_road_signs_of_Iraq',
    'SVG_regulatory_road_signs_of_Iraq',
  ],
  ir: [
    'SVG_road_signs_in_Iran',
    'SVG_warning_road_signs_of_Iran',
    'SVG_regulatory_road_signs_of_Iran',
    'SVG_mandatory_road_signs_of_Iran',
  ],
  jm: [
    'SVG_road_signs_in_Jamaica',
    'SVG_warning_road_signs_of_Jamaica',
    'SVG_regulatory_road_signs_of_Jamaica',
  ],
  mc: ['SVG_road_signs_in_Monaco', 'SVG_road_signs_in_France'],
  mz: [
    'SVG_road_signs_in_Mozambique',
    'SVG_warning_road_signs_of_Mozambique',
    'SVG_regulatory_road_signs_of_Mozambique',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  na: [
    'SVG_road_signs_in_Namibia',
    'SVG_warning_road_signs_of_Namibia',
    'SVG_regulatory_road_signs_of_Namibia',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  pg: ['SVG_road_signs_in_Papua_New_Guinea'],
  rw: [
    'SVG_road_signs_in_Rwanda',
    'SVG_warning_road_signs_of_Rwanda',
    'SVG_regulatory_road_signs_of_Rwanda',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  sm: ['SVG_road_signs_in_San_Marino', 'SVG_road_signs_in_Italy'],
  sn: ['SVG_road_signs_in_Senegal', 'SVG_warning_road_signs_of_Senegal'],
  sy: [
    'SVG_road_signs_in_Syria',
    'SVG_warning_road_signs_of_Syria',
    'SVG_regulatory_road_signs_of_Syria',
  ],
  sz: [
    'SVG_road_signs_in_Eswatini',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  tt: [
    'SVG_road_signs_in_Trinidad_and_Tobago',
    'SVG_warning_road_signs_of_Trinidad_and_Tobago',
    'SVG_regulatory_road_signs_of_Trinidad_and_Tobago',
  ],
  ug: [
    'SVG_road_signs_in_Uganda',
    'SVG_warning_road_signs_of_Uganda',
    'SVG_regulatory_road_signs_of_Uganda',
  ],
  ye: [
    'SVG_road_signs_in_Yemen',
    'SVG_warning_road_signs_of_Yemen',
    'SVG_regulatory_road_signs_of_Yemen',
  ],
  zm: [
    'SVG_road_signs_in_Zambia',
    'SVG_warning_road_signs_of_Zambia',
    'SVG_regulatory_road_signs_of_Zambia',
    'Diagrams_of_road_signs_of_Zambia',
    'SVG_road_signs_in_the_Southern_African_Development_Community',
    'SVG_warning_road_signs_of_the_Southern_African_Development_Community',
    'SVG_mandatory_road_signs_of_the_Southern_African_Development_Community',
    'Diagrams_of_road_signs_of_the_Southern_African_Development_Community',
  ],
  // Batch 2
  am: [
    'SVG_road_signs_in_Armenia',
    'SVG_warning_road_signs_of_Armenia',
    'SVG_priority_road_signs_of_Armenia',
    'SVG_prohibitory_road_signs_of_Armenia',
    'SVG_mandatory_road_signs_of_Armenia',
    'SVG_information_road_signs_of_Armenia',
    'SVG_service_road_signs_of_Armenia',
    'SVG_additional_road_signs_of_Armenia',
    'SVG_special_regulation_road_signs_of_Armenia',
    'SVG_regulatory_road_signs_of_Armenia',
  ],
  az: [
    'SVG_road_signs_in_Azerbaijan',
    'SVG_warning_road_signs_of_Azerbaijan',
    'SVG_prohibitory_road_signs_of_Azerbaijan',
    'SVG_information_road_signs_of_Azerbaijan',
    'SVG_service_road_signs_of_Azerbaijan',
    'SVG_additional_road_signs_of_Azerbaijan',
    'SVG_regulatory_road_signs_of_Azerbaijan',
    'SVG_diagrams_of_route_signs_of_Azerbaijan',
  ],
  bd: [
    'SVG_road_signs_in_Bangladesh',
    'SVG_warning_road_signs_of_Bangladesh',
    'SVG_priority_road_signs_of_Bangladesh',
    'SVG_prohibitory_road_signs_of_Bangladesh',
    'SVG_mandatory_road_signs_of_Bangladesh',
    'SVG_information_road_signs_in_Bangladesh',
    'SVG_regulatory_road_signs_of_Bangladesh',
    'SVG_additional_road_signs_of_Bangladesh',
  ],
  bo: [
    'SVG_road_signs_in_Bolivia',
    'SVG_warning_road_signs_of_Bolivia',
    'SVG_regulatory_road_signs_of_Bolivia',
  ],
  dz: [
    'SVG_road_signs_in_Algeria',
    'SVG_warning_road_signs_of_Algeria',
    'SVG_regulatory_road_signs_of_Algeria',
  ],
  gt: [
    'SVG_road_signs_in_Guatemala',
    'SVG_warning_road_signs_of_Guatemala',
    'SVG_regulatory_road_signs_of_Guatemala',
    'SVG_temporary_road_signs_of_Guatemala',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
  hn: [
    'SVG_road_signs_in_Honduras',
    'SVG_warning_road_signs_of_Honduras',
    'SVG_regulatory_road_signs_of_Honduras',
    'SVG_temporary_road_signs_of_Honduras',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
  jo: [
    'SVG_road_signs_in_Jordan',
    'SVG_warning_road_signs_in_Jordan',
    'SVG_priority_road_signs_of_Jordan',
    'SVG_prohibitory_road_signs_of_Jordan',
    'SVG_mandatory_road_signs_of_Jordan',
    'SVG_information_road_signs_in_Jordan',
    'SVG_regulatory_road_signs_of_Jordan',
    'SVG_additional_road_signs_of_Jordan',
  ],
  kh: [
    'SVG_road_signs_in_Cambodia',
    'SVG_warning_road_signs_of_Cambodia',
    'SVG_priority_road_signs_of_Cambodia',
    'SVG_prohibitory_road_signs_of_Cambodia',
    'SVG_mandatory_road_signs_of_Cambodia',
    'SVG_regulatory_road_signs_of_Cambodia',
    'SVG_additional_road_signs_of_Cambodia',
  ],
  kw: [
    'SVG_road_signs_in_Kuwait',
    'SVG_warning_road_signs_of_Kuwait',
    'SVG_regulatory_road_signs_of_Kuwait',
  ],
  kz: [
    'SVG_road_signs_in_Kazakhstan',
    'SVG_warning_road_signs_of_Kazakhstan',
    'SVG_prohibitory_road_signs_of_Kazakhstan',
    'SVG_information_road_signs_of_Kazakhstan',
    'SVG_service_road_signs_of_Kazakhstan',
    'SVG_additional_road_signs_of_Kazakhstan',
    'SVG_regulatory_road_signs_of_Kazakhstan',
  ],
  lb: [],
  lk: [
    'SVG_road_signs_in_Sri_Lanka',
    'SVG_warning_road_signs_of_Sri_Lanka',
    'SVG_priority_road_signs_of_Sri_Lanka',
    'SVG_prohibitory_road_signs_of_Sri_Lanka',
    'SVG_regulatory_road_signs_of_Sri_Lanka',
    'SVG_additional_road_signs_of_Sri_Lanka',
  ],
  ly: ['SVG_road_signs_in_Libya', 'Diagrams_of_road_signs_of_Libya'],
  md: [
    'SVG_road_signs_in_Moldova',
    'SVG_warning_road_signs_of_Moldova',
    'SVG_priority_road_signs_of_Moldova',
    'SVG_prohibitory_road_signs_of_Moldova',
    'SVG_mandatory_road_signs_of_Moldova',
    'SVG_information_road_signs_of_Moldova',
    'SVG_service_road_signs_of_Moldova',
    'SVG_tourist_road_signs_of_Moldova',
    'SVG_additional_road_signs_of_Moldova',
    'SVG_diagrams_of_route_signs_of_Moldova',
  ],
  mm: ['SVG_warning_road_signs_of_Myanmar', 'Diagrams_of_road_signs_of_Myanmar'],
  om: [
    'SVG_road_signs_in_Oman',
    'SVG_warning_road_signs_of_Oman',
    'SVG_regulatory_road_signs_of_Oman',
    'SVG_information_road_signs_of_Oman',
  ],
  pa: [
    'SVG_road_signs_in_Panama',
    'SVG_warning_road_signs_of_Panama',
    'SVG_regulatory_road_signs_of_Panama',
  ],
  pk: [
    'SVG_road_signs_in_Pakistan',
    'SVG_warning_road_signs_of_Pakistan',
    'SVG_priority_road_signs_of_Pakistan',
    'SVG_prohibitory_road_signs_of_Pakistan',
    'SVG_mandatory_road_signs_of_Pakistan',
    'SVG_regulatory_road_signs_of_Pakistan',
  ],
  py: [
    'SVG_road_signs_in_Paraguay',
    'SVG_warning_road_signs_of_Paraguay',
    'SVG_regulatory_road_signs_of_Paraguay',
    'SVG_information_road_signs_of_Paraguay',
  ],
  qa: [
    'SVG_road_signs_in_Qatar',
    'SVG_warning_road_signs_of_Qatar',
    'SVG_priority_road_signs_of_Qatar',
    'SVG_prohibitory_road_signs_of_Qatar',
    'SVG_mandatory_road_signs_of_Qatar',
    'SVG_regulatory_road_signs_of_Qatar',
    'SVG_additional_road_signs_of_Qatar',
  ],
  tn: ['SVG_road_signs_in_Tunisia', 'Diagrams_of_road_signs_of_Tunisia'],
  ve: [
    'SVG_road_signs_in_Venezuela',
    'SVG_warning_road_signs_of_Venezuela',
    'SVG_regulatory_road_signs_of_Venezuela',
    'SVG_school_road_signs_of_Venezuela',
  ],
};

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; verify-script)';

// ---------------------------------------------------------------------------
// Commons API helpers
// ---------------------------------------------------------------------------

/** Fetch all SVG filenames in a Commons category (paginated). */
const fetchCommonsFiles = async (categoryName: string): Promise<string[]> => {
  const files: string[] = [];
  let continueParam = '';

  for (let page = 0; page < 20; page++) {
    const url =
      `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers` +
      `&cmtitle=Category:${encodeURIComponent(categoryName)}&cmtype=file&cmlimit=500` +
      `&cmcontinue=${encodeURIComponent(continueParam)}&format=json&origin=*`;

    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      console.warn(`  Warning: Commons API ${res.status} for ${categoryName}`);
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
  }

  return files;
};

// ---------------------------------------------------------------------------
// Local asset helpers
// ---------------------------------------------------------------------------

/** Normalise a filename or code to a comparable token: lowercase alphanumeric only. */
const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Load all local SVG filenames (basename without extension) for a country. */
const loadLocalSvgTokens = (cc: string): Set<string> => {
  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  const files = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  return new Set(files.map((f) => normalise(path.basename(f, '.svg'))));
};

/** Check whether a Commons filename has a local match. */
const hasLocalMatch = (commonsTitle: string, localTokens: Set<string>): boolean => {
  const token = normalise(commonsTitle.replace(/^File:/i, '').replace(/\.svg$/i, ''));
  // Direct match or substring: handles cases where local name is a prefix of Commons name.
  for (const local of localTokens) {
    if (local === token || local.includes(token) || token.includes(local)) return true;
  }
  return false;
};

// ---------------------------------------------------------------------------
// Verification checks
// ---------------------------------------------------------------------------

interface CategoryStats {
  scraped: number;
  withSvg: number;
}

interface CommonsResult {
  category: string;
  remote: number;
  localMatch: number;
  missing: string[];
}

interface VerifyResult {
  cc: string;
  totalScraped: number;
  totalWithSvg: number;
  categoryStats: Record<string, CategoryStats>;
  duplicates: Array<{ code: string; categories: string[] }>;
  missingCodes: Array<{ code: string; category: string; imageUrl: string | null }>;
  commons: CommonsResult[];
}

/** Pre-compute all normalised asset path tokens for a country (call once). */
const buildLocalPathTokens = (assetsRoot: string): string[] =>
  globSync(path.join(assetsRoot, '**', '*.svg'))
    .filter((f) => !/_\d+x\d+\.svg$/.test(f))
    .map((f) =>
      f
        .replace(/\\/g, '/')
        .toLowerCase()
        .replace(/[^a-z0-9/]/g, ''),
    );

const sanitize = (s: string): string =>
  s
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const svgExistsForCode = (code: string, pathTokens: string[], assetsRoot: string): boolean => {
  // Primary: check whether the canonical asset directory for this code contains an SVG.
  // This handles short codes like "A5" that token matching misses.
  const dirs = globSync(path.join(assetsRoot, '*', sanitize(code)));
  if (dirs.some((d) => globSync(path.join(d, '*.svg')).length > 0)) return true;

  // Secondary: token substring match (catches fill-gaps files with longer names).
  const token = normalise(code);
  if (token.length < 2) return false;
  return pathTokens.some((p) => p.includes(token));
};

const runChecks = async (cc: string, network: boolean): Promise<VerifyResult> => {
  const scrapedPath = path.join('data', cc, 'scraped.json');
  if (!fs.existsSync(scrapedPath)) {
    throw new Error(`No scraped data for "${cc}". Run: yarn update --country=${cc}`);
  }

  const scraped: ScrapedData = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));
  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  const pathTokens = buildLocalPathTokens(assetsRoot);

  // 1. Coverage + category stats
  const categoryStats: Record<string, CategoryStats> = {};
  const missingCodes: VerifyResult['missingCodes'] = [];

  for (const [category, signs] of Object.entries(scraped)) {
    categoryStats[category] = { scraped: signs.length, withSvg: 0 };
    for (const sign of signs) {
      if (svgExistsForCode(sign.code, pathTokens, assetsRoot)) {
        categoryStats[category].withSvg++;
      } else {
        missingCodes.push({ code: sign.code, category, imageUrl: sign.imageUrl });
      }
    }
  }

  const totalScraped = Object.values(categoryStats).reduce((s, c) => s + c.scraped, 0);
  const totalWithSvg = Object.values(categoryStats).reduce((s, c) => s + c.withSvg, 0);

  // 2. Duplicates — same code in multiple categories
  const codeMap = new Map<string, string[]>();
  for (const [category, signs] of Object.entries(scraped)) {
    for (const sign of signs) {
      const cats = codeMap.get(sign.code) ?? [];
      cats.push(category);
      codeMap.set(sign.code, cats);
    }
  }
  const duplicates = [...codeMap.entries()]
    .filter(([, cats]) => cats.length > 1)
    .map(([code, categories]) => ({ code, categories }));

  // 3. Commons gaps (network)
  const commons: CommonsResult[] = [];
  if (network) {
    const localTokens = loadLocalSvgTokens(cc);
    const categories = COMMONS_REGISTRY[cc] ?? [];

    for (const category of categories) {
      process.stdout.write(`  Checking Commons: ${category}…`);
      const remoteFiles = await fetchCommonsFiles(category);
      const missing = remoteFiles.filter((f) => !hasLocalMatch(f, localTokens));
      commons.push({
        category,
        remote: remoteFiles.length,
        localMatch: remoteFiles.length - missing.length,
        missing,
      });
      process.stdout.write(` ${remoteFiles.length} remote, ${missing.length} missing\n`);
    }
  }

  return { cc, totalScraped, totalWithSvg, categoryStats, duplicates, missingCodes, commons };
};

// ---------------------------------------------------------------------------
// Report printer
// ---------------------------------------------------------------------------

const pct = (n: number, total: number): string =>
  total === 0 ? '—' : `${Math.round((n / total) * 100)}%`;

const bar = (n: number, total: number, width = 20): string => {
  if (total === 0) return ' '.repeat(width);
  const filled = Math.round((n / total) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
};

const printReport = (r: VerifyResult): void => {
  const COUNTRY_NAMES: Record<string, string> = {
    ca: 'Canada',
    de: 'Germany',
    fr: 'France',
    it: 'Italy',
    es: 'Spain',
    nl: 'Netherlands',
    pl: 'Poland',
    se: 'Sweden',
    uk: 'United Kingdom',
    us: 'United States',
  };

  const name = COUNTRY_NAMES[r.cc] ?? r.cc.toUpperCase();
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ${r.cc.toUpperCase()}  ${name}`);
  console.log(`${'─'.repeat(60)}`);

  // Coverage summary
  const missing = r.totalScraped - r.totalWithSvg;
  console.log(`\nCoverage`);
  console.log(
    `  ${bar(r.totalWithSvg, r.totalScraped)}  ${r.totalWithSvg}/${r.totalScraped} signs have SVG  (${pct(r.totalWithSvg, r.totalScraped)})`,
  );
  if (missing > 0) {
    console.log(`  ⚠  ${missing} sign${missing !== 1 ? 's' : ''} scraped but no SVG downloaded`);
  } else {
    console.log(`  ✓  All scraped signs have SVG assets`);
  }

  // Per-category breakdown
  console.log(`\nBy category`);
  const catPad = Math.max(...Object.keys(r.categoryStats).map((c) => c.length));
  for (const [cat, stats] of Object.entries(r.categoryStats)) {
    const ok = stats.withSvg === stats.scraped;
    const flag = ok ? '✓' : '⚠';
    console.log(
      `  ${flag}  ${cat.padEnd(catPad)}  ${String(stats.withSvg).padStart(4)}/${String(stats.scraped).padEnd(4)}  ${bar(stats.withSvg, stats.scraped, 16)}  ${pct(stats.withSvg, stats.scraped)}`,
    );
  }

  // Duplicates
  console.log(`\nDuplicates`);
  if (r.duplicates.length === 0) {
    console.log(`  ✓  None`);
  } else {
    for (const { code, categories } of r.duplicates.slice(0, 20)) {
      console.log(`  ⚠  ${code}  →  ${categories.join(', ')}`);
    }
    if (r.duplicates.length > 20) {
      console.log(`  … and ${r.duplicates.length - 20} more`);
    }
  }

  // Missing SVGs detail
  if (r.missingCodes.length > 0) {
    console.log(`\nMissing SVGs (top 20)`);
    for (const { code, category, imageUrl } of r.missingCodes.slice(0, 20)) {
      const url = imageUrl ? `  ${imageUrl}` : '';
      console.log(`  ${code.padEnd(20)} [${category}]${url}`);
    }
    if (r.missingCodes.length > 20) {
      console.log(`  … and ${r.missingCodes.length - 20} more (run with --json to see all)`);
    }
  }

  // Commons gaps
  if (r.commons.length > 0) {
    console.log(`\nCommons categories`);
    const catWidth = Math.max(...r.commons.map((c) => c.category.length));
    for (const c of r.commons) {
      const ok = c.missing.length === 0;
      const flag = ok ? '✓' : '⚠';
      console.log(
        `  ${flag}  ${c.category.padEnd(catWidth)}  ${String(c.localMatch).padStart(4)}/${String(c.remote).padEnd(4)}  ${pct(c.localMatch, c.remote)}`,
      );
      if (!ok) {
        const sample = c.missing
          .slice(0, 3)
          .map((f) => f.replace('File:', ''))
          .join(', ');
        const more = c.missing.length > 3 ? ` … +${c.missing.length - 3} more` : '';
        console.log(`       Sample missing: ${sample}${more}`);
      }
    }
  } else if (COMMONS_REGISTRY[r.cc]?.length) {
    console.log(`\nCommons categories  (skipped — pass without --no-network to check live)`);
  }
};

// ---------------------------------------------------------------------------
// JSON output
// ---------------------------------------------------------------------------

const printJson = (results: VerifyResult[]): void => {
  console.log(JSON.stringify(results, null, 2));
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const ALL_COUNTRIES = Object.keys(COMMONS_REGISTRY);

const getCountries = (): string[] => {
  if (process.argv.includes('--all')) return ALL_COUNTRIES;
  const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  if (!cc) {
    console.error('Usage: yarn verify --country=XX | --all');
    process.exit(1);
  }
  if (!ALL_COUNTRIES.includes(cc)) {
    console.error(`Unknown country "${cc}". Known: ${ALL_COUNTRIES.join(', ')}`);
    process.exit(1);
  }
  return [cc];
};

(async () => {
  const countries = getCountries();
  const network = !process.argv.includes('--no-network');
  const json = process.argv.includes('--json');

  if (!json) {
    console.log(`Road signs verification  |  ${new Date().toISOString().slice(0, 10)}`);
    if (!network) console.log('(offline mode — Commons live check skipped)');
  }

  const results: VerifyResult[] = [];

  for (const cc of countries) {
    if (!json) process.stdout.write(`\nChecking ${cc.toUpperCase()}…\n`);
    try {
      const result = await runChecks(cc, network);
      results.push(result);
      if (!json) printReport(result);
    } catch (err) {
      console.error(`  Error: ${(err as Error).message}`);
    }
  }

  if (json) printJson(results);

  // Exit non-zero if any country has missing SVGs or duplicates.
  const hasIssues = results.some((r) => r.totalWithSvg < r.totalScraped || r.duplicates.length > 0);
  process.exit(hasIssues ? 1 : 0);
})();
