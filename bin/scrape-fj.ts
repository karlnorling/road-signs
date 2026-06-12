/**
 * scrape-fj.ts — Fiji
 * Fiji Roads Authority MOTSAM (Manual of Traffic Signs and Markings).
 * Run via: yarn update --country=fj
 *
 * Requires: brew install poppler
 *
 * The FRA server applies hotlink protection — the downloadHeaders below
 * supply the required Referer so the PDFs download successfully.
 *
 * PDF index:
 *   0 — Section 02: Regulatory General Signs  (RG-*)
 *   1 — Section 03: Regulatory Parking Signs  (RP-*)
 *   2 — Section 04: Permanent Warning Signs   (PW-*)
 *
 * Page number derivation:
 *   Section 02: PDF page = doc_page_number + 4  (covers 4 front pages)
 *   Section 03: PDF page = doc_page_number + 2
 *   Section 04: PDF page = doc_page_number + 4
 *
 * Multi-sign pages use crop: fractions (0–1) of the rendered page.
 */
import { createPdfScraper } from './scrape-pdf';

export default createPdfScraper({
  cc: 'fj',
  country: 'Fiji',
  renderDpi: 300,
  downloadHeaders: {
    Referer: 'https://www.fijiroads.org/index.php/motsam-documents/',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  pdfUrls: [
    'https://www.fijiroads.org/wp-content/uploads/2024/04/MOTSAM-Part-1-Signs-Section-02_V1.0-Regulatory-General-Signs.pdf',
    'https://www.fijiroads.org/wp-content/uploads/2024/04/MOTSAM-Part-1-Signs-Section-03_V0-4-3-Regulatory-Parking-Signs.pdf',
    'https://www.fijiroads.org/wp-content/uploads/2024/04/MOTSAM-Part-1-Signs-Section-04_V1.0-Permanent-Warning-Signs.pdf',
  ],
  signs: [
    // -----------------------------------------------------------------------
    // SECTION 02 — REGULATORY GENERAL SIGNS (RG-*)
    // pdfIndex: 0  |  PDF page = doc page suffix + 4
    // -----------------------------------------------------------------------

    // Speed / restriction
    { code: 'RG-1', name: 'Speed Limit', category: 'prohibitory', pdfIndex: 0, page: 5 },
    {
      code: 'RG-2.1',
      name: 'Speed Limit – Derestriction',
      category: 'information',
      pdfIndex: 0,
      page: 6,
    },
    {
      code: 'RG-4',
      name: 'Speed Limit – Temporary',
      category: 'prohibitory',
      pdfIndex: 0,
      page: 7,
    },

    // Stop / give way
    { code: 'RG-5', name: 'Stop', category: 'prohibitory', pdfIndex: 0, page: 8 },
    { code: 'RG-6', name: 'Give Way', category: 'priority', pdfIndex: 0, page: 9 },
    // RG-6.1/6.2/6.3 share page 10: top-left / top-right / bottom-left
    {
      code: 'RG-6.1',
      name: 'Give Way Supplementary Traffic',
      category: 'priority',
      pdfIndex: 0,
      page: 10,
      crop: { top: 0.07, left: 0.0, bottom: 0.47, right: 0.47 },
    },
    {
      code: 'RG-6.2',
      name: 'Give Way Supplementary Straight Ahead Traffic',
      category: 'priority',
      pdfIndex: 0,
      page: 10,
      crop: { top: 0.23, left: 0.45, bottom: 0.5, right: 1.0 },
    },
    {
      code: 'RG-6.3',
      name: 'Give Way Supplementary Right Turning Traffic',
      category: 'priority',
      pdfIndex: 0,
      page: 10,
      crop: { top: 0.48, left: 0.0, bottom: 0.93, right: 0.52 },
    },
    { code: 'RG-6R', name: 'Roundabout Give Way', category: 'priority', pdfIndex: 0, page: 11 },

    // Turn prohibitions
    { code: 'RG-7', name: 'No Right Turn', category: 'prohibitory', pdfIndex: 0, page: 12 },
    { code: 'RG-8', name: 'No Left Turn', category: 'prohibitory', pdfIndex: 0, page: 13 },
    { code: 'RG-9', name: 'No Entry', category: 'prohibitory', pdfIndex: 0, page: 14 },
    { code: 'RG-10', name: 'No Turns', category: 'prohibitory', pdfIndex: 0, page: 15 },

    // Mandatory turns / directions
    { code: 'RG-11', name: 'Turn', category: 'mandatory', pdfIndex: 0, page: 16 },
    { code: 'RG-12', name: 'Turn Left', category: 'mandatory', pdfIndex: 0, page: 17 },
    { code: 'RG-13', name: 'Turn Right', category: 'mandatory', pdfIndex: 0, page: 18 },
    { code: 'RG-14', name: 'One Way', category: 'information', pdfIndex: 0, page: 19 },
    { code: 'RG-15', name: 'No U-Turn', category: 'prohibitory', pdfIndex: 0, page: 20 },
    { code: 'RG-16', name: 'Road Closed', category: 'prohibitory', pdfIndex: 0, page: 21 },

    // Keep left — page 22 shared: top = single disc, bottom = twin disc
    {
      code: 'RG-17',
      name: 'Keep Left – Single Disc',
      category: 'mandatory',
      pdfIndex: 0,
      page: 22,
      crop: { top: 0.08, left: 0.0, bottom: 0.52, right: 0.65 },
    },
    {
      code: 'RG-17.1',
      name: 'Keep Left – Twin Disc',
      category: 'mandatory',
      pdfIndex: 0,
      page: 22,
      crop: { top: 0.52, left: 0.0, bottom: 0.97, right: 0.65 },
    },

    { code: 'RG-18', name: 'Wrong Way', category: 'prohibitory', pdfIndex: 0, page: 23 },

    // Single lane
    { code: 'RG-19', name: 'Single Lane – Give Way', category: 'priority', pdfIndex: 0, page: 24 },
    {
      code: 'RG-19.1',
      name: 'Single Lane – Supplementary Give Way',
      category: 'priority',
      pdfIndex: 0,
      page: 25,
    },
    { code: 'RG-20', name: 'Single Lane – Priority', category: 'priority', pdfIndex: 0, page: 26 },

    {
      code: 'RG-21',
      name: 'Low Overhead Clearance at Electrified Cables',
      category: 'prohibitory',
      pdfIndex: 0,
      page: 27,
    },
    {
      code: 'RG-22',
      name: 'Use Left Lane Unless Passing',
      category: 'mandatory',
      pdfIndex: 0,
      page: 28,
    },

    // Pedestrian / cycle prohibitions
    { code: 'RG-23', name: 'No Pedestrians', category: 'prohibitory', pdfIndex: 0, page: 29 },
    { code: 'RG-24', name: 'No Cycling', category: 'prohibitory', pdfIndex: 0, page: 30 },

    // Cycle lane signs
    { code: 'RG-25', name: 'Pedestrians', category: 'mandatory', pdfIndex: 0, page: 31 },
    { code: 'RG-26', name: 'Cycle Lane', category: 'mandatory', pdfIndex: 0, page: 32 },
    // RG-26.1/26.2 share page 33: BEGINS (top), ENDS (bottom)
    {
      code: 'RG-26.1',
      name: 'Cycle Lane Supplementary Begins',
      category: 'mandatory',
      pdfIndex: 0,
      page: 33,
      crop: { top: 0.08, left: 0.0, bottom: 0.52, right: 0.65 },
    },
    {
      code: 'RG-26.2',
      name: 'Cycle Lane Supplementary Ends',
      category: 'mandatory',
      pdfIndex: 0,
      page: 33,
      crop: { top: 0.52, left: 0.0, bottom: 0.95, right: 0.65 },
    },
    { code: 'RG-26A', name: 'Cycles Only', category: 'mandatory', pdfIndex: 0, page: 34 },
    { code: 'RG-26B', name: 'All Cycles Must Exit', category: 'mandatory', pdfIndex: 0, page: 35 },
    {
      code: 'RG-26C',
      name: 'Shared Path – Pedestrians and Cycles',
      category: 'information',
      pdfIndex: 0,
      page: 36,
    },
    {
      code: 'RG-26D',
      name: 'Shared Path – Pedestrians and Cycles (defined position)',
      category: 'information',
      pdfIndex: 0,
      page: 37,
    },

    // Pedestrian priority / school
    {
      code: 'RG-27',
      name: 'Turning Traffic Give Way to Pedestrians',
      category: 'priority',
      pdfIndex: 0,
      page: 38,
    },
    { code: 'RG-28', name: 'School Patrol', category: 'mandatory', pdfIndex: 0, page: 39 },
    {
      code: 'RG-29',
      name: 'Overhead Lane Use Arrows',
      category: 'mandatory',
      pdfIndex: 0,
      page: 40,
    },

    // Signal / railway
    { code: 'RG-30', name: 'Stop on Red Signal', category: 'prohibitory', pdfIndex: 0, page: 41 },
    {
      code: 'RG-31',
      name: 'Railway Level Crossing Give Way Combination',
      category: 'priority',
      pdfIndex: 0,
      page: 42,
    },
    {
      code: 'RG-32',
      name: 'Railway Level Crossing Stop Sign Combination',
      category: 'prohibitory',
      pdfIndex: 0,
      page: 43,
    },
    {
      code: 'RG-33',
      name: 'Railway Level Crossing Flashing Light Signal',
      category: 'warning',
      pdfIndex: 0,
      page: 44,
    },

    // Lane management
    { code: 'RG-34', name: 'Keep Right', category: 'mandatory', pdfIndex: 0, page: 45 },
    { code: 'RG-35', name: 'Bus Lane', category: 'mandatory', pdfIndex: 0, page: 46 },
    { code: 'RG-36', name: 'No Heavy Vehicles', category: 'prohibitory', pdfIndex: 0, page: 47 },

    // Supplementary exceptions
    {
      code: 'RG-37',
      name: 'Except Authorised Vehicles',
      category: 'information',
      pdfIndex: 0,
      page: 48,
    },
    { code: 'RG-38', name: 'Except Buses', category: 'information', pdfIndex: 0, page: 49 },
    { code: 'RG-39', name: 'Except Cycles', category: 'information', pdfIndex: 0, page: 50 },

    // Give way supplementary
    {
      code: 'RG-40',
      name: 'Give Way Supplementary Ahead',
      category: 'priority',
      pdfIndex: 0,
      page: 51,
    },
    {
      code: 'RG-41',
      name: 'Give Way Supplementary Distance',
      category: 'priority',
      pdfIndex: 0,
      page: 52,
    },
    {
      code: 'RG-42',
      name: 'Give Way Supplementary Mon–Fri',
      category: 'priority',
      pdfIndex: 0,
      page: 53,
    },

    // Vehicle prohibitions
    { code: 'RG-43', name: 'No Buses', category: 'prohibitory', pdfIndex: 0, page: 54 },
    { code: 'RG-44', name: 'No Cars', category: 'prohibitory', pdfIndex: 0, page: 55 },
    {
      code: 'RG-45',
      name: 'No Cars and No Motorcycles',
      category: 'prohibitory',
      pdfIndex: 0,
      page: 56,
    },
    {
      code: 'RG-47',
      name: 'Audible Warning Device Prohibited School Zone',
      category: 'prohibitory',
      pdfIndex: 0,
      page: 57,
    },
    {
      code: 'RG-48',
      name: 'Zone with Lower Speed Limit',
      category: 'prohibitory',
      pdfIndex: 0,
      page: 58,
    },

    // -----------------------------------------------------------------------
    // SECTION 03 — REGULATORY PARKING SIGNS (RP-*)
    // pdfIndex: 1  |  PDF page = doc page suffix + 2
    // -----------------------------------------------------------------------

    // No stopping
    { code: 'RP-1', name: 'No Stopping', category: 'prohibitory', pdfIndex: 1, page: 3 },
    {
      code: 'RP-1.1',
      name: 'No Stopping at All Times',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 4,
    },
    {
      code: 'RP-1.2',
      name: 'No Stopping at All Times – Next km',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 5,
    },
    {
      code: 'RP-1.3',
      name: 'No Stopping at All Times – Ends',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 6,
    },
    {
      code: 'RP-2',
      name: 'No Stopping – Specified Period',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 7,
    },
    {
      code: 'RP-2.1',
      name: 'No Stopping – Includes Time and Day',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 8,
    },

    // Clearway
    {
      code: 'RP-3',
      name: 'Clearway – Single Peak Period',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 9,
    },
    {
      code: 'RP-3.1',
      name: 'Clearway – Two Peak Period Restrictions',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 10,
    },
    // RP-3.2 / RP-3.3 share page 11: BEGINS (top), ENDS (bottom)
    {
      code: 'RP-3.2',
      name: 'Clearway Supplementary Begins',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 11,
      crop: { top: 0.07, left: 0.0, bottom: 0.5, right: 0.58 },
    },
    {
      code: 'RP-3.3',
      name: 'Clearway Supplementary Ends',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 11,
      crop: { top: 0.5, left: 0.0, bottom: 0.82, right: 0.58 },
    },
    {
      code: 'RP-3.5',
      name: 'Clearway with Parking Restrictions',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 12,
    },

    // Restricted parking — page 13: top=RP-4, bottom-left=RP-4.1, bottom-right=RP-4.2
    {
      code: 'RP-4',
      name: 'Restricted Parking – Standard Hours',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 13,
      crop: { top: 0.07, left: 0.1, bottom: 0.52, right: 0.7 },
    },
    {
      code: 'RP-4.1',
      name: 'Restricted Parking – Non-Standard Hours',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 13,
      crop: { top: 0.52, left: 0.0, bottom: 0.92, right: 0.5 },
    },
    {
      code: 'RP-4.2',
      name: 'Restricted Parking – Other Times',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 13,
      crop: { top: 0.52, left: 0.5, bottom: 0.92, right: 1.0 },
    },
    {
      code: 'RP-4.3',
      name: 'Late Night Extension Supplementary',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 14,
    },

    // Bus stop — page 15: left=RP-5, right=RP-5.1
    {
      code: 'RP-5',
      name: 'Bus Stop',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 15,
      crop: { top: 0.07, left: 0.0, bottom: 0.62, right: 0.5 },
    },
    {
      code: 'RP-5.1',
      name: 'Bus Stop – With Arrow',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 15,
      crop: { top: 0.07, left: 0.5, bottom: 0.62, right: 1.0 },
    },

    // Taxi stand — page 16: left=RP-6, right=RP-6.1
    {
      code: 'RP-6',
      name: 'Taxi Stand',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 16,
      crop: { top: 0.07, left: 0.0, bottom: 0.62, right: 0.5 },
    },
    {
      code: 'RP-6.1',
      name: 'Taxi Stand – With Arrow',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 16,
      crop: { top: 0.07, left: 0.5, bottom: 0.62, right: 1.0 },
    },

    // Loading zone — page 17: left=RP-7, right=RP-7.1
    {
      code: 'RP-7',
      name: 'Loading Zone',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 17,
      crop: { top: 0.07, left: 0.0, bottom: 0.62, right: 0.5 },
    },
    {
      code: 'RP-7.1',
      name: 'Loading Zone – With Arrow',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 17,
      crop: { top: 0.07, left: 0.5, bottom: 0.62, right: 1.0 },
    },

    // Goods vehicles supplementary — page 18: left=RP-7.2, right=RP-7.2A
    {
      code: 'RP-7.2',
      name: 'Goods Vehicles Only',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 18,
      crop: { top: 0.07, left: 0.0, bottom: 0.55, right: 0.5 },
    },
    {
      code: 'RP-7.2A',
      name: '5 Min Maximum Goods Vehicles Only',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 18,
      crop: { top: 0.07, left: 0.5, bottom: 0.55, right: 1.0 },
    },
    {
      code: 'RP-7.3',
      name: 'Service Vehicles Only',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 19,
    },

    // Motorcycle parking — page 20: left=RP-8, right=RP-8.1
    {
      code: 'RP-8',
      name: 'Motorcycle Parking',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 20,
      crop: { top: 0.07, left: 0.0, bottom: 0.65, right: 0.5 },
    },
    {
      code: 'RP-8.1',
      name: 'Motorcycle Parking – With Arrow',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 20,
      crop: { top: 0.07, left: 0.5, bottom: 0.65, right: 1.0 },
    },

    // Cycle stand — page 21: left=RP-9, right=RP-9.1
    {
      code: 'RP-9',
      name: 'Cycle Stand',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 21,
      crop: { top: 0.07, left: 0.0, bottom: 0.55, right: 0.5 },
    },
    {
      code: 'RP-9.1',
      name: 'Cycle Stand – With Arrow',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 21,
      crop: { top: 0.07, left: 0.5, bottom: 0.55, right: 1.0 },
    },

    // Disabled parking — page 22: top-left=RP-10, top-right=RP-10.1, bottom=RP-10.2
    {
      code: 'RP-10',
      name: 'Disabled Parking',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 22,
      crop: { top: 0.07, left: 0.0, bottom: 0.43, right: 0.48 },
    },
    {
      code: 'RP-10.1',
      name: 'Disabled Parking – With Arrow',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 22,
      crop: { top: 0.07, left: 0.48, bottom: 0.47, right: 1.0 },
    },
    {
      code: 'RP-10.2',
      name: 'Disabled Parking – With Time Restriction',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 22,
      crop: { top: 0.45, left: 0.0, bottom: 0.73, right: 0.5 },
    },

    // Zone parking — page 23: top=RP-12, bottom-left=RP-12.1, bottom-right=RP-12.2
    {
      code: 'RP-12',
      name: 'Zone Parking',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 23,
      crop: { top: 0.07, left: 0.1, bottom: 0.52, right: 0.7 },
    },
    {
      code: 'RP-12.1',
      name: 'Zone Parking Begins',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 23,
      crop: { top: 0.52, left: 0.0, bottom: 0.92, right: 0.5 },
    },
    {
      code: 'RP-12.2',
      name: 'Zone Parking Ends',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 23,
      crop: { top: 0.52, left: 0.5, bottom: 0.92, right: 1.0 },
    },

    {
      code: 'RP-13',
      name: 'Authorised Vehicles Only',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 24,
    },
    {
      code: 'RP-14',
      name: 'Pay and Display Parking – Pay at Machine',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 25,
    },
    {
      code: 'RP-15',
      name: 'No Parking at All Times',
      category: 'prohibitory',
      pdfIndex: 1,
      page: 26,
    },

    // -----------------------------------------------------------------------
    // SECTION 04 — PERMANENT WARNING SIGNS (PW-*)
    // pdfIndex: 2  |  PDF page = doc page suffix + 4
    // -----------------------------------------------------------------------

    // Advance warnings
    { code: 'PW-1', name: 'Stop Ahead', category: 'warning', pdfIndex: 2, page: 8 },
    { code: 'PW-2', name: 'Give Way Ahead', category: 'warning', pdfIndex: 2, page: 9 },
    { code: 'PW-3', name: 'Traffic Signals Ahead', category: 'warning', pdfIndex: 2, page: 10 },
    { code: 'PW-4', name: 'Merging Traffic', category: 'warning', pdfIndex: 2, page: 11 },
    {
      code: 'PW-4.1',
      name: 'Merging Traffic Left and Right',
      category: 'warning',
      pdfIndex: 2,
      page: 12,
    },
    { code: 'PW-5', name: 'Diverge', category: 'warning', pdfIndex: 2, page: 13 },
    { code: 'PW-6', name: 'Two Way', category: 'warning', pdfIndex: 2, page: 14 },
    { code: 'PW-7', name: 'Two Way Ahead', category: 'warning', pdfIndex: 2, page: 15 },

    // Junctions
    { code: 'PW-8', name: 'Rotary Junction', category: 'warning', pdfIndex: 2, page: 16 },
    {
      code: 'PW-9',
      name: 'Cross Roads Junction – Controlled (priority route ahead)',
      category: 'warning',
      pdfIndex: 2,
      page: 17,
    },
    {
      code: 'PW-9.1',
      name: 'Cross Roads Junction – Controlled (priority route turns)',
      category: 'warning',
      pdfIndex: 2,
      page: 18,
    },
    { code: 'PW-10', name: 'T-Junction – Controlled', category: 'warning', pdfIndex: 2, page: 19 },
    {
      code: 'PW-10.1',
      name: 'T-Junction – Uncontrolled',
      category: 'warning',
      pdfIndex: 2,
      page: 20,
    },
    {
      code: 'PW-11',
      name: 'Side Road Junction – Controlled',
      category: 'warning',
      pdfIndex: 2,
      page: 21,
    },
    {
      code: 'PW-11.1',
      name: 'Side Road Junction – Uncontrolled',
      category: 'warning',
      pdfIndex: 2,
      page: 22,
    },
    { code: 'PW-12', name: 'Y-Junction – Controlled', category: 'warning', pdfIndex: 2, page: 23 },
    {
      code: 'PW-12.1',
      name: 'Y-Junction – Uncontrolled',
      category: 'warning',
      pdfIndex: 2,
      page: 24,
    },
    { code: 'PW-13', name: 'Side Road Junction Left', category: 'warning', pdfIndex: 2, page: 25 },
    {
      code: 'PW-13.1',
      name: 'Side Road Junction Right',
      category: 'warning',
      pdfIndex: 2,
      page: 26,
    },
    {
      code: 'PW-13.2',
      name: 'Side Road Junction Left – Alternative',
      category: 'warning',
      pdfIndex: 2,
      page: 27,
    },
    {
      code: 'PW-13.3',
      name: 'Side Road Junction Right – Alternative',
      category: 'warning',
      pdfIndex: 2,
      page: 28,
    },

    // Curves
    { code: 'PW-16', name: 'Curve – Less Than 15°', category: 'warning', pdfIndex: 2, page: 29 },
    { code: 'PW-17', name: 'Curve – 15° to 90°', category: 'warning', pdfIndex: 2, page: 30 },
    { code: 'PW-18', name: 'Curve – 90° to 120°', category: 'warning', pdfIndex: 2, page: 31 },
    {
      code: 'PW-19',
      name: 'Curve – Greater Than 120°',
      category: 'warning',
      pdfIndex: 2,
      page: 32,
    },
    {
      code: 'PW-20',
      name: 'Reverse Curve – Less Than 60°',
      category: 'warning',
      pdfIndex: 2,
      page: 33,
    },
    {
      code: 'PW-21',
      name: 'Reverse Curve – 60° to 120°',
      category: 'warning',
      pdfIndex: 2,
      page: 34,
    },
    { code: 'PW-22', name: 'Winding Road', category: 'warning', pdfIndex: 2, page: 35 },
    { code: 'PW-23', name: 'Bend', category: 'warning', pdfIndex: 2, page: 36 },
    { code: 'PW-24', name: 'Steep Downgrade', category: 'warning', pdfIndex: 2, page: 37 },
    { code: 'PW-25', name: 'Advisory Curve Speed', category: 'warning', pdfIndex: 2, page: 38 },

    // Hazards
    { code: 'PW-28', name: 'Steep Downgrade – Trucks', category: 'warning', pdfIndex: 2, page: 40 },
    { code: 'PW-27.1', name: 'Steep Upgrade', category: 'warning', pdfIndex: 2, page: 41 },
    { code: 'PW-29', name: 'Pedestrians', category: 'warning', pdfIndex: 2, page: 42 },
    { code: 'PW-30', name: 'Pedestrian Crossing', category: 'warning', pdfIndex: 2, page: 43 },
    { code: 'PW-31', name: 'Children', category: 'warning', pdfIndex: 2, page: 44 },
    { code: 'PW-32', name: 'School or Pre-School', category: 'warning', pdfIndex: 2, page: 45 },
    { code: 'PW-33', name: 'School Crossing', category: 'warning', pdfIndex: 2, page: 46 },
    { code: 'PW-34', name: 'School Bus Route', category: 'warning', pdfIndex: 2, page: 47 },
    { code: 'PW-35', name: 'Cyclists', category: 'warning', pdfIndex: 2, page: 48 },
    { code: 'PW-36', name: 'Equestrians', category: 'warning', pdfIndex: 2, page: 49 },
    { code: 'PW-36.1', name: 'Wild Horses', category: 'warning', pdfIndex: 2, page: 50 },
    // PW-37 / PW-37.1 share page 51: left=cattle, right=goats
    {
      code: 'PW-37',
      name: 'Stock – Permanent (Cattle)',
      category: 'warning',
      pdfIndex: 2,
      page: 51,
      crop: { top: 0.07, left: 0.0, bottom: 0.65, right: 0.5 },
    },
    {
      code: 'PW-37.1',
      name: 'Stock – Permanent (Goats)',
      category: 'warning',
      pdfIndex: 2,
      page: 51,
      crop: { top: 0.07, left: 0.5, bottom: 0.65, right: 1.0 },
    },

    // Road surface
    { code: 'PW-38', name: 'Sudden Dip', category: 'warning', pdfIndex: 2, page: 52 },
    { code: 'PW-39', name: 'Hump', category: 'warning', pdfIndex: 2, page: 53 },
    { code: 'PW-40', name: 'Uneven Surface', category: 'warning', pdfIndex: 2, page: 54 },
    { code: 'PW-41', name: 'Slippery Surface', category: 'warning', pdfIndex: 2, page: 55 },
    {
      code: 'PW-41.2',
      name: 'Slippery Surface – When Wet',
      category: 'warning',
      pdfIndex: 2,
      page: 56,
    },
    { code: 'PW-41.3', name: 'Gravel Surface', category: 'warning', pdfIndex: 2, page: 57 },
    { code: 'PW-42', name: 'Slips and Falling Debris', category: 'warning', pdfIndex: 2, page: 58 },

    // Lane reduction / clearance
    { code: 'PW-43', name: 'Lane Reduction', category: 'warning', pdfIndex: 2, page: 59 },
    {
      code: 'PW-43.2',
      name: 'Lane Reduction – 2 Lanes to 1',
      category: 'warning',
      pdfIndex: 2,
      page: 60,
    },
    {
      code: 'PW-43.4',
      name: 'Lane Reduction – 3 Lanes to 2',
      category: 'warning',
      pdfIndex: 2,
      page: 61,
    },
    {
      code: 'PW-44',
      name: 'Low Overhead Clearance – Advanced Warning',
      category: 'warning',
      pdfIndex: 2,
      page: 62,
    },
    {
      code: 'PW-44.1',
      name: 'Low Overhead Clearance – Advanced Warning Alt',
      category: 'warning',
      pdfIndex: 2,
      page: 63,
    },
    {
      code: 'PW-45',
      name: 'Low Overhead Clearance – Indication',
      category: 'warning',
      pdfIndex: 2,
      page: 64,
    },

    // Other hazards
    { code: 'PW-47', name: 'Other Hazard', category: 'warning', pdfIndex: 2, page: 66 },
    { code: 'PW-50', name: 'Trucks', category: 'warning', pdfIndex: 2, page: 69 },
    { code: 'PW-51', name: 'Other Hazard – Gate', category: 'warning', pdfIndex: 2, page: 70 },
    { code: 'PW-53', name: 'Aircraft', category: 'warning', pdfIndex: 2, page: 71 },
    { code: 'PW-53.1', name: 'Helicopters', category: 'warning', pdfIndex: 2, page: 72 },
    { code: 'PW-53.2', name: 'Lane Gain', category: 'warning', pdfIndex: 2, page: 73 },
    { code: 'PW-53.3', name: 'Lane Gain – Variant', category: 'warning', pdfIndex: 2, page: 74 },
    { code: 'PW-54', name: 'Aircraft Crossing', category: 'warning', pdfIndex: 2, page: 75 },
    { code: 'PW-55', name: 'Road Narrows', category: 'warning', pdfIndex: 2, page: 76 },
    { code: 'PW-56', name: 'Road Narrows Both Sides', category: 'warning', pdfIndex: 2, page: 77 },

    // Railway
    { code: 'PW-57', name: 'Railway Level Crossing', category: 'warning', pdfIndex: 2, page: 78 },
    {
      code: 'PW-57.1',
      name: 'Railway Level Crossing – Steam Train',
      category: 'warning',
      pdfIndex: 2,
      page: 79,
    },
    {
      code: 'PW-58',
      name: 'Railway Level Crossing – Advance Warning',
      category: 'warning',
      pdfIndex: 2,
      page: 80,
    },
    {
      code: 'PW-59',
      name: 'Railway Level Crossing – Side Road',
      category: 'warning',
      pdfIndex: 2,
      page: 81,
    },
    {
      code: 'PW-60',
      name: 'Railway Level Crossing – Side Road Advance',
      category: 'warning',
      pdfIndex: 2,
      page: 82,
    },
    {
      code: 'PW-61',
      name: 'Railway Level Crossing – Flashing Light Signals',
      category: 'warning',
      pdfIndex: 2,
      page: 83,
    },
    {
      code: 'PW-62',
      name: 'Railway Level Crossing on Side Road – Intermediate Advance',
      category: 'warning',
      pdfIndex: 2,
      page: 85,
    },

    // Miscellaneous
    {
      code: 'PW-64',
      name: 'Traffic Signals – Roundabout Queue',
      category: 'warning',
      pdfIndex: 2,
      page: 86,
    },
    { code: 'PW-65', name: 'Belisha Beacon Disk', category: 'warning', pdfIndex: 2, page: 87 },
    {
      code: 'PW-66',
      name: 'Horizontal Curve – Chevron Board',
      category: 'warning',
      pdfIndex: 2,
      page: 88,
    },
    {
      code: 'PW-67',
      name: 'Horizontal Curve – Chevron Indicators',
      category: 'warning',
      pdfIndex: 2,
      page: 90,
    },
    { code: 'PW-68', name: 'Delineator Post', category: 'warning', pdfIndex: 2, page: 93 },
    { code: 'PW-70', name: 'Speed Limit Ahead', category: 'warning', pdfIndex: 2, page: 95 },
    { code: 'PW-71', name: 'Truck Advisory Speed', category: 'warning', pdfIndex: 2, page: 96 },
  ],
});
