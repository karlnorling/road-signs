/**
 * scrape-kp.ts — North Korea (DPRK)
 *
 * 29 road sign SVGs exist on Wikimedia Commons under Korean-language filenames.
 * No alphanumeric codes are used; signs are mapped to descriptive English slugs.
 * Run via: yarn update --country=kp
 */

const USER_AGENT = 'road-signs-scraper/1.0 (https://github.com/karlnorling/road-signs)';

const KP_SIGN_MAP: Record<string, { code: string; category: string }> = {
  '갈림길안내 (2)': { code: 'road-split-guidance', category: 'information' },
  '갈럼길안내 (2)': { code: 'road-split-guidance', category: 'information' },
  건넛길: { code: 'crossway', category: 'information' },
  건늠길: { code: 'crossway', category: 'information' },
  '차굴 안내': { code: 'tunnel-guidance', category: 'information' },
  고속도로끝안내: { code: 'highway-end-guidance', category: 'information' },
  고속도로분기점: { code: 'highway-junction', category: 'information' },
  고속도로시작안내: { code: 'highway-start-guidance', category: 'information' },
  고속도로시점: { code: 'highway-start-point', category: 'information' },
  고속도로종점: { code: 'highway-end-point', category: 'information' },
  나팔울리기: { code: 'horn-signal', category: 'mandatory' },
  '늘어나는 차선운행방향': { code: 'increasing-lane-direction', category: 'information' },
  도경계안내: { code: 'road-boundary-guidance', category: 'information' },
  '되돌릴수 있는 도로': { code: 'reversible-road', category: 'mandatory' },
  려관안내: { code: 'inn-guidance', category: 'information' },
  '사람 및 자전거 통행도로': { code: 'pedestrian-bicycle-road', category: 'mandatory' },
  '사람만 다니는 도로': { code: 'pedestrian-only-road', category: 'mandatory' },
  속도구간안내: { code: 'speed-zone-guidance', category: 'information' },
  '승용차만 다니는 도로': { code: 'car-only-road', category: 'mandatory' },
  원형도로: { code: 'roundabout', category: 'information' },
  '자전거만 다니는 도로': { code: 'bicycle-only-road', category: 'mandatory' },
  주차장안내: { code: 'parking-guidance', category: 'information' },
  '줄어드는 차선운행방향': { code: 'decreasing-lane-direction', category: 'information' },
  지하건넛길안내: { code: 'underground-crossing', category: 'information' },
  지하건늠길안내: { code: 'underground-crossing', category: 'information' },
  '헌병시적지 및 헌병전적지안내': { code: 'military-checkpoint-guidance', category: 'information' },
  '차로 안내': { code: 'lane-guidance', category: 'information' },
  '차선운행방향(1)': { code: 'lane-direction-1', category: 'information' },
  '차선운행방향(2)': { code: 'lane-direction-2', category: 'information' },
  최저속도제한: { code: 'minimum-speed-limit', category: 'mandatory' },
  택시주차장안내: { code: 'taxi-parking-guidance', category: 'information' },
  '한방향 운행도로': { code: 'one-way-road', category: 'mandatory' },
  '횡단시적지 및 횡단전적지안내': { code: 'crossing-guidance', category: 'information' },
  화살방향운행도로: { code: 'arrow-direction-road', category: 'information' },
};

interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string;
  category: string;
}

type ScrapedData = Record<string, ScrapedSign[]>;

async function scrape(): Promise<ScrapedData> {
  const result: ScrapedData = {
    warning: [],
    priority: [],
    prohibitory: [],
    mandatory: [],
    information: [],
  };

  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers' +
    '&cmtitle=Category:SVG_road_signs_in_North_Korea&cmtype=file&cmlimit=500&format=json&origin=*';

  console.log('  Fetching SVG_road_signs_in_North_Korea from Wikimedia Commons...');
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Commons API error: ${res.status}`);

  const json = (await res.json()) as {
    query: { categorymembers: Array<{ title: string }> };
  };

  for (const member of json.query?.categorymembers ?? []) {
    const title = member.title;
    if (!title.toLowerCase().endsWith('.svg')) continue;

    const koreanName = title
      .replace(/^File:/i, '')
      .replace(/\.svg$/i, '')
      .replace(/_/g, ' ');
    const mapping = KP_SIGN_MAP[koreanName];
    if (!mapping) {
      console.warn(`  Warning: no mapping for KP sign: "${koreanName}"`);
      continue;
    }

    const imageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(title).replace(/%20/g, '_')}`;
    result[mapping.category].push({
      code: mapping.code,
      name: koreanName,
      imageUrl,
      category: mapping.category,
    });
  }

  return result;
}

export default scrape;
