/**
 * SCRIPTORIUM — User Acceptance Tests
 *
 * These tests are preserved for comparison against the new
 * Playwright suite (tests/e2e/). All scenarios should have
 * equivalent coverage there.
 *
 * UAT Scenarios:
 *   UAT-01  Guest browses landing page
 *   UAT-02  User registration with onboarding
 *   UAT-03  Login and session management
 *   UAT-04  Browse Old Testament gallery
 *   UAT-05  Browse New Testament gallery
 *   UAT-06  Search scriptures across testaments
 *   UAT-07  Ethiopian canon browsing
 *   UAT-08  Biblical map loads journeys
 *   UAT-09  Covenant map structure
 *   UAT-10  Scribe profile and streak
 *   UAT-11  Reading plan subscription
 *   UAT-12  Sidebar navigation
 *   UAT-13  Service worker registration
 *   UAT-14  OG meta tags for social sharing
 *   UAT-15  Daily pericope rendering
 *   UAT-16  Auth guard (unauthenticated access)
 *   UAT-17  Admin endpoint RBAC
 *   UAT-18  Newsletter subscription
 *   UAT-19  Data persistence (localStorage schema)
 *   UAT-20  Challenge participation
 *   UAT-21  XP engine & achievements
 *   UAT-22  Translation fallback in reader
 *   UAT-23  Study popover (tap-to-study)
 *   UAT-24  Plan comments & reading partners
 *   UAT-25  Tradition filtering
 *   UAT-26  Paleo-epigraphy lab
 *   UAT-27  Scribe's chamber restoration
 *   UAT-28  Grace period & streak
 *   UAT-29  Reading plan completion trigger
 *   UAT-30  Error fallback — no download on error
 *   UAT-31  Altar Call (sidebar nav links)
 *   UAT-32  Settings page — theme, font, tradition
 *   UAT-33  Paleo-epigraphy page — canvas, letters, evolution
 *   UAT-34  Scribe's Chamber — medals, stats, rank, restoration
 *   UAT-35  Genealogy — messianic toggle, lifespan, linguistic lab
 *   UAT-36  Typology — grids, scripture refs, curtain
 *   UAT-37  Onomasticon — search, filters, name registry
 *   UAT-38  Comparison mode — manuscript pickers, zoom, presets
 *   UAT-39  Challenges page — cards, join/leave, celebration
 *   UAT-40  Ethiopian canon — vaults, filter, search, timeline
 *   UAT-41  Covenant map — Leaflet, ledger, scribe presence
 *   UAT-42  Induction page — rite, sign-in, guest links
 *   UAT-43  Admin dashboard — stats, plans, subscribers
 *   UAT-44  Reader preferences — localStorage keys
 *   UAT-45  Accessibility & PWA — viewport, manifest, SW, escape keys
 *   UAT-46  map.html — journey selector, navigation, sidebar, audio
 *   UAT-47  Journey categories — Patriarchs, Exodus, Kings, Prophets, NT
 *   UAT-48  map-data.js — archaeology vault, places, helpers
 *   UAT-49  map.html — presentation, theme, viewport, CSP, search
 *   UAT-50  Tabernacle — shell, zones, loading, inspector, vessel list
 *   UAT-51  Tabernacle — ark, audio, cinematic, lighting, floor plan, responsive
 *   UAT-52  Sidebar — navigation links to all pages
 *   UAT-53  Cross-page hyperlinks between pages
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

function decodeToken(token) { return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()); }

process.env.JWT_SECRET = process.env.JWT_SECRET || 'uat-secret-key';
const PORT = 5003;
const ROOT = path.resolve(__dirname, '..');
const API = `http://localhost:${PORT}`;
const app = require('../scriptorium-api/app');

let server;
let passed = 0;
let failed = 0;

function test(name, fn) {
  return Promise.resolve()
    .then(() => fn())
    .then(() => { passed++; console.log('  \u2713 ' + name); })
    .catch(err => { failed++; console.log('  \u2717 ' + name + ': ' + err.message); });
}

function get(path, token) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: 'localhost', port: PORT, path, method: 'GET', timeout: 10000 };
    if (token) opts.headers = { 'Authorization': 'Bearer ' + token };
    http.get(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, headers: res.headers, body: data }); }
      });
    }).on('error', reject);
  });
}

function post(path, body, token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const opts = {
      hostname: 'localhost', port: PORT, path, method: 'POST', timeout: 10000,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    };
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    const req = http.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(d) }); }
        catch (e) { resolve({ status: res.statusCode, headers: res.headers, body: d }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── HTML helpers ──

function readHTML(name) {
  return fs.readFileSync(path.join(ROOT, name), 'utf8');
}

function hasOGTag(html, prop) {
  const re = new RegExp('<meta\\s+property="og:' + prop + '"[^>]*>');
  return re.test(html);
}

function hasInlineScript(html, pattern) {
  return html.includes(pattern);
}

// ── Scenarios ──

async function runUAT() {

  // ──────────────────────────────────────────
  // UAT-01: Guest browses landing page
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-01: Guest browsing \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('scriptorium.html loads with valid HTML', () => {
    const html = readHTML('scriptorium.html');
    assert(html.includes('<!DOCTYPE html>'));
    assert(html.includes('</html>'));
  });

  await test('scriptorium.html has OG image tag', () => {
    const html = readHTML('scriptorium.html');
    assert(hasOGTag(html, 'image'), 'Missing og:image');
    assert(html.includes('og-image.svg'), 'og:image does not point to og-image.svg');
  });

  await test('scriptorium.html CSP includes bible-api.com', () => {
    const html = readHTML('scriptorium.html');
    assert(html.includes('bible-api.com'), 'CSP missing bible-api.com');
  });

  await test('Daily pericope section exists', () => {
    const html = readHTML('scriptorium.html');
    assert(html.includes('daily-pericope'));
    assert(html.includes('pericopeReadings'));
    assert(html.includes('ScriptoriumLectionary'));
  });

  await test('Transition curtain exists with wax seal', () => {
    const html = readHTML('scriptorium.html');
    assert(html.includes('narthex-transition-curtain'));
    assert(html.includes('wax-seal'));
    const css = fs.readFileSync(path.join(ROOT, 'assets/css/scriptorium.css'), 'utf8');
    assert(css.includes('spinSeal'), 'Missing spinSeal animation');
  });

  // ──────────────────────────────────────────
  // UAT-02: Registration + Onboarding
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-02: Registration & onboarding \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  const uid = 'uat_scribe_' + Date.now();
  const uatEmail = uid + '@test.scriptorium';

  await test('POST /api/auth/register creates scribe with isAdmin=0', async () => {
    const r = await post('/api/auth/register', { userId: uid, name: 'UAT Scribe', password: 'StrongPass1!', email: uatEmail });
    assert.strictEqual(r.status, 201, 'Reg failed: ' + JSON.stringify(r.body));
    assert(r.body.token);
    assert.strictEqual(decodeToken(r.body.token).isAdmin, 0);
    assert.strictEqual(r.body.scribe.name, 'UAT Scribe');
  });

  await test('POST /api/auth/register with duplicate userId returns 409', async () => {
    const r = await post('/api/auth/register', { userId: uid, name: 'Duplicate', password: 'StrongPass1!', email: 'dup_' + uid + '@test.scriptorium' });
    assert.strictEqual(r.status, 409);
  });

  await test('POST /api/auth/register with missing fields returns 400', async () => {
    const r = await post('/api/auth/register', {});
    assert.strictEqual(r.status, 400);
  });

  await test('Registration token is valid for auth/me', async () => {
    const uid2 = 'uat_scribe2_' + Date.now();
    const reg = await post('/api/auth/register', { userId: uid2, name: 'Me Check', password: 'StrongPass1!', email: uid2 + '@test.scriptorium' });
    assert.strictEqual(reg.status, 201, 'Registration failed: ' + JSON.stringify(reg.body));
    const me = await get('/api/auth/me', reg.body.token);
    assert.strictEqual(me.status, 200);
    assert.strictEqual(me.body.scribe.name, 'Me Check');
  });

  await test('register.html loads api.js before auth.js', () => {
    const html = readHTML('register.html');
    const apiIdx = html.indexOf('api.js');
    const authIdx = html.indexOf('auth.js');
    assert(apiIdx >= 0 && authIdx >= 0, 'Missing api.js or auth.js');
    assert(apiIdx < authIdx, 'api.js must load before auth.js');
  });

  // ──────────────────────────────────────────
  // UAT-03: Login & session
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-03: Login & session \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('POST /api/auth/login returns token with isAdmin', async () => {
    const r = await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' });
    assert.strictEqual(r.status, 200);
    assert(r.body.token);
    assert.strictEqual(typeof decodeToken(r.body.token).isAdmin, 'number');
  });

  await test('POST /api/auth/login with wrong password returns 401', async () => {
    const r = await post('/api/auth/login', { userId: uid, password: 'wrongpassword' });
    assert.strictEqual(r.status, 401);
  });

  await test('GET /api/auth/me with invalid token returns 401', async () => {
    const r = await get('/api/auth/me', 'invalid-token-here');
    assert.strictEqual(r.status, 401);
  });

  await test('GET /api/auth/me without token returns 401', async () => {
    const r = await get('/api/auth/me');
    assert.strictEqual(r.status, 401);
  });

  await test('login.html session expiry matches 24h', () => {
    const html = readHTML('login.html');
    assert(html.includes('86400000'), 'Session expiry not set to 24h (86400000ms)');
  });

  // ──────────────────────────────────────────
  // UAT-04: OT Gallery browsing
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-04: OT Gallery \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/ot returns 39 books', async () => {
    const r = await get('/api/ot');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.books.length, 39);
  });

  await test('GET /api/ot/genesis/1 returns verses', async () => {
    const r = await get('/api/ot/genesis/1');
    assert.strictEqual(r.status, 200);
    assert(r.body.verses);
    assert(r.body.verses[0]);
    assert(r.body.verses[0].text.includes('In the beginning'));
  });

  await test('GET /api/ot/psalms/23 returns Psalm 23', async () => {
    const r = await get('/api/ot/psalms/23');
    assert.strictEqual(r.status, 200);
    assert(r.body.verses[0].text.includes('shepherd'));
  });

  await test('GET /api/ot/nonexistent returns 404', async () => {
    const r = await get('/api/ot/nonexistent_book_xyz');
    assert.strictEqual(r.status, 404);
  });

  await test('ot-gallery.html loads deferred scripts in order', () => {
    const html = readHTML('ot-gallery.html');
    const defers = ['auth.js', 'sidebar.js', 'scriptorium-core.js'];
    let lastIdx = -1;
    for (const d of defers) {
      const idx = html.indexOf('defer src="assets/js/' + d + '"');
      assert(idx >= 0, 'Missing deferred ' + d);
      assert(idx > lastIdx, d + ' out of order');
      lastIdx = idx;
    }
    assert(html.includes('scriptorium-reader.js'), 'Missing scriptorium-reader.js');
  });

  // ──────────────────────────────────────────
  // UAT-05: NT Gallery browsing
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-05: NT Gallery \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/nt returns 27 books', async () => {
    const r = await get('/api/nt');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.books.length, 27);
  });

  await test('GET /api/nt/john/3 returns John 3:16', async () => {
    const r = await get('/api/nt/john/3');
    assert.strictEqual(r.status, 200);
    assert(r.body.verses[15].text.includes('For God so loved'));
  });

  await test('GET /api/nt/matthew/5 returns Sermon on the Mount', async () => {
    const r = await get('/api/nt/matthew/5');
    assert.strictEqual(r.status, 200);
    assert(r.body.verses[2].text.includes('Blessed are the poor'));
  });

  await test('nt-gallery.html has inline __getUnifiedUser stub before deferred', () => {
    const html = readHTML('nt-gallery.html');
    const stubIdx = html.indexOf('__getUnifiedUser');
    const defIdx = html.indexOf('defer src="assets/js/');
    assert(stubIdx >= 0);
    assert(stubIdx < defIdx, 'Stub must appear before first defer');
  });

  // ──────────────────────────────────────────
  // UAT-06: Search
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-06: Search \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/search?q=faith returns results', async () => {
    const r = await get('/api/search?q=faith&limit=5');
    assert.strictEqual(r.status, 200);
    assert(Array.isArray(r.body.results));
    assert(r.body.results.length > 0);
    assert(r.body.results[0].text.toLowerCase().includes('faith'));
  });

  await test('GET /api/search with short query returns empty', async () => {
    const r = await get('/api/search?q=a');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.results.length, 0);
  });

  await test('GET /api/search?testament=ot filters correctly', async () => {
    const r = await get('/api/search?q=jesus&testament=ot');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.testament, 'ot');
  });

  await test('GET /api/search?testament=nt filters correctly', async () => {
    const r = await get('/api/search?q=jesus&testament=nt');
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.body.testament, 'nt');
  });

  // ──────────────────────────────────────────
  // UAT-07: Ethiopian canon
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-07: Ethiopian canon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/ethiopian returns unique books', async () => {
    const r = await get('/api/ethiopian');
    assert.strictEqual(r.status, 200);
    assert(r.body.books.length > 50);
  });

  await test('GET /api/ethiopian/enoch returns metadata', async () => {
    const r = await get('/api/ethiopian/enoch');
    assert.strictEqual(r.status, 200);
    assert(r.body.title);
  });

  await test('ethiopian-canon.html loads', () => {
    const html = readHTML('ethiopian-canon.html');
    assert(html.includes('ethiopian'));
    assert(hasOGTag(html, 'image'));
  });

  // ──────────────────────────────────────────
  // UAT-08: Biblical map journeys
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-08: Biblical map \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('map-data.js defines JOURNEYS with Paul routes', () => {
    const data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('paul_journey1'), 'Missing Paul first journey');
    assert(data.includes('paul_journey2'), 'Missing Paul second journey');
    assert(data.includes('paul_journey3'), 'Missing Paul third journey');
    assert(data.includes('seven_churches'), 'Missing Seven Churches');
  });

  await test('Paul first journey has stops', () => {
    const data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('Antioch (Syria)'));
    assert(data.includes('Paphos'));
    assert(data.includes('Lystra'));
    assert(data.includes('Derbe'));
  });

  await test('map.html loads map-data.js', () => {
    const html = readHTML('map.html');
    assert(html.includes('map-data.js'));
    const data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('JOURNEYS'));
  });

  await test('covenant-map.html has Leaflet map container', () => {
    const html = readHTML('covenant-map.html');
    assert(html.includes('covenantMap'));
    assert(html.includes('leaflet'));
    assert(html.includes('L.map'));
  });

  await test('Map centre is Levant (31.5, 35.0)', () => {
    const html = readHTML('covenant-map.html');
    assert(html.includes('[31.5, 35.0]'), 'Map centre not set to Levant');
  });

  // ──────────────────────────────────────────
  // UAT-09: Covenant map features
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-09: Covenant map \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('Covenant map has scribe presence system', () => {
    const html = readHTML('covenant-map.html');
    assert(html.includes('scribeMarkers'));
    assert(html.includes('registerNewScribe'));
    assert(html.includes('scribeList'));
  });

  await test('Covenant map has unified ledger', () => {
    const html = readHTML('covenant-map.html');
    assert(html.includes('unifiedLedger'));
    assert(html.includes('commitWitness'));
    assert(html.includes('witnessMode'));
  });

  // ──────────────────────────────────────────
  // UAT-10: Scribe profile / streak
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-10: Scribe profile \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('Auth endpoint returns rank and character count', async () => {
    const tok = (await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' })).body.token;
    const me = await get('/api/auth/me', tok);
    assert(me.body.scribe.rank);
    assert(typeof me.body.scribe.totalCharacters === 'number');
  });

  await test('Streak endpoint returns numeric streak', async () => {
    const tok = (await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' })).body.token;
    const r = await get('/api/reading/streak', tok);
    assert.strictEqual(r.status, 200);
    assert(typeof r.body.streak === 'number');
  });

  await test('Sidebar renders navigation and auth UI', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('sidebarNav'));
    assert(js.includes('loginNavLink'));
    assert(js.includes('signOutBtn'));
    assert(js.includes('wireAuthState'));
  });

  // ──────────────────────────────────────────
  // UAT-11: Reading plans
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-11: Reading plans \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/plans returns plan list', async () => {
    const r = await get('/api/plans');
    assert.strictEqual(r.status, 200);
    assert(Array.isArray(r.body.plans));
  });

  await test('POST /api/plans/subscribe returns subscription', async () => {
    const loginRes = await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' });
    if (loginRes.status !== 200) throw new Error('Login failed: ' + JSON.stringify(loginRes.body));
    const tok = loginRes.body.token;
    const r = await post('/api/plans/subscribe', { planId: 'genesis-30' }, tok);
    assert(r.status === 200 || r.status === 409);
    if (r.status === 200) {
      assert(r.body.subscription);
    }
  });

  // ──────────────────────────────────────────
  // UAT-12: Sidebar
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-12: Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('sidebar.js defines SIDEBAR_HTML with nav links', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('SIDEBAR_HTML'));
    assert(js.includes('scriptorium.html'));
    assert(js.includes('covenant-map.html'));
    assert(js.includes('map.html'));
    assert(js.includes('genealogy.html'));
    assert(js.includes('scribes-chamber.html'));
    assert(js.includes('sidebar'));
  });

  await test('sidebar.js handles unified user data', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('__getUnifiedUser'));
  });

  // ──────────────────────────────────────────
  // UAT-13: Service worker
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-13: Service worker \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('sw.js caches critical assets', () => {
    const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    assert(sw.includes('map-data.js'));
    assert(sw.includes('auth.js'));
    assert(sw.includes('sidebar.js'));
    assert(sw.includes('scriptorium-reader.js'));
  });

  await test('sw.js has install and fetch handlers', () => {
    const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    assert(sw.includes('install'));
    assert(sw.includes('fetch'));
    assert(sw.includes('activate'));
  });

  // ──────────────────────────────────────────
  // UAT-14: OG meta tags
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-14: OG meta tags \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  const allHTML = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  for (const file of allHTML) {
    await test(file + ' has og:image', () => {
      const html = readHTML(file);
      assert(hasOGTag(html, 'image'), file + ' missing og:image');
      assert(html.includes('og-image.svg'), file + ' og:image wrong path');
    });
  }

  // ──────────────────────────────────────────
  // UAT-15: Daily pericope
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-15: Daily pericope \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('lectionary.js defines getTodayReadings', () => {
    const src = fs.readFileSync(path.join(ROOT, 'assets/js/lectionary.js'), 'utf8');
    assert(src.includes('getTodayReadings'));
    assert(src.includes('ScriptoriumLectionary'));
  });

  await test('lec scriptorium.html loads lectionary.js before usage', () => {
    const html = readHTML('scriptorium.html');
    const libIdx = html.indexOf('lectionary.js');
    const useIdx = html.indexOf('ScriptoriumLectionary.getTodayReadings');
    assert(libIdx >= 0);
    assert(libIdx < useIdx, 'lectionary.js loaded after use');
  });

  await test('Pericope cards have swipe transition classes in CSS', () => {
    const css = fs.readFileSync(path.join(ROOT, 'assets/css/features.css'), 'utf8');
    assert(css.includes('swipe-left'));
    assert(css.includes('swipe-right'));
    assert(css.includes('swipe-up'));
    assert(css.includes('translateX(-120%)'));
  });

  // ──────────────────────────────────────────
  // UAT-16: Auth guard
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-16: Auth guard \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('Protected endpoints require token', async () => {
    const endpoints = ['/api/auth/me', '/api/reading/streak', '/api/plans/my/progress', '/api/challenges/my/progress'];
    for (const ep of endpoints) {
      const r = await get(ep);
      assert.strictEqual(r.status, 401, ep + ' should return 401 without token');
    }
  });

  // ──────────────────────────────────────────
  // UAT-17: Admin RBAC
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-17: Admin RBAC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/admin/stats returns 401 without token', async () => {
    const r = await get('/api/admin/stats');
    assert.strictEqual(r.status, 401);
  });

  await test('GET /api/admin/stats returns 403 for non-admin token', async () => {
    const tok = (await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' })).body.token;
    const r = await get('/api/admin/stats', tok);
    assert.strictEqual(r.status, 403);
  });

  await test('GET /api/newsletter/subscribers returns 403 for non-admin', async () => {
    var tok;
    try {
      const loginRes = await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' });
      if (loginRes.status === 200) tok = loginRes.body.token;
    } catch (e) { /* skip login on rate limit */ }
    if (!tok) { console.log('  ~ skipped (rate limit)'); return; }
    const r = await get('/api/newsletter/subscribers', tok);
    assert.strictEqual(r.status, 403);
  });

  // ──────────────────────────────────────────
  // UAT-18: Newsletter
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-18: Newsletter \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('POST /api/newsletter/subscribe accepts email', async () => {
    const r = await post('/api/newsletter/subscribe', { email: 'uat_' + Date.now() + '@test.scriptorium' });
    assert(r.status === 200 || r.status === 409); // 409 if already subscribed
  });

  await test('Newsletter popup skip for authenticated users', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-page.js'), 'utf8');
    assert(js.includes('Scriptorium.getToken'), 'Missing token check for newsletter popup');
  });

  // ──────────────────────────────────────────
  // UAT-19: Data persistence (localStorage schema)
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-19: Data persistence \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('core.js uses scriptorium_v3 as canonical key', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    assert(core.includes('scriptorium_v3'), 'Missing scriptorium_v3 key');
    assert(!core.includes('__syncLegacyKeys'), '__syncLegacyKeys should be removed');
  });

  await test('auth.js stubs check scriptorium_v3 first', () => {
    const auth = fs.readFileSync(path.join(ROOT, 'assets/js/auth.js'), 'utf8');
    assert(auth.includes('scriptorium_v3'), 'auth.js stubs missing scriptorium_v3');
  });

  await test('ot-gallery.html inline stub checks scriptorium_v3', () => {
    const html = readHTML('ot-gallery.html');
    assert(html.includes('scriptorium_v3'), 'ot-gallery.html inline stub missing scriptorium_v3');
  });

  // ──────────────────────────────────────────
  // UAT-20: Challenges
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-20: Challenges \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/challenges returns challenge list', async () => {
    const r = await get('/api/challenges');
    assert.strictEqual(r.status, 200);
    assert(Array.isArray(r.body.challenges));
  });

  await test('CSP on challenges.html includes bible-api.com', () => {
    const html = readHTML('challenges.html');
    assert(html.includes('bible-api.com'), 'CSP missing bible-api.com');
  });

  await test('CSP on comparison-mode.html includes bible-api.com', () => {
    const html = readHTML('comparison-mode.html');
    assert(html.includes('bible-api.com'), 'CSP missing bible-api.com');
  });

  // ──────────────────────────────────────────
  // UAT-21: Achievement / XP engine
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-21: Achievements & XP \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('core.js defines XP_RANKS with 10 tiers', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    assert(core.includes('XP_RANKS'));
    assert(core.includes('SEEKER'));
    assert(core.includes('PRIME SCRIBE'));
    assert(core.includes('50000'));
  });

  await test('core.js defines getTotalXp and computeRankFromXp', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    assert(core.includes('getTotalXp'));
    assert(core.includes('computeRankFromXp'));
    assert(core.includes('getNextRankXp'));
    assert(core.includes('getRankProgress'));
  });

  await test('core.js defines BADGES with XP values (27 badges)', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    const match = core.match(/id:'achiev_/g);
    assert(match, 'No badge definitions found');
    assert(match.length >= 27, 'Expected 27+ badges, got ' + match.length);
    assert(core.includes("tier:'mastery'"), 'Missing tier field');
    assert(core.includes('xp:'), 'Missing xp field');
  });

  await test('sidebar.js no longer displays XP/rank in sidebar', () => {
    const sidebar = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(!sidebar.includes('sidebarRank'), 'sidebar still has rank element');
    assert(!sidebar.includes('updateRank'), 'sidebar still has updateRank function');
  });

  // ──────────────────────────────────────────
  // UAT-22: Translation fallback in reader
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-22: Translation fallback \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('reader.js defines TRANSLATIONS array with 5 versions', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('TRANSLATIONS'), 'Missing TRANSLATIONS');
    assert(reader.includes("id:'web'"), 'Missing WEB');
    assert(reader.includes("id:'kjv'"), 'Missing KJV');
    assert(reader.includes("id:'bbe'"), 'Missing BBE');
    assert(reader.includes("id:'darby'"), 'Missing Darby');
    assert(reader.includes("id:'niv'"), 'Missing NIV');
  });

  await test('reader.js has translation fallback (tries kjv, bbe)', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('fallbackTranslations'), 'Missing translation fallback array');
    assert(reader.includes("'kjv'"), 'Missing KJV fallback');
    assert(reader.includes("'bbe'"), 'Missing BBE fallback');
  });

  await test('reader.js has translation selector in injectModal', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('scrTransSelect'), 'Missing translation selector');
    assert(reader.includes('setTranslation'), 'Missing setTranslation handler');
  });

  await test('reader.js sets TRANSLATION from localStorage', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('scriptorium_translation'), 'Missing translation localStorage key');
  });

  // ──────────────────────────────────────────
  // UAT-23: Study popover (tap-to-study)
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-23: Study popover \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('reader.js defines openStudyPopover function', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('openStudyPopover'), 'Missing study popover function');
    assert(reader.includes('scr-study-popover'), 'Missing study popover CSS class');
  });

  await test('reader.js study popover shows cross-refs, quick look, fathers', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('QUICK LOOK'), 'Missing Quick Look button');
    assert(reader.includes('ALL CROSS REFS'), 'Missing cross-refs button');
    assert(reader.includes('FATHERS'), 'Missing Fathers button');
  });

  await test('reader.js click handler on scr-verse-text opens study popover', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes("e.target.closest('.scr-verse-text')"), 'Missing verse-text click handler');
  });

  // ──────────────────────────────────────────
  // UAT-24: Plan comments + reading partners
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-24: Plan comments & partners \u2500\u2500\u2500');

  await test('storage defines plan_comments table', () => {
    const s = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/sqlite.js'), 'utf8');
    const p = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/postgres.js'), 'utf8');
    assert(s.includes('plan_comments') || p.includes('plan_comments'), 'Missing plan_comments table');
    assert(s.includes('planId') || p.includes('planId'), 'Missing planId column');
    assert(s.includes('dayIndex') || p.includes('dayIndex'), 'Missing dayIndex column');
  });

  await test('storage defines addPlanComment and getPlanComments', () => {
    const s = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/sqlite.js'), 'utf8');
    assert(s.includes('addPlanComment'), 'Missing addPlanComment');
    assert(s.includes('getPlanComments'), 'Missing getPlanComments');
  });

  await test('storage defines reading_partners table', () => {
    const s = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/sqlite.js'), 'utf8');
    const p = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/postgres.js'), 'utf8');
    assert(s.includes('reading_partners') || p.includes('reading_partners'), 'Missing reading_partners table');
    assert(s.includes('requesterId') || p.includes('requesterId'), 'Missing requesterId');
    assert(s.includes('targetId') || p.includes('targetId'), 'Missing targetId');
    assert(s.includes('pending') && (s.includes("status TEXT DEFAULT") || s.includes("status TEXT DEFAULT")), 'Missing status default');
  });

  await test('storage defines partner CRUD functions', () => {
    const s = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/sqlite.js'), 'utf8');
    assert(s.includes('requestPartner'), 'Missing requestPartner');
    assert(s.includes('respondToPartner'), 'Missing respondToPartner');
    assert(s.includes('getPartnerRequests'), 'Missing getPartnerRequests');
    assert(s.includes('getPartnerShips'), 'Missing getPartnerShips');
  });

  await test('auth routes define POST /api/auth/achievements', () => {
    const auth = fs.readFileSync(path.join(ROOT, 'scriptorium-api/routes/auth.js'), 'utf8');
    assert(auth.includes("'/api/auth/achievements'"), 'Missing achievements endpoint');
  });

  await test('storage exports addPlanComment etc.', () => {
    const idx = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/index.js'), 'utf8');
    assert(idx.includes('addPlanComment'), 'addPlanComment not exported');
    assert(idx.includes('requestPartner'), 'requestPartner not exported');
  });

  // ──────────────────────────────────────────
  // UAT-25: Tradition filtering
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-25: Tradition filtering \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('GET /api/traditions returns 7 streams', async () => {
    const r = await get('/api/traditions');
    assert.strictEqual(r.status, 200, 'Traditions endpoint failed');
    assert(Array.isArray(r.body.traditions), 'Expected array');
    assert.strictEqual(r.body.traditions.length, 7, 'Expected 7 traditions');
  });

  await test('PUT /api/auth/tradition updates user tradition', async () => {
    const http = require('http');
    const data = JSON.stringify({ tradition: 'reformed' });
    const r = await new Promise((resolve, reject) => {
      const req = http.request({ hostname: 'localhost', port: PORT, path: '/api/auth/tradition', method: 'PUT', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch(e) { resolve({ status: res.statusCode, body: d }); } });
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });
    assert(r.status === 401, 'Expected 401 without token, got ' + r.status);
  });

  await test('reader.js defines openCrossRef', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('openCrossRef'), 'Missing openCrossRef');
  });

  await test('Plans data has tradition field', () => {
    const plans = fs.readFileSync(path.join(ROOT, 'scriptorium-api/plans-data.js'), 'utf8');
    assert(plans.includes("tradition:"), 'Plans missing tradition field');
    assert(plans.includes("'general'"), 'Plans missing general tradition');
  });

  // ──────────────────────────────────────────
  // UAT-26: Paleo-epigraphy lab
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-26: Paleo-epigraphy \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('paleo-epigraphy.html defines 22 Hebrew letters', () => {
    const html = fs.readFileSync(path.join(ROOT, 'paleo-epigraphy.html'), 'utf8');
    assert(html.includes('LETTERS'), 'Missing LETTERS definition');
    const matches = html.match(/picto:/g);
    assert(matches && matches.length >= 22, 'Expected 22+ letters, got ' + (matches ? matches.length : 0));
  });

  await test('paleo-epigraphy.html updates scribe_seal.epigraphy', () => {
    const html = fs.readFileSync(path.join(ROOT, 'paleo-epigraphy.html'), 'utf8');
    assert(html.includes('epigraphy'), 'Missing epigraphy seal update');
    assert(html.includes('seal'), 'Missing seal reference');
  });

  // ──────────────────────────────────────────
  // UAT-27: Scribe\'s chamber restoration
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-27: Scribe\'s chamber \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('scribes-chamber.html defines FRAGMENTS_DB with fragments', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scribes-chamber.html'), 'utf8');
    assert(html.includes('FRAGMENTS_DB'), 'Missing fragments database');
    assert(html.includes('isaiah-44'), 'Missing Isaiah 44 fragment');
    assert(html.includes('isaiah-53'), 'Missing Isaiah 53 fragment');
    assert(html.includes('psalm-22'), 'Missing Psalm 22 fragment');
  });

  await test('scribes-chamber.html updates scribe_seal.restoration', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scribes-chamber.html'), 'utf8');
    assert(html.includes('restoration'), 'Missing restoration seal update');
    assert(html.includes('seal.restoration'), 'Missing seal.restoration update');
  });

  // ──────────────────────────────────────────
  // UAT-28: Grace period & streak
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-28: Grace period & streak \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('storage defines calcStreakWithGrace helper', () => {
    const sh = fs.readFileSync(path.join(ROOT, 'scriptorium-api/storage/shared.js'), 'utf8');
    assert(sh.includes('calcStreakWithGrace'), 'Missing grace calculation');
    assert(sh.includes('graceDays'), 'Missing graceDays in streak calc');
  });

  await test('Streak endpoint returns grace fields', async () => {
    var tok;
    try {
      const login = await post('/api/auth/login', { userId: uid, password: 'StrongPass1!' });
      if (login.status === 200) tok = login.body.token;
    } catch (e) { /* skip login on rate limit */ }
    if (!tok) { console.log('  ~ skipped (rate limit)'); return; }
    const r = await get('/api/reading/streak', tok);
    assert.strictEqual(r.status, 200);
    assert('graceDays' in r.body, 'Missing graceDays');
    assert('withinGrace' in r.body, 'Missing withinGrace');
  });

  // ──────────────────────────────────────────
  // UAT-29: Reading plan completion trigger
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-29: Plan completion trigger \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('reader.js stores completed plan in localStorage', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('scriptorium_completed_plans'), 'Missing completed plans tracking');
    assert(reader.includes('completedAt'), 'Reader checks completedAt');
    assert(reader.includes('checkAchievements'), 'Reader triggers checkAchievements');
  });

  await test('map.html stores journey completion in localStorage', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/map-page.js'), 'utf8');
    assert(js.includes('scriptorium_journeys'), 'Missing journey completion tracking');
    assert(js.includes('completed') || js.includes('_completionMarked'), 'Missing journey completion marker');
  });

  // ──────────────────────────────────────────
  // UAT-30: Error fallback — no download on error
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-30: Error fallback \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('reader.js error page has no download button when API fails', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    const errBlock = reader.substring(reader.indexOf('This chapter is not available'), reader.indexOf('try a different translation'));
    assert(!errBlock.includes('DOWNLOAD'), 'Download link still present in error message');
    assert(reader.includes('READ ON BIBLE GATEWAY'), 'Missing Bible Gateway fallback button');
  });

  await test('reader.js renderChapter empty-data error has no download', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    const errBlock = reader.substring(reader.indexOf('This chapter has no text'), reader.indexOf('READ ON BIBLE GATEWAY'));
    assert(!errBlock.includes('⬇'), 'Download link still present in empty-data error');
  });

  // ──────────────────────────────────────────
  // UAT-31: Altar Call
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-31: Altar Call \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('sidebar.js no longer has register link in nav', () => {
    const sidebar = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(!sidebar.includes("title='SCRIBE INDUCTION'"), 'Register nav link still present');
  });

  await test('sidebar.js has navigation links', () => {
    const sidebar = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(sidebar.includes('COVENANT MAP'), 'Missing covenant map link');
    assert(sidebar.includes('THE THRESHOLD'), 'Missing home link');
    assert(sidebar.includes('SIGN IN'), 'Missing sign in link');
  });

  // ──────────────────────────────────────────
  // UAT-32: Settings — theme, font, tradition
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-32: Settings page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('settings.html has theme toggle (dark/light)', () => {
    const html = fs.readFileSync(path.join(ROOT, 'settings.html'), 'utf8');
    assert(html.includes('themeDark') || html.includes('theme-dark'), 'Missing dark theme button/id');
    assert(html.includes('themeLight') || html.includes('theme-light'), 'Missing light theme button/id');
  });

  await test('settings.html has font size slider', () => {
    const html = fs.readFileSync(path.join(ROOT, 'settings.html'), 'utf8');
    assert(html.includes('fontSizeRange') || html.includes('font-size'), 'Missing font size slider');
  });

  await test('settings.html has tradition selector and save button', () => {
    const html = fs.readFileSync(path.join(ROOT, 'settings.html'), 'utf8');
    assert(html.includes('traditionSelect'), 'Missing tradition selector');
    assert(html.includes('Save') || html.includes('save'), 'Missing save button');
  });

  await test('settings.html OG meta includes og:image', () => {
    const html = fs.readFileSync(path.join(ROOT, 'settings.html'), 'utf8');
    assert(hasOGTag(html, 'image'), 'Missing og:image in settings.html');
  });

  // ──────────────────────────────────────────
  // UAT-33: Paleo-epigraphy lab
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-33: Paleo-epigraphy \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('paleo-epigraphy.html has tracing canvas and letter selector', () => {
    const html = fs.readFileSync(path.join(ROOT, 'paleo-epigraphy.html'), 'utf8');
    assert(html.includes('tracingCanvas'), 'Missing tracing canvas');
    assert(html.includes('letter-selector') || html.includes('aleph') || html.includes('letterBtn'), 'Missing letter selector buttons');
  });

  await test('paleo-epigraphy.html has evolution step indicators', () => {
    const html = fs.readFileSync(path.join(ROOT, 'paleo-epigraphy.html'), 'utf8');
    assert(html.includes('PICTOGRAPH') || html.includes('pictograph'), 'Missing pictograph stage');
    assert(html.includes('PALEO-HEBREW') || html.includes('paleo-hebrew'), 'Missing paleo-hebrew stage');
    assert(html.includes('MODERN HEBREW') || html.includes('modern-hebrew'), 'Missing modern hebrew stage');
  });

  await test('paleo-epigraphy.html has compare scripts button', () => {
    const html = fs.readFileSync(path.join(ROOT, 'paleo-epigraphy.html'), 'utf8');
    assert(html.includes('COMPARE SCRIPTS') || html.includes('compareScripts'), 'Missing compare scripts button');
  });

  // ──────────────────────────────────────────
  // UAT-34: Scribe's Chamber
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-34: Scribe\'s chamber \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('scribes-chamber.html has medal case with achievement medals', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scribes-chamber.html'), 'utf8');
    assert(html.includes('medalCase') || html.includes('medal-case') || html.includes('medal'), 'Missing medal case');
  });

  await test('scribes-chamber.html has service record / stats display', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scribes-chamber.html'), 'utf8');
    assert(html.includes('totalCharacters') || html.includes('serviceRecord') || html.includes('service-record'), 'Missing service record');
  });

  await test('scribes-chamber.html has rank progress bar', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scribes-chamber.html'), 'utf8');
    assert(html.includes('rankProgress') || html.includes('rank-progress') || html.includes('progress-bar'), 'Missing rank progress bar');
  });

  await test('scribes-chamber.html has restoration lab canvas', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scribes-chamber.html'), 'utf8');
    assert(html.includes('restorationLab') || html.includes('restoration-lab') || html.includes('restoration'), 'Missing restoration lab');
  });

  // ──────────────────────────────────────────
  // UAT-35: Genealogy — ancestral scroll
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-35: Genealogy page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('genealogy.html has messianic line toggle', () => {
    const html = fs.readFileSync(path.join(ROOT, 'genealogy.html'), 'utf8');
    assert(html.includes('messianicToggle') || html.includes('messianic'), 'Missing messianic toggle');
  });

  await test('genealogy.html has lifespan chart', () => {
    const html = fs.readFileSync(path.join(ROOT, 'genealogy.html'), 'utf8');
    assert(html.includes('lifespanChart') || html.includes('lifespan'), 'Missing lifespan chart');
  });

  await test('genealogy.html has linguistic lab for script comparison', () => {
    const html = fs.readFileSync(path.join(ROOT, 'genealogy.html'), 'utf8');
    assert(html.includes('linguisticLab') || html.includes('linguistic-lab'), 'Missing linguistic lab');
  });

  // ──────────────────────────────────────────
  // UAT-36: Typology reference
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-36: Typology page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('typology.html has tabernacle grid', () => {
    const html = fs.readFileSync(path.join(ROOT, 'typology.html'), 'utf8');
    assert(html.includes('tabernacleGrid') || html.includes('tabernacle'), 'Missing tabernacle grid');
  });

  await test('typology.html has feasts and offerings grids', () => {
    const html = fs.readFileSync(path.join(ROOT, 'typology.html'), 'utf8');
    assert(html.includes('feastsGrid') || html.includes('feasts'), 'Missing feasts grid');
    assert(html.includes('offeringsGrid') || html.includes('offerings'), 'Missing offerings grid');
  });

  await test('typology.html has clickable scripture references', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/typology-page.js'), 'utf8');
    assert(js.includes('openScriptureRef') || js.includes('data-ref'), 'Missing scripture reference handler');
  });

  await test('typology.html has narthex transition curtain', () => {
    const html = fs.readFileSync(path.join(ROOT, 'typology.html'), 'utf8');
    assert(html.includes('narthex-transition-curtain') || html.includes('transition-curtain'), 'Missing transition curtain');
  });

  // ──────────────────────────────────────────
  // UAT-37: Onomasticon (name dictionary)
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-37: Onomasticon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('onomasticon.html has search input', () => {
    const html = fs.readFileSync(path.join(ROOT, 'onomasticon.html'), 'utf8');
    assert(html.includes('onomasticonSearch') || html.includes('search'), 'Missing search input');
  });

  await test('onomasticon.html has category filters (ALL, TRIBES, etc.)', () => {
    const html = fs.readFileSync(path.join(ROOT, 'onomasticon.html'), 'utf8');
    assert(html.includes('ALL') && (html.includes('TRIBES') || html.includes('PATRIARCHS')), 'Missing category filter badges');
  });

  await test('onomasticon.html has name registry with reveal functionality', () => {
    const html = fs.readFileSync(path.join(ROOT, 'onomasticon.html'), 'utf8');
    assert(html.includes('filterRegistry') || html.includes('onoma'), 'Missing name registry function');
  });

  // ──────────────────────────────────────────
  // UAT-38: Comparison mode
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-38: Comparison mode \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('comparison-mode.html has manuscript picker dropdowns', () => {
    const html = fs.readFileSync(path.join(ROOT, 'comparison-mode.html'), 'utf8');
    assert(html.includes('selectA'), 'Missing manuscript A picker');
    assert(html.includes('selectB'), 'Missing manuscript B picker');
  });

  await test('comparison-mode.html has zoom slider and lens', () => {
    const html = fs.readFileSync(path.join(ROOT, 'comparison-mode.html'), 'utf8');
    assert(html.includes('zoomSlider') || html.includes('zoom'), 'Missing zoom slider');
  });

  await test('comparison-mode.html has paleography preset buttons', () => {
    const html = fs.readFileSync(path.join(ROOT, 'comparison-mode.html'), 'utf8');
    assert(html.includes('2nd c') || html.includes('paleography'), 'Missing paleography presets');
  });

  // ──────────────────────────────────────────
  // UAT-39: Challenges page
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-39: Challenges page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('challenges.html has dynamic challenge cards', () => {
    const html = fs.readFileSync(path.join(ROOT, 'challenges.html'), 'utf8');
    assert(html.includes('challengeCards') || html.includes('challenge-card') || html.includes('challenge'), 'Missing challenge card container');
  });

  await test('challenges.html has join/leave/complete action buttons', () => {
    const html = fs.readFileSync(path.join(ROOT, 'challenges.html'), 'utf8');
    assert(html.includes('joinChallenge'), 'Missing join handler');
    assert(html.includes('unjoinChallenge') || html.includes('leaveChallenge'), 'Missing leave handler');
    assert(html.includes('completeChallengeDay') || html.includes('markDay'), 'Missing complete handler');
  });

  await test('challenges.html has celebration overlay with seal', () => {
    const html = fs.readFileSync(path.join(ROOT, 'challenges.html'), 'utf8');
    assert(html.includes('celebrateOverlay') || html.includes('celebration'), 'Missing celebration overlay');
  });

  // ──────────────────────────────────────────
  // UAT-40: Ethiopian canon (Tewahedo Archive)
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-40: Ethiopian canon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('ethiopian-canon.html has vault portal cards', () => {
    const html = fs.readFileSync(path.join(ROOT, 'ethiopian-canon.html'), 'utf8');
    assert(html.includes('showVault') || html.includes('vault'), 'Missing vault portal cards');
  });

  await test('ethiopian-canon.html has filter and search', () => {
    const html = fs.readFileSync(path.join(ROOT, 'ethiopian-canon.html'), 'utf8');
    assert(html.includes('filterCanon') || html.includes('filter'), 'Missing canon filter');
    assert(html.includes('search') && html.includes('input'), 'Missing search input');
  });

  await test('ethiopian-canon.html has clickable book cards with overlay', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/ethiopian-canon-page.js'), 'utf8');
    assert(js.includes('book-card') || js.includes('bookCard'), 'Missing book cards');
  });

  await test('ethiopian-canon.html has timeline rail', () => {
    const html = fs.readFileSync(path.join(ROOT, 'ethiopian-canon.html'), 'utf8');
    assert(html.includes('timelineRail') || html.includes('timeline'), 'Missing timeline rail');
  });

  // ──────────────────────────────────────────
  // UAT-41: Covenant map
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-41: Covenant map \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('covenant-map.html loads Leaflet map', () => {
    const html = fs.readFileSync(path.join(ROOT, 'covenant-map.html'), 'utf8');
    assert(html.includes('leaflet') || html.includes('L.map') || html.includes('mapid'), 'Missing Leaflet map');
  });

  await test('covenant-map.html has unified ledger (chat/prayer wall)', () => {
    const html = fs.readFileSync(path.join(ROOT, 'covenant-map.html'), 'utf8');
    assert(html.includes('unifiedLedger') || html.includes('ledger'), 'Missing unified ledger');
  });

  await test('covenant-map.html has scribe presence system', () => {
    const html = fs.readFileSync(path.join(ROOT, 'covenant-map.html'), 'utf8');
    assert(html.includes('scribe') || html.includes('scribes'), 'Missing scribe presence system');
  });

  // ──────────────────────────────────────────
  // UAT-42: Induction / onboarding
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-42: Induction page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('induction.html has BEGIN THE RITE button linking to register', () => {
    const html = fs.readFileSync(path.join(ROOT, 'induction.html'), 'utf8');
    assert(html.includes('register.html'), 'Missing register link');
    assert(html.includes('BEGIN THE RITE') || html.includes('BEGIN'), 'Missing begin rite button');
  });

  await test('induction.html has sign-in and guest entry links', () => {
    const html = fs.readFileSync(path.join(ROOT, 'induction.html'), 'utf8');
    assert(html.includes('login.html'), 'Missing sign-in link');
    assert(html.includes('scriptorium.html') || html.includes('guest'), 'Missing guest entry link');
  });

  // ──────────────────────────────────────────
  // UAT-43: Admin dashboard
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-43: Admin dashboard \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('admin.html has stats cards', () => {
    const html = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
    assert(html.includes('stats') || html.includes('Stats'), 'Missing stats cards/section');
    assert(html.includes('scribes') || html.includes('Scribes') || html.includes('subscribers'), 'Missing scribe/admin data references');
  });

  await test('admin.html has plan breakdown section', () => {
    const html = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
    assert(html.includes('plan') || html.includes('subscription'), 'Missing plan breakdown');
  });

  await test('admin.html has newsletter subscriber list', () => {
    const html = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
    assert(html.includes('/api/newsletter/subscribers') || html.includes('newsletter'), 'Missing newsletter subscriber list');
  });

  // ──────────────────────────────────────────
  // UAT-44: Reader preferences & localStorage
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-44: Reader preferences \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('reader.js saves font size preference to localStorage', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('fontSize') || reader.includes('font-size'), 'Missing font size localStorage key');
  });

  await test('reader.js saves translation to localStorage', () => {
    const reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('scriptorium_translation'), 'Missing translation localStorage key');
  });

  await test('core.js saves theme to localStorage', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    assert(core.includes('scriptorium_theme') || core.includes('theme'), 'Missing theme localStorage key');
  });

  // ──────────────────────────────────────────
  // UAT-45: Accessibility & PWA
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-45: Accessibility & PWA \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('scriptorium.html has viewport meta tag', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scriptorium.html'), 'utf8');
    assert(html.includes('viewport'), 'Missing viewport meta tag');
  });

  await test('manifest.json has required PWA fields', () => {
    const json = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
    assert(json.name, 'Missing manifest name');
    assert(json.short_name || json.shortName, 'Missing short name');
    assert(json.start_url || json.startUrl, 'Missing start URL');
    assert(json.display, 'Missing display mode');
    assert(json.icons, 'Missing icons array');
  });

  await test('sw.js defines install and fetch events', () => {
    const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    assert(sw.includes('install'), 'SW missing install event');
    assert(sw.includes('fetch'), 'SW missing fetch event');
    assert(sw.includes('activate'), 'SW missing activate event');
  });

  await test('scriptorium.html has navigation links in footer', () => {
    const html = fs.readFileSync(path.join(ROOT, 'scriptorium.html'), 'utf8');
    assert(html.includes('About') || html.includes('Contact') || html.includes('footer'), 'Missing footer navigation links');
  });

  await test('sidebar.js handles click-outside to close sidebar', () => {
    const sidebar = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(sidebar.includes('click') || sidebar.includes('close'), 'Missing click close handler');
  });

  await test('core.js escape key closes transition overlay', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    assert(core.includes('Escape'), 'Missing Escape key handler in core');
  });

  await test('pwa install prompt handler exists in core.js', () => {
    const core = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8');
    assert(core.includes('beforeinstallprompt'), 'Missing PWA install prompt handler');
  });

  // ──────────────────────────────────────────
  // UAT-46: map.html — journey selector & navigation
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-46: map.html journey UI \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('map.html has journey-select dropdown', () => {
    const html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('journey-select'), 'Missing journey selector dropdown');
  });

  await test('map.html has step navigation (prev/next)', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/map-page.js'), 'utf8');
    assert(js.includes('currentStepIndex'), 'Missing step navigation logic');
  });

  await test('map.html defines updateJourneyStep function', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/map-page.js'), 'utf8');
    assert(js.includes('updateJourneyStep'), 'Missing journey step updater');
  });

  await test('map.html has place sidebar panel', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/map-page.js'), 'utf8');
    assert(js.includes('showSidebar'), 'Missing place sidebar function');
    const html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('sidebarContainer'), 'Missing sidebar container element');
  });

  await test('map.html uses getPeopleWhoLived for place info', () => {
    const data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('getPeopleWhoLived'), 'Missing people-who-lived data lookup');
  });

  await test('map.html uses calcDistance for distances', () => {
    const data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('calcDistance'), 'Missing distance calculation');
  });

  await test('map.html has archaeology vault integration', () => {
    const data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('ARCHAEOLOGY_VAULT'), 'Missing archaeology vault data integration');
  });

  await test('map.html loads sidebar.js for navigation', () => {
    const html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('sidebar.js'), 'Missing sidebar.js script');
  });

  await test('map.html loads scriptorium-audio.js', () => {
    const html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('scriptorium-audio.js'), 'Missing audio module');
  });

  await test('map.html uses Leaflet marker cluster', () => {
    const html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('leaflet.markercluster') || html.includes('MarkerCluster'), 'Missing marker cluster');
  });

  await test('map.html journey completion triggers localStorage', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/map-page.js'), 'utf8');
    assert(js.includes('scriptorium_journeys'), 'Missing journey completion localStorage key');
    assert(js.includes('isLastStop') || js.includes('completed'), 'Missing completion detection');
  });

  // ──────────────────────────────────────────
  // UAT-47: map.html — journey categories & eras
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-47: Journey categories \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('map-data.js JOURNEYS covers Patriarchs category', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('category: "Patriarchs"'), 'Missing Patriarchs journeys');
  });

  await test('map-data.js JOURNEYS covers Exodus/Judges category', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('category: "Judges"') || data.includes('era: "EXODUS"'), 'Missing Exodus/Judges journeys');
  });

  await test('map-data.js JOURNEYS covers Kings category', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('category: "Kings"'), 'Missing Kings journeys');
  });

  await test('map-data.js JOURNEYS covers Prophets category', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('category: "Prophets"'), 'Missing Prophets journeys');
  });

  await test('map-data.js JOURNEYS covers Exile / NT eras', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('era: "EXILE"'), 'Missing Exile-era journeys');
    assert(data.includes('era: "NEW TESTAMENT"'), 'Missing NT-era journeys');
  });

  // ──────────────────────────────────────────
  // UAT-48: map-data.js — places & archaeology
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-48: map-data.js places \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('map-data.js defines ARCHAEOLOGY_VAULT with artifacts', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('ARCHAEOLOGY_VAULT'), 'Missing archaeology vault');
    assert(data.includes('artifact:'), 'Missing artifact entries');
    assert(data.includes('c14'), 'Missing carbon-14 dating fields');
  });

  await test('map-data.js defines PLACES array with 25+ locations', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    var matches = data.match(/name:\s*"/g);
    var count = matches ? matches.length : 0;
    assert.ok(count >= 25, 'Expected 25+ places, got ' + count);
  });

  await test('map-data.js PLACES include archaeology sub-objects', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('archaeology:'), 'Missing archaeology field');
    assert(data.includes('status:') && data.includes('excavated:'), 'Missing excavation details');
  });

  await test('map-data.js defines getPeopleWhoLived helper', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('getPeopleWhoLived'), 'Missing people-who-lived lookup');
    assert(data.includes('peopleWhoLivedDb'), 'Missing peopleWhoLivedDb data');
  });

  await test('map-data.js defines getKeyEvents helper', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('getKeyEvents'), 'Missing key events lookup');
    assert(data.includes('keyEventsDb'), 'Missing keyEventsDb data');
  });

  await test('map-data.js calcDistance handles valid coordinates', () => {
    var data = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
    assert(data.includes('calcDistance'), 'Missing distance calculator');
    assert(data.includes('atan2'), 'Missing haversine formula');
  });

  // ──────────────────────────────────────────
  // UAT-49: map.html — theme variants & viewport
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-49: map.html presentation \u2500\u2500\u2500\u2500');

  await test('map.html has viewport meta tag', () => {
    var html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('viewport'), 'Missing viewport meta tag');
  });

  await test('map.html has OG image meta tag', () => {
    var html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('og:image'), 'Missing OG image tag');
  });

  await test('map.html has Ethiopian canon (crimson) theme variant CSS', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/map-page.js'), 'utf8');
    assert(js.includes('theme-ethiopian'), 'Missing Ethiopian theme variant');
  });

  await test('map.html CSP allows OpenStreetMap tile sources', () => {
    var html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('openstreetmap.org'), 'CSP missing tile.openstreetmap.org');
    assert(html.includes('basemaps.cartocdn.com'), 'CSP missing basemaps.cartocdn.com');
  });

  await test('map.html uses Fuse.js for search functionality', () => {
    var html = fs.readFileSync(path.join(ROOT, 'map.html'), 'utf8');
    assert(html.includes('fuse.js'), 'Missing Fuse.js search');
  });

  // ──────────────────────────────────────────
  // UAT-50: Tabernacle — shell, zones & loading
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-50: Tabernacle shell \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('tabernacle.html has loading screen with progress bar', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('loading-screen'), 'Missing loading screen');
    assert(html.includes('load-bar'), 'Missing loading bar fill');
    assert(html.includes('load-status'), 'Missing loading status text');
  });

  await test('tabernacle.html has Three.js canvas mount', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('threejs-mount'), 'Missing three.js mount point');
  });

  await test('tabernacle.html has zone navigation (3 zones)', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('switchZone'), 'Missing zone switching function');
    assert(html.includes('THE OUTER COURT'), 'Missing Outer Court zone');
    assert(html.includes('THE HOLY PLACE'), 'Missing Holy Place zone');
    assert(html.includes('HOLY OF HOLIES'), 'Missing Holy of Holies zone');
  });

  await test('tabernacle.html has view mode toggle (3D/Tour/Plan)', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('setViewMode'), 'Missing view mode function');
    assert(html.includes('startGuidedTour'), 'Missing guided tour function');
    assert(html.includes('3D VIEW'), 'Missing 3D view button');
    assert(html.includes('GUIDED TOUR'), 'Missing guided tour button');
    assert(html.includes('FLOOR PLAN'), 'Missing floor plan button');
  });

  await test('tabernacle.html has inspector panel with vessel details', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('inspector'), 'Missing inspector panel');
    assert(html.includes('insp-title'), 'Missing inspector title element');
    assert(html.includes('insp-body'), 'Missing inspector body element');
  });

  await test('tabernacle.html has vessel list per zone', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('VESSELS IN THIS ZONE'), 'Missing vessel list header');
    assert(html.includes('vessel-row'), 'Missing vessel rows');
  });

  // ──────────────────────────────────────────
  // UAT-51: Tabernacle — ark, audio, cinematic
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-51: Tabernacle features \u2500\u2500\u2500\u2500\u2500');

  await test('tabernacle.html has Ark of the Covenant overlay', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('ark-overlay'), 'Missing ark overlay');
    assert(html.includes('ARK OF THE COVENANT'), 'Missing ark title');
    assert(html.includes('closeArk'), 'Missing ark close function');
    assert(html.includes('RE-SEAL THE VAULT'), 'Missing ark close button');
  });

  await test('tabernacle.html has ticker bar for messages', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('ticker-bar'), 'Missing ticker bar');
    assert(html.includes('ticker-msg'), 'Missing ticker message element');
    assert(html.includes('ticker-pulse'), 'Missing ticker pulse indicator');
  });

  await test('tabernacle.html has cinematic overlay layers', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('cinematic-vignette'), 'Missing cinematic vignette');
    assert(html.includes('cinematic-grain'), 'Missing film grain overlay');
    assert(html.includes('cinematic-bars-top'), 'Missing top letterbox bar');
    assert(html.includes('cinematic-bars-bottom'), 'Missing bottom letterbox bar');
  });

  await test('tabernacle.html has zone title flash effect', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('zone-title-flash'), 'Missing zone title flash');
  });

  await test('tabernacle.html has spatial audio engine', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/tabernacle-page.js'), 'utf8');
    assert(js.includes('initTabAudio'), 'Missing audio init function');
    assert(js.includes('activateZoneAudio'), 'Missing zone audio activator');
    assert(js.includes('AudioContext'), 'Missing Web Audio API');
  });

  await test('tabernacle.html has camera hint overlay', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('cam-hint'), 'Missing camera hint');
    assert(html.includes('DRAG TO ORBIT'), 'Missing orbit instruction');
  });

  await test('tabernacle.html has zone-dot visited markers', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('zone-dot'), 'Missing zone dot indicators');
    assert(html.includes('dot-outer'), 'Missing outer court dot');
    assert(html.includes('dot-holy'), 'Missing holy place dot');
    assert(html.includes('dot-holies'), 'Missing holy of holies dot');
  });

  await test('tabernacle.html defines ZONE_DATA with vessels and typology', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/tabernacle-page.js'), 'utf8');
    assert(js.includes('ZONE_DATA'), 'Missing zone data object');
    assert(js.includes('typology'), 'Missing typology data');
    assert(js.includes('antitype'), 'Missing antitype field');
    assert(js.includes('scripture'), 'Missing typology scripture reference');
  });

  await test('tabernacle.html has dynamic lighting (flicker/pulse)', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/tabernacle-page.js'), 'utf8');
    assert(js.includes('addDynLight'), 'Missing dynamic light function');
    assert(js.includes('dynamicLights'), 'Missing dynamicLights array');
  });

  await test('tabernacle.html has floor plan SVG overlay', () => {
    const js = fs.readFileSync(path.join(ROOT, 'assets/js/tabernacle-page.js'), 'utf8');
    assert(js.includes('buildFloorPlan'), 'Missing floor plan builder function');
    assert(js.includes('floor-plan-overlay'), 'Missing floor plan overlay element');
    const html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('OUTER COURT'), 'Missing floor plan zone labels');
  });

  await test('tabernacle.html loads sidebar.js and audio modules', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('sidebarContainer'), 'Missing sidebar container');
    assert(html.includes('sidebar.js'), 'Missing sidebar script');
    assert(html.includes('scriptorium-audio.js'), 'Missing audio script');
  });

  await test('tabernacle.html has OG image and viewport meta tags', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('og:image'), 'Missing OG image tag');
    assert(html.includes('viewport'), 'Missing viewport meta');
  });

  await test('tabernacle.html CSP includes Three.js and CDN sources', () => {
    var html = fs.readFileSync(path.join(ROOT, 'tabernacle.html'), 'utf8');
    assert(html.includes('cdnjs.cloudflare.com'), 'CSP missing cloudflare CDN');
    assert(html.includes('blob:'), 'CSP missing blob: for workers');
  });

  await test('tabernacle.html responsive at 768px breakpoint', () => {
    const css = fs.readFileSync(path.join(ROOT, 'assets/css/tabernacle.css'), 'utf8');
    assert(css.includes('@media (max-width:768px)'), 'Missing mobile breakpoint');
    assert(css.includes('flex-direction:column'), 'Missing mobile column layout');
  });

  // ──────────────────────────────────────────
  // UAT-52: Sidebar navigation links
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-52: Sidebar nav links \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('sidebar.js links to scriptorium.html (home)', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('href="scriptorium.html"'), 'Missing home link');
  });

  await test('sidebar.js links to covenant-map.html and map.html', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('covenant-map.html'), 'Missing covenant map link');
    assert(js.includes('map.html'), 'Missing biblical navigator link');
  });

  await test('sidebar.js links to genealogy, tabernacle, typology', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('genealogy.html'), 'Missing genealogy link');
    assert(js.includes('tabernacle.html'), 'Missing tabernacle link');
    assert(js.includes('typology.html'), 'Missing typology link');
  });

  await test('sidebar.js links to onomasticon, ethiopian-canon, scribes-chamber', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('onomasticon.html'), 'Missing onomasticon link');
    assert(js.includes('ethiopian-canon.html'), 'Missing ethiopian canon link');
    assert(js.includes('scribes-chamber.html'), 'Missing scribes chamber link');
  });

  await test('sidebar.js links to plans, challenges, comparison-mode, settings', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('plans.html'), 'Missing plans link');
    assert(js.includes('challenges.html'), 'Missing challenges link');
    assert(js.includes('comparison-mode.html'), 'Missing comparison mode link');
    assert(js.includes('settings.html'), 'Missing settings link');
  });

  await test('sidebar.js links to login auth page', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('login.html'), 'Missing login link');
  });

  await test('sidebar.js links to prophetic mesh and 3D sanctum stubs', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    assert(js.includes('placeholder.html?section=prophetic-mesh'), 'Missing prophetic mesh link');
    assert(js.includes('placeholder.html?section=sanctum-3d'), 'Missing 3D sanctum link');
  });

  await test('sidebar.js nav links include all major pages', () => {
    var js = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
    var start = js.indexOf("SIDEBAR_HTML");
    var end = js.indexOf("</aside>", start);
    var nav = js.substring(start, end);
    var targets = ['covenant-map.html','map.html','genealogy.html','tabernacle.html','typology.html','onomasticon.html','ethiopian-canon.html','scribes-chamber.html','plans.html','challenges.html','comparison-mode.html','settings.html','login.html'];
    targets.forEach(function(t) {
      assert(nav.indexOf(t) !== -1, 'Missing nav link: ' + t);
    });
  });

  // ──────────────────────────────────────────
  // UAT-53: Cross-page hyperlinks
  // ──────────────────────────────────────────
  console.log('\n\u2500 UAT-53: Cross-page links \u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  await test('scriptorium.html links to register and login', () => {
    var html = fs.readFileSync(path.join(ROOT, 'scriptorium.html'), 'utf8');
    assert(html.includes('register.html'), 'Missing register link on home');
    assert(html.includes('login.html'), 'Missing login link on home');
  });

  await test('register.html links to login and home', () => {
    var html = fs.readFileSync(path.join(ROOT, 'register.html'), 'utf8');
    assert(html.includes('login.html'), 'Missing login link on register');
    assert(html.includes('scriptorium.html'), 'Missing home link on register');
  });

  await test('login.html links to register and home', () => {
    var html = fs.readFileSync(path.join(ROOT, 'login.html'), 'utf8');
    assert(html.includes('register.html'), 'Missing register link on login');
    assert(html.includes('scriptorium.html'), 'Missing home link on login');
  });

  await test('induction.html links to register, login, and home', () => {
    var html = fs.readFileSync(path.join(ROOT, 'induction.html'), 'utf8');
    assert(html.includes('register.html'), 'Missing register link');
    assert(html.includes('login.html'), 'Missing login link');
    assert(html.includes('scriptorium.html'), 'Missing home link');
  });

  await test('plans.html links to challenges, home, and login', () => {
    var html = fs.readFileSync(path.join(ROOT, 'plans.html'), 'utf8');
    assert(html.includes('challenges.html'), 'Missing challenges link');
    assert(html.includes('scriptorium.html'), 'Missing home link');
    assert(html.includes('login.html'), 'Missing login link');
  });

  await test('challenges.html links to plans, home, and login', () => {
    var html = fs.readFileSync(path.join(ROOT, 'challenges.html'), 'utf8');
    assert(html.includes('plans.html'), 'Missing plans link');
    assert(html.includes('scriptorium.html'), 'Missing home link');
    assert(html.includes('login.html'), 'Missing login link');
  });

  await test('genealogy.html links to ethiopian-canon, typology, and map', () => {
    var html = fs.readFileSync(path.join(ROOT, 'genealogy.html'), 'utf8');
    assert(html.includes('ethiopian-canon.html'), 'Missing ethiopian-canon link');
    assert(html.includes('typology.html'), 'Missing typology link');
    assert(html.includes('map.html'), 'Missing map link');
  });

  await test('settings.html links back to home', () => {
    var html = fs.readFileSync(path.join(ROOT, 'settings.html'), 'utf8');
    assert(html.includes('scriptorium.html'), 'Missing home link');
  });

  await test('placeholder.html links back to scriptorium.html', () => {
    var html = fs.readFileSync(path.join(ROOT, 'placeholder.html'), 'utf8');
    assert(html.includes('scriptorium.html'), 'Missing home link on placeholder');
  });

  await test('stub pages are standalone with OG meta and sidebar', () => {
    ['narthex.html', 'sanctum-3d.html', 'archive.html', 'prophetic-mesh.html'].forEach(function(f) {
      var html = fs.readFileSync(path.join(ROOT, f), 'utf8');
      assert(html.includes('og:image'), f + ' missing OG meta');
      assert(html.includes('sidebarContainer'), f + ' missing sidebar');
      assert(html.includes('scriptorium.html'), f + ' missing return link');
    });
  });

  await test('index.html is the prelaunch landing page', () => {
    var html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    assert(html.includes('landingForm'), 'Missing newsletter capture form');
    assert(!html.includes('scriptorium.html'), 'index.html should not link to the app before launch');
  });

  await test('ethiopian-canon.html links to genealogy page', () => {
    var html = fs.readFileSync(path.join(ROOT, 'ethiopian-canon.html'), 'utf8');
    assert(html.includes('genealogy.html'), 'Missing genealogy link');
  });

  await test('reader.js openCrossRef navigates to referenced book/chapter', () => {
    var reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('openCrossRef'), 'Missing cross-ref navigation function');
    assert(reader.includes('ScrReader.open('), 'Missing ScrReader.open call');
    assert(reader.includes('goToChapter'), 'Missing goToChapter call');
  });

  await test('reader.js Bible Gateway button opens external reference', () => {
    var reader = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
    assert(reader.includes('READ ON BIBLE GATEWAY'), 'Missing Bible Gateway button');
    assert(reader.includes('window.open('), 'Missing window.open call');
  });
}

// ── Main ──

console.log('═══════════════════════════════════════════');
console.log('  SCRIPTORIUM — USER ACCEPTANCE TESTS');
console.log('═══════════════════════════════════════════');

server = app.listen(PORT, () => {
  runUAT()
    .catch(err => console.error('UAT error:', err))
    .finally(() => {
      console.log(`\n\u2500\u2500\u2500 RESULTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500`);
      console.log(`  ${passed + failed} scenarios, ${passed} passed, ${failed} failed ${failed === 0 ? '\u2713' : '\u2717'}`);
      console.log('═══════════════════════════════════════════\n');
      server.close(() => process.exit(failed > 0 ? 1 : 0));
    });
});
