/* oxlint-disable no-await-in-loop */

/**
 * fetch-fhwa-svgs.ts
 *
 * Downloads SVG files for specific sign codes from FHWA's 2024 SHS Phased
 * Release ZIPs WITHOUT downloading the full file.  Instead it:
 *   1. HEADs the ZIP to get its size.
 *   2. Downloads only the last 65 KB to locate the End-of-Central-Directory.
 *   3. Downloads only the central directory to get all entry metadata.
 *   4. For each needed code, downloads just that entry's compressed bytes
 *      using an HTTP Range request and inflates them locally.
 *
 * Run via: yarn fetch-fhwa --country=us
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';
import { optimize } from 'svgo';
import sharp from 'sharp';

const inflateRaw = promisify(zlib.inflateRaw);

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

const IMAGE_SIZES = [240, 512, 768, 1024, 2048] as const;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export const sanitize = (str: string): string =>
  str
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const strip = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Returns a regex that matches the FHWA 2024-edition zero-padded equivalent
 * of an old MUTCD code.  E.g. "M1-6" → /^M01-06/i, "M3-2" → /^M03-02/i.
 * The regex is intentionally loose about trailing suffixes (P, a, R, L …)
 * because the 2024 edition sometimes adds or changes them.
 */
function fhwaPattern(code: string): RegExp | null {
  const m = code.match(/^([A-Za-z]+)(\d+)-(\d+)([A-Za-z]*)$/);
  if (!m) return null;
  const [, prefix, n1, n2, suffix] = m;
  const p1 = n1.padStart(2, '0');
  const p2 = n2.padStart(2, '0');
  // suffix may differ (P added, letter case changed) — match it loosely
  const sfx = suffix ? `${suffix}[A-Za-z]*` : '[A-Za-z]*';
  return new RegExp(`^${prefix}${p1}-${p2}${sfx}`, 'i');
}

// ---------------------------------------------------------------------------
// Signs we still need (verified missing after all prior pipeline steps)
// ---------------------------------------------------------------------------

interface SignTarget {
  code: string;
  cat: string;
  destFilename: string;
}

const MISSING: SignTarget[] = [
  // Warning
  { code: 'W8-I100', cat: 'warning', destFilename: 'MUTCD_W8-I100.svg' },
  { code: 'W23-1', cat: 'warning', destFilename: 'MUTCD_W23-1.svg' },
  { code: 'W13-4P', cat: 'warning', destFilename: 'MUTCD_W13-4P.svg' },
  { code: 'W6-4', cat: 'warning', destFilename: 'MUTCD_W6-4.svg' },
  { code: 'W8-24', cat: 'warning', destFilename: 'MUTCD_W8-24.svg' },
  { code: 'W9-3', cat: 'warning', destFilename: 'MUTCD_W9-3.svg' },
  // Regulatory
  { code: 'R2-4a', cat: 'regulatory', destFilename: 'MUTCD_R2-4a.svg' },
  { code: 'R20-H1', cat: 'regulatory', destFilename: 'MUTCD_R20-H1.svg' },
  { code: 'R20-H2', cat: 'regulatory', destFilename: 'MUTCD_R20-H2.svg' },
  // Guide
  { code: 'M1-6', cat: 'guide', destFilename: 'MUTCD_M1-6.svg' },
  { code: 'M4-17', cat: 'guide', destFilename: 'MUTCD_M4-17.svg' },
  { code: 'M4-18', cat: 'guide', destFilename: 'MUTCD_M4-18.svg' },
  { code: 'M3-2', cat: 'guide', destFilename: 'MUTCD_M3-2.svg' },
  { code: 'M3-3', cat: 'guide', destFilename: 'MUTCD_M3-3.svg' },
  { code: 'M3-4', cat: 'guide', destFilename: 'MUTCD_M3-4.svg' },
  { code: 'M4-4', cat: 'guide', destFilename: 'MUTCD_M4-4.svg' },
  { code: 'M4-5', cat: 'guide', destFilename: 'MUTCD_M4-5.svg' },
  { code: 'M4-6', cat: 'guide', destFilename: 'MUTCD_M4-6.svg' },
  { code: 'M4-7', cat: 'guide', destFilename: 'MUTCD_M4-7.svg' },
  { code: 'M4-7a', cat: 'guide', destFilename: 'MUTCD_M4-7a.svg' },
  // Informational
  { code: 'I4-2', cat: 'informational', destFilename: 'MUTCD_I4-2.svg' },
  { code: 'I13-1', cat: 'informational', destFilename: 'MUTCD_I13-1.svg' },
];

// Release ZIPs in priority order (smallest first within a category)
const ZIP_RELEASES = [
  'https://mutcd.fhwa.dot.gov/kno-shs_2024-release-status/zip_files/2024_SHS_Release_1-New_Warning_Sign_Vector_Graphics.zip',
  'https://mutcd.fhwa.dot.gov/kno-shs_2024-release-status/zip_files/2024_SHS_Release_2-New_Regulatory_TTC_School_Signs_Vector_Graphics.zip',
  'https://mutcd.fhwa.dot.gov/kno-shs_2024-release-status/zip_files/2024_SHS_Release_4-Regulatory_Warning_TTC_School_Signs_Vector_Graphics.zip',
  'https://mutcd.fhwa.dot.gov/kno-shs_2024-release-status/zip_files/2024_SHS_Release_5-Guide_Signs_Vector_Graphics.zip',
  'https://mutcd.fhwa.dot.gov/kno-shs_2024-release-status/zip_files/2024_SHS_Release_6-Signs_Vector_Graphics.zip',
];

// ---------------------------------------------------------------------------
// ZIP partial-read helpers
// ---------------------------------------------------------------------------

interface ZipEntry {
  filename: string;
  localHeaderOffset: number;
  compressedSize: number;
  uncompressedSize: number;
  compressionMethod: number;
}

async function fetchRange(url: string, start: number, end: number): Promise<Buffer> {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Range: `bytes=${start}-${end}` },
  });
  if (!res.ok && res.status !== 206) {
    throw new Error(`HTTP ${res.status} for range ${start}-${end} of ${url}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function getFileSize(url: string): Promise<number> {
  const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HEAD ${res.status}: ${url}`);
  const cl = res.headers.get('content-length');
  if (!cl) throw new Error('No Content-Length header');
  return parseInt(cl, 10);
}

function findEOCD(buf: Buffer): { cdOffset: number; cdSize: number } | null {
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) !== 0x06054b50) continue;
    const cdSize = buf.readUInt32LE(i + 12);
    const cdOffset = buf.readUInt32LE(i + 16);
    // Reject ZIP64 sentinel (0xffffffff means ZIP64 EOCD64 should be used instead)
    if (cdOffset === 0xffffffff || cdSize === 0xffffffff) continue;
    return { cdOffset, cdSize };
  }
  return null;
}

function parseCentralDirectory(buf: Buffer): ZipEntry[] {
  const entries: ZipEntry[] = [];
  let pos = 0;
  while (pos <= buf.length - 46) {
    if (buf.readUInt32LE(pos) !== 0x02014b50) break;
    const compressionMethod = buf.readUInt16LE(pos + 10);
    const compressedSize = buf.readUInt32LE(pos + 20);
    const uncompressedSize = buf.readUInt32LE(pos + 24);
    const filenameLen = buf.readUInt16LE(pos + 28);
    const extraLen = buf.readUInt16LE(pos + 30);
    const commentLen = buf.readUInt16LE(pos + 32);
    const localHeaderOffset = buf.readUInt32LE(pos + 42);
    const filename = buf.subarray(pos + 46, pos + 46 + filenameLen).toString('utf-8');
    entries.push({
      filename,
      localHeaderOffset,
      compressedSize,
      uncompressedSize,
      compressionMethod,
    });
    pos += 46 + filenameLen + extraLen + commentLen;
  }
  return entries;
}

async function extractEntry(url: string, entry: ZipEntry): Promise<Buffer> {
  // Read the local file header to find where the compressed data starts.
  const lhBuf = await fetchRange(url, entry.localHeaderOffset, entry.localHeaderOffset + 29);
  if (lhBuf.readUInt32LE(0) !== 0x04034b50) {
    throw new Error(`Invalid local file header signature for ${entry.filename}`);
  }
  const localFilenameLen = lhBuf.readUInt16LE(26);
  const localExtraLen = lhBuf.readUInt16LE(28);
  const dataStart = entry.localHeaderOffset + 30 + localFilenameLen + localExtraLen;
  const dataEnd = dataStart + entry.compressedSize - 1;

  const compressed = await fetchRange(url, dataStart, dataEnd);

  if (entry.compressionMethod === 0) return compressed; // Stored
  if (entry.compressionMethod === 8) return (await inflateRaw(compressed)) as Buffer; // Deflate
  throw new Error(`Unsupported compression method ${entry.compressionMethod}`);
}

// ---------------------------------------------------------------------------
// SVG processing (reused from create-assets pipeline)
// ---------------------------------------------------------------------------

const prepareSvg = (raw: string, size: number): Buffer => {
  let svg: string;
  try {
    svg = optimize(raw, {
      multipass: true,
      // SVGO 4 dropped removeViewBox from preset-default; no override needed.
      plugins: ['preset-default'],
    }).data;
  } catch {
    svg = raw;
  }
  svg = svg
    .replace(/\s*\bwidth="[^"]*"/g, '')
    .replace(/\s*\bheight="[^"]*"/g, '')
    .replace(/<svg\b/, `<svg width="${size}" height="${size}"`);
  if (!/\bviewBox="/i.test(svg)) {
    svg = svg.replace(/<svg\b/, `<svg viewBox="0 0 ${size} ${size}"`);
  }
  return Buffer.from(svg, 'utf-8');
};

const convertToRaster = async (svgPath: string): Promise<void> => {
  const svgText = await fs.promises.readFile(svgPath, 'utf-8');
  const dir = path.dirname(svgPath);
  const base = path.basename(svgPath, '.svg');

  for (const size of IMAGE_SIZES) {
    for (const [ext, method] of [
      ['jpg', 'jpeg'],
      ['png', 'png'],
      ['webp', 'webp'],
    ] as const) {
      const outFile = path.join(dir, `${base}_${size}x${size}.${ext}`);
      try {
        await fs.promises.stat(outFile);
        continue; // already exists
      } catch {
        // create it
      }
      try {
        const svgBuffer = prepareSvg(svgText, size);
        await sharp(svgBuffer, { density: 96 })
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          [method as 'jpeg' | 'png' | 'webp']({ quality: 90 })
          .toFile(outFile);
      } catch (err) {
        console.warn(`  Skipping ${path.basename(outFile)}: ${(err as Error).message}`);
      }
    }
  }
};

// ---------------------------------------------------------------------------
// Main logic
// ---------------------------------------------------------------------------

const fetchFhwaSvgs = async (cc: string): Promise<void> => {
  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  const remaining = new Map(MISSING.map((t) => [t.code, t]));

  for (const zipUrl of ZIP_RELEASES) {
    if (remaining.size === 0) break;

    const label = path.basename(zipUrl);
    console.log(`\n${label}`);

    let fileSize: number;
    try {
      fileSize = await getFileSize(zipUrl);
      console.log(`  Size: ${(fileSize / 1024 / 1024).toFixed(1)} MB`);
    } catch (err) {
      console.warn(`  Skipping (HEAD failed): ${(err as Error).message}`);
      continue;
    }

    // Read just the last 65 KB to find the EOCD record.
    const tailSize = Math.min(65536, fileSize);
    const tail = await fetchRange(zipUrl, fileSize - tailSize, fileSize - 1);
    const eocd = findEOCD(tail);
    if (!eocd) {
      console.warn('  Could not find EOCD — skipping ZIP');
      continue;
    }

    // Download only the central directory.
    const cdBuf = await fetchRange(zipUrl, eocd.cdOffset, eocd.cdOffset + eocd.cdSize - 1);
    const entries = parseCentralDirectory(cdBuf);
    const svgEntries = entries.filter((e) => e.filename.toLowerCase().endsWith('.svg'));
    console.log(`  Entries: ${entries.length} total, ${svgEntries.length} SVGs`);

    for (const [code, target] of [...remaining.entries()]) {
      // Try exact stripped match first, then zero-padded FHWA 2024 pattern.
      const lower = strip(code);
      const pattern = fhwaPattern(code);
      const match = svgEntries.find((e) => {
        const base = path.basename(e.filename, '.svg');
        if (strip(base).includes(lower)) return true;
        if (pattern && pattern.test(base)) return true;
        return false;
      });
      if (!match) continue;

      const destDir = path.join(assetsRoot, target.cat, sanitize(code));
      await fs.promises.mkdir(destDir, { recursive: true });
      const destFile = path.join(destDir, target.destFilename);

      try {
        const stat = await fs.promises.stat(destFile);
        if (stat.size > 0) {
          console.log(`  Skipping (exists): ${code}`);
          remaining.delete(code);
          continue;
        }
      } catch {
        // doesn't exist — download it
      }

      // FHWA ZIPs contain multiple sizes (18x18, 24x24, 36x36, 48x48 etc.)
      // for the same sign. Pick the largest available.
      const allVariants = svgEntries.filter((e) => {
        const base = path.basename(e.filename, '.svg');
        if (strip(base).includes(lower)) return true;
        if (pattern && pattern.test(base)) return true;
        return false;
      });
      // Pick variant with the largest pixel area
      const best = allVariants.reduce((prev, cur) => {
        const sm = path.basename(cur.filename, '.svg').match(/(\d+)x(\d+)$/);
        const sz = sm ? parseInt(sm[1], 10) * parseInt(sm[2], 10) : 0;
        const pm = path.basename(prev.filename, '.svg').match(/(\d+)x(\d+)$/);
        const ps = pm ? parseInt(pm[1], 10) * parseInt(pm[2], 10) : 0;
        return sz > ps ? cur : prev;
      }, match);

      console.log(`  Downloading ${code} ← ${best.filename}`);
      try {
        const raw = await extractEntry(zipUrl, best);
        const svgText = raw.toString('utf-8');
        if (!svgText.trimStart().startsWith('<')) {
          console.warn(`  Skipping ${code}: not SVG content`);
          continue;
        }
        await fs.promises.writeFile(destFile, svgText, 'utf-8');
        console.log(`    Saved ${destFile}`);
        await convertToRaster(destFile);
        remaining.delete(code);
        await sleep(200);
      } catch (err) {
        console.warn(`  Failed ${code}: ${(err as Error).message}`);
      }
    }
  }

  if (remaining.size > 0) {
    console.log(`\nNot found in any FHWA release (${remaining.size}):`);
    for (const code of remaining.keys()) console.log(`  ${code}`);
  } else {
    console.log('\nAll target signs downloaded!');
  }
};

const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1] ?? 'us';
fetchFhwaSvgs(cc).catch((err) => {
  console.error(err);
  process.exit(1);
});
