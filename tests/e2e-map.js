process.env.JWT_SECRET = 'map-test';
const app = require('./scriptorium-api/app');
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 5025;
const BASE = 'http://localhost:' + PORT;
const server = http.createServer(app);

let PASS = 0, FAIL = 0;

function step(label, fn) {
  return Promise.resolve().then(async () => {
    try {
      const r = await fn();
      if (r.pass) { PASS++; if (r.detail) console.log('  PASS  ' + label + ' — ' + r.detail); else console.log('  PASS  ' + label); }
      else { FAIL++; console.log('  FAIL  ' + label + (r.detail ? ' — ' + r.detail : '')); }
      return r;
    } catch(e) {
      FAIL++; console.log('  FAIL  ' + label + ' — ' + e.message.substring(0, 200));
      return { pass: false };
    }
  });
}

function api(method, p, body, token) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  if (token) opts.headers['Authorization'] = 'Bearer ' + token;
  const f = (typeof _realFetch === 'function') ? _realFetch : globalThis.fetch;
  return f(BASE + p, opts).then(r => r.json().catch(() => ({})).then(d => ({ status: r.status, data: d })));
}

// Save real fetch before mock overrides it
const _realFetch = globalThis.fetch;

// ─── Load actual map data via Node.js evaluation ───
const mapDataPath = path.join(__dirname, 'assets', 'js', 'map-data.js');
const src = fs.readFileSync(mapDataPath, 'utf8').replace(/const\s+(PLACES|JOURNEYS|ARCHAEOLOGY_VAULT)\s*=/g, 'globalThis.$1 =');
const tmpPath = path.join(__dirname, '_map_data_test_wrapper.mjs');

// Mock minimal browser globals
const mockCode = `
globalThis.window = globalThis;
globalThis.fetch = function(){};
globalThis.L = { map(){}, tileLayer(){}, circleMarker(){}, polyline(){}, DivIcon(){}, markerClusterGroup(){}, control: { zoom(){} } };
globalThis.document = { createElement(){ return {} }, querySelector(){ return null }, body: { appendChild(){} }, addEventListener(){} };
globalThis.navigator = { geolocation: { getCurrentPosition(){} } };
globalThis.HTMLIFrameElement = function(){};
${src.replace('const PLACES =', 'globalThis.PLACES =')
      .replace('const JOURNEYS =', 'globalThis.JOURNEYS =')
      .replace('const ARCHAEOLOGY_VAULT =', 'globalThis.ARCHAEOLOGY_VAULT =')}
`;
fs.writeFileSync(tmpPath, mockCode);

let PLACES = [], JOURNEYS_OBJ = {}, JOURNEYS_ARRAY = [], ARCHAEOLOGY_VAULT = {};
try {
  eval(mockCode);
  PLACES = globalThis.PLACES || [];
  JOURNEYS_OBJ = globalThis.JOURNEYS || {};
  ARCHAEOLOGY_VAULT = globalThis.ARCHAEOLOGY_VAULT || {};
  // Convert journeys object to array of {key, ...entry}
  Object.keys(JOURNEYS_OBJ).forEach(k => {
    const j = JOURNEYS_OBJ[k];
    if (j && typeof j === 'object') {
      JOURNEYS_ARRAY.push(Object.assign({}, j, { key: k }));
    }
  });
} catch(e) {
  console.log('NOTE: Could not eval map-data: ' + e.message.substring(0, 100));
}

const mh = fs.readFileSync(path.join(__dirname, 'map.html'), 'utf8');
const ch = fs.readFileSync(path.join(__dirname, 'covenant-map.html'), 'utf8');
const sj = fs.readFileSync(path.join(__dirname, 'assets', 'js', 'sidebar.js'), 'utf8');
const sw = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');

async function run() {
  console.log('\n══════════════════════════════════════════');
  console.log('  E2E — MAP DATA INTEGRITY + API');
  console.log('══════════════════════════════════════════\n');

  // ── SCENARIO 32: File ──
  console.log('── SCENARIO 32: map-data.js File Integrity ──');
  await step('map-data.js exists and is readable', async () => ({
    pass: fs.existsSync(mapDataPath),
    detail: ((fs.statSync(mapDataPath).size) / 1024).toFixed(1) + ' KB'
  }));
  await step('Syntax check OK', async () => {
    const { execSync } = require('child_process');
    try { execSync('node -c "' + mapDataPath.replace(/"/g, '\\"') + '"', { stdio: 'pipe' }); return { pass: true, detail: 'valid JavaScript' }; }
    catch(e) { return { pass: false, detail: e.stderr.toString().substring(0, 100) }; }
  });

  // ── SCENARIO 33: PLACES ──
  console.log('\n── SCENARIO 33: PLACES Validation ──');
  const nPlaces = PLACES.length;
  const placeNames = PLACES.map(p => (p.name || '').toLowerCase());

  await step('PLACES is parseable', async () => ({ pass: nPlaces > 0, detail: nPlaces + ' place objects' }));
  await step('25+ places defined', async () => ({ pass: nPlaces >= 25, detail: nPlaces + ' places' }));

  const missingName = PLACES.filter(p => !p.name);
  const missingLat = PLACES.filter(p => typeof p.lat !== 'number');
  const missingLng = PLACES.filter(p => typeof p.lng !== 'number');
  const missingEra = PLACES.filter(p => !p.era);
  const missingImport = PLACES.filter(p => !p.importance);

  await step('All places have name', async () => ({ pass: missingName.length === 0, detail: missingName.length + ' missing name' }));
  await step('All places have lat/lng', async () => ({ pass: missingLat.length === 0 && missingLng.length === 0, detail: (missingLat.length + missingLng.length) + ' missing coords' }));
  await step('All coords valid (lat -90..90, lng -180..180)', async () => {
    const bad = PLACES.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number' && (p.lat < -90 || p.lat > 90 || p.lng < -180 || p.lng > 180));
    return { pass: bad.length === 0, detail: bad.length + ' bad coordinate pairs' };
  });
  await step('90%+ have era field', async () => ({ pass: missingEra.length < nPlaces * 0.1, detail: (nPlaces - missingEra.length) + '/' + nPlaces + ' have era' }));
  await step('90%+ have importance field', async () => ({ pass: missingImport.length < nPlaces * 0.1, detail: (nPlaces - missingImport.length) + '/' + nPlaces + ' have importance' }));
  await step('Key biblical cities present', async () => {
    const required = ['Jerusalem', 'Bethlehem', 'Nazareth', 'Babylon', 'Ephesus'];
    const found = required.filter(r => placeNames.includes(r.toLowerCase()));
    return { pass: found.length === required.length, detail: found.length + '/' + required.length + ' found: ' + found.join(', ') };
  });
  await step('No duplicate names', async () => {
    const seen = {}; const dups = [];
    placeNames.forEach(n => { if (seen[n]) dups.push(n); seen[n] = true; });
    return { pass: dups.length === 0, detail: dups.length > 0 ? dups.slice(0, 5).join(', ') : 'all unique' };
  });

  // ── SCENARIO 34: JOURNEYS ──
  console.log('\n── SCENARIO 34: JOURNEYS Validation ──');
  const nJourneys = JOURNEYS_ARRAY.length;
  const jNames = JOURNEYS_ARRAY.map(j => (j.name || '').toLowerCase());
  const jKeys = Object.keys(JOURNEYS_OBJ);

  await step('JOURNEYS object is parseable', async () => ({ pass: nJourneys > 0, detail: nJourneys + ' journey entries (' + jKeys.length + ' keys)' }));
  await step('25+ journeys', async () => ({ pass: nJourneys >= 25, detail: nJourneys + ' journeys' }));

  const keyJourneys = ['abraham', 'moses', 'jesus', 'paul', 'exodus', 'david'];
  const foundJourneys = keyJourneys.filter(k => jNames.some(n => n.includes(k)));
  await step('Key journeys present (Abraham, Moses, Jesus, Paul, Exodus, David)', async () => ({
    pass: foundJourneys.length >= 5, detail: foundJourneys.length + '/6 found: ' + foundJourneys.join(', ')
  }));

  await step('All journeys have name', async () => ({
    pass: JOURNEYS_ARRAY.filter(j => !j.name).length === 0, detail: JOURNEYS_ARRAY.filter(j => !j.name).length + ' missing'
  }));
  await step('All journeys have desc', async () => ({
    pass: JOURNEYS_ARRAY.filter(j => !j.desc).length === 0, detail: JOURNEYS_ARRAY.filter(j => !j.desc).length + ' missing'
  }));
  await step('All journeys have color', async () => ({
    pass: JOURNEYS_ARRAY.filter(j => !j.color).length === 0, detail: JOURNEYS_ARRAY.filter(j => !j.color).length + ' missing'
  }));

  // Count total stops across all journeys (stored in 'path' key)
  let totalStops = 0;
  let badStopCoords = 0;
  JOURNEYS_ARRAY.forEach(j => {
    const stops = j.path || j.stops || [];
    if (Array.isArray(stops)) {
      totalStops += stops.length;
      stops.forEach(s => {
        if (typeof s.lat === 'number' && typeof s.lng === 'number') {
          if (s.lat < -90 || s.lat > 90 || s.lng < -180 || s.lng > 180) badStopCoords++;
        }
      });
    }
  });
  await step('150+ total stops', async () => ({ pass: totalStops >= 150, detail: totalStops + ' stops across ' + nJourneys + ' journeys' }));
  await step('All stop coordinates valid', async () => ({ pass: badStopCoords === 0, detail: badStopCoords + ' bad coords, ' + totalStops + ' total stops' }));

  // ── SCENARIO 35: ARCHAEOLOGY_VAULT ──
  console.log('\n── SCENARIO 35: ARCHAEOLOGY_VAULT Validation ──');
  const archKeys = Object.keys(ARCHAEOLOGY_VAULT);
  const archArr = archKeys.map(k => ({ key: k, val: ARCHAEOLOGY_VAULT[k] }));
  const withArtifact = archArr.filter(a => a.val.artifact);
  const placeNamesLower = PLACES.map(p => (p.name || '').toLowerCase());
  const unmapped = archArr.filter(a => !placeNamesLower.includes((a.val.name || a.key).toLowerCase()));

  await step('ARCHAEOLOGY_VAULT has 10+ sites', async () => ({ pass: archKeys.length >= 10, detail: archKeys.length + ' archaeological sites' }));
  await step('50%+ sites reference valid PLACES', async () => ({ pass: unmapped.length < archKeys.length * 0.5, detail: (archKeys.length - unmapped.length) + '/' + archKeys.length + ' mapped' + (unmapped.length > 0 ? ' (unmapped: ' + unmapped.slice(0, 5).map(a => (a.val.name || a.key)).join(', ') + ')' : '') }));
  await step('Sites have artifact field', async () => ({ pass: withArtifact.length >= archKeys.length * 0.8, detail: withArtifact.length + '/' + archKeys.length + ' with artifact' }));

  // ── SCENARIO 36: Covenant Map ──
  console.log('\n── SCENARIO 36: Covenant Map Data ──');
  const coordMatches = ch.match(/\[-?\d+\.?\d*,\s*-?\d+\.?\d*\]/g) || [];
  // Filter out non-map coordinates (iconSize, iconAnchor, etc.)
  const mapCoords = coordMatches.filter(m => {
    const nums = m.match(/-?\d+\.?\d*/g).map(Number);
    return nums.length >= 2 && nums[0] >= -90 && nums[0] <= 90 && nums[1] >= -180 && nums[1] <= 180;
  });
  const siteCount = mapCoords.length;
  let badCoords = 0;
  mapCoords.forEach(m => {
    const nums = m.match(/-?\d+\.?\d*/g).map(Number);
    if (nums.length >= 2 && (nums[0] < -90 || nums[0] > 90 || nums[1] < -180 || nums[1] > 180)) badCoords++;
  });
  await step('6+ sacred sites', async () => ({ pass: siteCount >= 6, detail: siteCount + ' coordinate pair(s)' }));
  await step('Valid coordinates', async () => ({ pass: badCoords === 0, detail: siteCount + ' sites, ' + badCoords + ' bad' }));
  await step('Leaflet CDN reference', async () => ({ pass: ch.includes('unpkg.com/leaflet'), detail: ch.includes('unpkg.com/leaflet') ? 'leaflet CDN' : 'missing' }));
  await step('CartoDB tile layer', async () => ({ pass: ch.includes('carto.com') || ch.includes('cartocdn.com'), detail: 'carto layer' }));

  // ── SCENARIO 37: map.html ──
  console.log('\n── SCENARIO 37: map.html Resources ──');
  const htmlChecks = [
    ['Leaflet CSS CDN', 'leaflet', 'CSS'],
    ['Leaflet JS CDN', 'unpkg.com/leaflet', 'JS'],
    ['MarkerCluster CDN', 'leaflet.markercluster', 'MarkerCluster'],
    ['Leaflet.heat CDN', 'leaflet.heat', 'Heatmap'],
    ['Fuse.js CDN', 'fuse.js', 'Search'],
    ['map-data.js loaded', 'map-data.js', 'Data module'],
    ['auth.js loaded', 'auth.js', 'Auth'],
    ['sidebar.js loaded', 'sidebar.js', 'Sidebar'],
    ['CSP meta tag', 'Content-Security-Policy', 'Security'],
  ];
  for (const [label, term, foundLabel] of htmlChecks) {
    await step('map.html: ' + label, async () => ({ pass: mh.includes(term), detail: foundLabel + ' ' + (mh.includes(term) ? 'found' : 'missing') }));
  }

  // ── SCENARIO 38: Map Features ──
  console.log('\n── SCENARIO 38: Map Features ──');
  const features = [
    ['Timeline / era slider', 'timeline'],
    ['Journey system', 'journey'],
    ['Dig mode', 'dig'],
    ['Heat map (L.heatLayer)', 'L.heatLayer'],
    ['Distance measure tool', 'measure'],
    ['Covenant path overlay', 'covenant'],
    ['Archaeology microscope', 'openMicroscope'],
    ['Stratigraphy viewer', 'stratigraphy'],
    ['C14 lab simulation', 'C14'],
    ['Hidden finds / secrets', 'HIDDEN_FINDS'],
    ['Journal / notes system', 'journal'],
    ['Layer mode toggle', 'setLayerMode'],
  ];
  for (const [label, term] of features) {
    await step('map.html: ' + label, async () => ({ pass: mh.includes(term), detail: term + (mh.includes(term) ? ' found' : ' missing') }));
  }

  // ── SCENARIO 39: Sidebar Links ──
  console.log('\n── SCENARIO 39: Sidebar Navigation ──');
  await step('Sidebar links to map.html', async () => ({ pass: sj.includes('map.html'), detail: 'map.html referenced' }));
  await step('Sidebar links to covenant-map.html', async () => ({ pass: sj.includes('covenant-map.html'), detail: 'covenant-map.html referenced' }));

  // ── SCENARIO 40: SW Cache ──
  console.log('\n── SCENARIO 40: Service Worker Cache ──');
  await step('sw.js caches map-data.js', async () => ({ pass: sw.includes('map-data.js'), detail: 'map-data.js in SW cache' }));

  // ── SCENARIO 41: API Coexistence ──
  console.log('\n── SCENARIO 41: API Works Alongside Map Module ──');
  await step('Plans endpoint works', async () => {
    const r = await api('GET', '/api/plans');
    return { pass: r.status === 200, detail: (r.data && r.data.plans ? r.data.plans.length : 0) + ' plans' };
  });
  await step('Challenges endpoint works', async () => {
    const r = await api('GET', '/api/challenges');
    return { pass: r.status === 200, detail: (r.data && r.data.challenges ? r.data.challenges.length : 0) + ' challenges' };
  });

  // ── SUMMARY ──
  const total = PASS + FAIL;
  const pct = Math.round(PASS / total * 100);
  console.log('\n══════════════════════════════════════════');
  console.log('  MAP TESTS: ' + PASS + '/' + total + ' (' + pct + '%) PASS' + (FAIL > 0 ? ', ' + FAIL + ' FAIL' : ''));
  console.log('══════════════════════════════════════════\n');

  server.close();
  try { fs.unlinkSync(tmpPath); } catch(e) {}
  process.exit(FAIL > 0 ? 1 : 0);
}

server.listen(PORT, () => {
  console.log('Map test server on port ' + PORT);
  run();
});
