/* oxlint-disable no-await-in-loop */

/**
 * scrape-pdf.ts — PDF sign manual scraper factory
 *
 * Extracts road sign images from government-published PDF sign manuals
 * (e.g. Fiji MOTSAM). Each sign's page is rendered to PNG at the configured
 * DPI, optionally cropped to a bounding box, then saved to the country
 * package's assets/ directory. Raster sizes are generated via sharp.
 *
 * The scraper returns signs with imageUrl: null so that create-assets.ts
 * skips them (assets are already written during the scrape step).
 *
 * Requirements: poppler must be installed.
 *   macOS:  brew install poppler
 *   Linux:  apt-get install poppler-utils
 *
 * Usage:
 *   import { createPdfScraper } from './scrape-pdf';
 *   export default createPdfScraper({ cc: 'fj', pdfUrls: [...], signs: [...] });
 */

import fs from 'fs';
import path from 'path';
import { execFileSync, spawnSync } from 'child_process';
import sharp from 'sharp';

export type PdfCategory = 'information' | 'mandatory' | 'priority' | 'prohibitory' | 'warning';

export interface PdfSignEntry {
  code: string;
  name: string;
  category: PdfCategory;
  /** 0-based index into the pdfUrls array. */
  pdfIndex: number;
  /** 1-based page number within that PDF. */
  page: number;
  /**
   * Optional crop as fractions (0–1) of the rendered page dimensions.
   * Omit when the sign occupies the whole page.
   */
  crop?: { top: number; left: number; bottom: number; right: number };
}

export interface PdfCountryConfig {
  cc: string;
  country: string;
  /** Ordered list of PDF URLs to download (cached under data/{cc}/pdf-cache/). */
  pdfUrls: string[];
  signs: PdfSignEntry[];
  /** Render resolution in DPI (default: 300). Higher = sharper but slower. */
  renderDpi?: number;
  /** Extra HTTP headers for PDF downloads (e.g. Referer/User-Agent for hotlink-protected servers). */
  downloadHeaders?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';
const IMAGE_SIZES = [240, 512, 768, 1024, 2048] as const;

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const sanitize = (str: string): string =>
  str
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const checkPopplerAvailable = (): void => {
  const result = spawnSync('which', ['pdftoppm'], { stdio: 'pipe' });
  if (result.status !== 0) {
    throw new Error(
      'pdftoppm not found — install poppler first:\n' +
        '  macOS:  brew install poppler\n' +
        '  Linux:  apt-get install poppler-utils',
    );
  }
};

const downloadFile = async (
  url: string,
  dest: string,
  extraHeaders?: Record<string, string>,
): Promise<void> => {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, ...extraHeaders } });
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
};

/**
 * Render a single PDF page to PNG using pdftoppm.
 * pdftoppm names output files like `{prefix}-000001.png` (6-digit zero-padded).
 * Returns the path to the generated PNG.
 */
const renderPage = (pdfPath: string, page: number, dpi: number, outDir: string): string => {
  const prefix = path.join(outDir, 'page');
  execFileSync('pdftoppm', [
    '-r',
    String(dpi),
    '-f',
    String(page),
    '-l',
    String(page),
    '-png',
    pdfPath,
    prefix,
  ]);
  // Try the expected zero-padded name first.
  const padded = String(page).padStart(6, '0');
  const expected = `${prefix}-${padded}.png`;
  if (fs.existsSync(expected)) return expected;
  // Fall back: find any .png in outDir (handles alternative padding schemes).
  const found = fs.readdirSync(outDir).find((f) => f.endsWith('.png'));
  if (found) return path.join(outDir, found);
  throw new Error(`pdftoppm produced no PNG for page ${page} of ${path.basename(pdfPath)}`);
};

/** Generate all raster sizes from a source PNG using sharp. */
const generateRasterSizes = async (
  srcPng: string,
  outDir: string,
  baseName: string,
): Promise<void> => {
  for (const size of IMAGE_SIZES) {
    const src = sharp(srcPng);
    await Promise.all([
      src
        .clone()
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(path.join(outDir, `${baseName}_${size}x${size}.png`)),
      src
        .clone()
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .jpeg({ quality: 90 })
        .toFile(path.join(outDir, `${baseName}_${size}x${size}.jpg`)),
      src
        .clone()
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 85 })
        .toFile(path.join(outDir, `${baseName}_${size}x${size}.webp`)),
    ]);
  }
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createPdfScraper =
  (config: PdfCountryConfig) =>
  async (): Promise<
    Record<
      PdfCategory,
      Array<{ code: string; name: string; imageUrl: null; category: PdfCategory }>
    >
  > => {
    const { cc, country, pdfUrls, signs, renderDpi = 300, downloadHeaders } = config;

    if (signs.length === 0) {
      console.warn(
        `  scrape-pdf: no signs configured for ${cc.toUpperCase()}.\n` +
          `  Add entries to the 'signs' array in bin/scrape-${cc}.ts once the PDF URLs are accessible.`,
      );
      return { warning: [], priority: [], prohibitory: [], mandatory: [], information: [] };
    }

    checkPopplerAvailable();

    const cacheDir = path.join('data', cc, 'pdf-cache');
    const pagesDir = path.join('data', cc, 'pdf-pages');
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.mkdirSync(pagesDir, { recursive: true });

    // Download PDFs (cached — only fetch once).
    const pdfPaths: string[] = [];
    for (let i = 0; i < pdfUrls.length; i++) {
      const pdfPath = path.join(cacheDir, `source-${i}.pdf`);
      if (fs.existsSync(pdfPath)) {
        console.log(`  PDF ${i}: cached (${path.basename(pdfUrls[i])})`);
      } else {
        console.log(`  PDF ${i}: downloading ${pdfUrls[i]}`);
        await downloadFile(pdfUrls[i], pdfPath, downloadHeaders);
      }
      pdfPaths.push(pdfPath);
    }

    const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
    const result: Record<
      PdfCategory,
      Array<{ code: string; name: string; imageUrl: null; category: PdfCategory }>
    > = {
      warning: [],
      priority: [],
      prohibitory: [],
      mandatory: [],
      information: [],
    };

    console.log(`  Extracting ${signs.length} signs from PDF(s)...`);
    for (const sign of signs) {
      const { code, name, category, pdfIndex, page, crop } = sign;
      const codeSlug = slugify(code);
      const baseName = `${sanitize(country)}_road_sign_${sanitize(code)}`;
      const signDir = path.join(assetsRoot, category, codeSlug);
      const destPng = path.join(signDir, `${baseName}.png`);

      fs.mkdirSync(signDir, { recursive: true });

      if (!fs.existsSync(destPng)) {
        const pageOutDir = path.join(pagesDir, `pdf${pdfIndex}-p${page}`);
        fs.mkdirSync(pageOutDir, { recursive: true });

        const pagePng = renderPage(pdfPaths[pdfIndex], page, renderDpi, pageOutDir);

        let img = sharp(pagePng);
        if (crop) {
          const meta = await img.metadata();
          const w = meta.width!;
          const h = meta.height!;
          const left = Math.round(crop.left * w);
          const top = Math.round(crop.top * h);
          const right = Math.min(w, Math.round(crop.right * w));
          const bottom = Math.min(h, Math.round(crop.bottom * h));
          img = img.extract({
            left,
            top,
            width: right - left,
            height: bottom - top,
          });
        }
        await img.png().toFile(destPng);
        console.log(`  Extracted: ${code}`);
      } else {
        console.log(`  Skipping (exists): ${code}`);
      }

      await generateRasterSizes(destPng, signDir, baseName);
      result[category].push({ code, name, imageUrl: null, category });
    }

    return result;
  };
