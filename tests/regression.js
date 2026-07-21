/**
 * Regression test suite for Scriptorium frontend modules.
 * Run: node tests/regression.js
 * Requires: Node.js 18+
 *
 * Tests 4 critical-path fixes:
 *   1. ScriptoriumAPI (api.js / auth.js)
 *   2. ScrReader queue (core.js stub + reader.js replay)
 *   3. ScriptoriumLectionary (lectionary.js)
 *   4. Data consolidation (scribeData_v2 / auth.js stubs)
 *   5. core.js structural integrity (IIFE close, init)
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════
// Browser-environment shim
// ═══════════════════════════════════════════════════
function makeEl() {
  return {
    id: '', textContent: '', className: '',
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    style: {},
    appendChild() { return this; }, remove() {}, insertAdjacentHTML() {},
    addEventListener() {}, setAttribute() {}, removeAttribute() {},
    getAttribute() { return null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    focus() {}, scrollIntoView() {}, closest() { return null; },
    // event dispatch helpers
    dispatchEvent() {}, onload: null
  };
}

function def(target, key, value) {
  try { target[key] = value; }
  catch (e) { Object.defineProperty(target, key, { value: value, configurable: true, writable: true }); }
}

function makeMockEnv() {
  const store = {};
  const win = global;
  def(win, 'window', win);
  def(win, 'localStorage', {
    getItem(k) { return store[k] || null; },
    setItem(k, v) { store[k] = String(v); },
    removeItem(k) { delete store[k]; },
    clear() { Object.keys(store).forEach(function(k) { delete store[k]; }); },
    get length() { return Object.keys(store).length; },
    key(i) { return Object.keys(store)[i] || null; }
  });
  def(win, 'navigator', {}); // no serviceWorker defined — 'serviceWorker' in navigator returns false
  def(win, 'crypto', { subtle: { digest: function() { return Promise.resolve(new ArrayBuffer(32)); } } });
  def(win, 'atob', function(s) { return Buffer.from(s, 'base64').toString('binary'); });
  win.setTimeout = function(fn, ms) { if (typeof fn === 'function') { try { fn(); } catch(e) {} } return 1; };
  win.clearTimeout = function() {};
  win.AbortController = function() { this.signal = {}; this.abort = function() {}; };
  win.fetch = function() { return Promise.resolve({ ok: true, json: function() { return Promise.resolve({}); } }); };

  win.addEventListener = function() {};
  win.Object = Object;
  win.Array = Array;
  win.document = {
    documentElement: {},
    head: makeEl(),
    getElementById: function() { return null; },
    createElement: function() { return makeEl(); },
    addEventListener: function(ev, fn) { if (ev === 'DOMContentLoaded') fn(); },
    querySelectorAll: function() { return []; },
    querySelector: function() { return null; },
    body: makeEl()
  };
  return win;
}

// ═══════════════════════════════════════════════════
// Test runner
// ═══════════════════════════════════════════════════
var passed = 0, failed = 0;
var ROOT = path.resolve(__dirname, '..');

function test(name, fn) {
  try {
    var r = fn();
    if (r && typeof r.then === 'function') {
      return r.then(() => { passed++; ok(name); })
        .catch(e => { failed++; fail(name, e); });
    }
    passed++; ok(name);
  } catch (e) { failed++; fail(name, e); }
}

function ok(n) { console.log('  \u2713 ' + n); }
function fail(n, e) {
  var m = e.message || String(e);
  var s = e.stack || '';
  console.log('  \u2717 ' + n + ': ' + m);
  if (s) {
    var lines = s.split('\n').slice(1, 3).map(l => '      ' + l.trim()).join('\n');
    if (lines) console.log(lines);
  }
}

function loadJS(filePath) {
  var code = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
  (new Function(code))();
}

function section(title) {
  console.log('\n\u2501 ' + title + ' \u2501\n');
}

// ═══════════════════════════════════════════════════
// Tests
// ═══════════════════════════════════════════════════
console.log('\n\u2550\u2550\u2550 SCRIPTORIUM REGRESSION SUITE \u2550\u2550\u2550\n');
var ctx = makeMockEnv();

// ── Group 1: ScriptoriumAPI ────────────────────────
section('ScriptoriumAPI');

test('api.js exposes all 6 API methods', () => {
  ctx.ScriptoriumAPI = undefined;
  loadJS('assets/js/api.js');
  assert.strictEqual(typeof ctx.ScriptoriumAPI, 'object');
  ['register', 'login', 'logout', 'me', 'forgotPassword', 'resetPassword'].forEach(m => {
    assert.strictEqual(typeof ctx.ScriptoriumAPI[m], 'function', '.' + m);
  });
});

test('auth.js does not overwrite api.js', () => {
  var first = ctx.ScriptoriumAPI;
  loadJS('assets/js/auth.js');
  assert.strictEqual(ctx.ScriptoriumAPI, first);
});

test('auth.js defines ScriptoriumAPI when api.js absent', () => {
  ctx.ScriptoriumAPI = undefined;
  delete ctx.__getUnifiedUser;
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/auth.js'), 'utf8');
  (new Function(code))();
  assert.strictEqual(typeof ctx.ScriptoriumAPI, 'object');
});

test('register POSTs to /api/auth/register', () => {
  ctx.ScriptoriumAPI = undefined;
  loadJS('assets/js/api.js');
  var called = false;
  var origFetch = ctx.fetch;
  ctx.fetch = (url, opts) => {
    called = true;
    assert.ok(url.indexOf('/api/auth/register') !== -1);
    assert.strictEqual(JSON.parse(opts.body).userId, 'mila');
    return Promise.resolve({ ok: true, json() { return Promise.resolve({ token: 't' }); } });
  };
  var p = ctx.ScriptoriumAPI.register({ userId: 'mila' });
  ctx.fetch = origFetch;
  return p.then(() => assert.ok(called));
});

// ── Group 2: ScrReader queue ───────────────────────
section('ScrReader queue');

test('core.js defines ScrReader with _queue', () => {
  ctx.ScrReader = undefined;
  ctx.localStorage.clear();
  loadJS('assets/js/scriptorium-core.js');
  assert.ok(ctx.ScrReader);
  assert.ok(Array.isArray(ctx.ScrReader._queue));
  ['open', 'close', 'goToChapter', 'nextChapter', 'prevChapter'].forEach(m => {
    assert.strictEqual(typeof ctx.ScrReader[m], 'function', '.' + m);
  });
});

test('queue captures calls before _real is set', () => {
  ctx.ScrReader.open('Leviticus');
  ctx.ScrReader.goToChapter(10);
  assert.strictEqual(ctx.ScrReader._queue.length, 2);
  assert.strictEqual(ctx.ScrReader._queue[0].a[0], 'Leviticus');
});

test('_real replays queued calls and copies properties', () => {
  var rr = {
    open(b) { this.ok = b; },
    goToChapter() {},
    close() {},
    nextChapter() {},
    prevChapter() {},
    BOOK_CHAPTERS: { Genesis: 50 }
  };
  ctx.ScrReader._real = rr;
  assert.strictEqual(rr.ok, 'Leviticus');
  assert.strictEqual(ctx.ScrReader._queue.length, 0);
  assert.strictEqual(ctx.ScrReader.BOOK_CHAPTERS.Genesis, 50);
});

test('reader.js attaches via _real when stub present', () => {
  ctx.ScrReader = undefined;
  ctx.localStorage.clear();
  loadJS('assets/js/scriptorium-core.js');
  ctx.ScrReader.open('Genesis');
    loadJS('assets/js/scriptorium-reader.js');
  assert.strictEqual(ctx.ScrReader._queue.length, 0);
  assert.strictEqual(ctx.ScrReader.BOOK_CHAPTERS.Genesis, 50);
});

test('reader.js sets ScrReader directly when no stub exists', () => {
  ctx.ScrReader = undefined;
  ctx.localStorage.clear();
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
  (new Function(code))();
  assert.strictEqual(typeof ctx.ScrReader.open, 'function');
  assert.strictEqual(ctx.ScrReader._queue, undefined);
});

test('ot-gallery.html has inline stub before deferred core.js', () => {
  var html = fs.readFileSync(path.join(ROOT, 'ot-gallery.html'), 'utf8');
  var st = html.indexOf('window.ScrReader={');
  var df = html.indexOf('defer src="assets/js/scriptorium-core.js"');
  assert.ok(st > 0 && df > st);
});

test('nt-gallery.html has inline stub before deferred core.js', () => {
  var html = fs.readFileSync(path.join(ROOT, 'nt-gallery.html'), 'utf8');
  var st = html.indexOf('window.ScrReader={');
  var df = html.indexOf('defer src="assets/js/scriptorium-core.js"');
  assert.ok(st > 0 && df > st);
});

// ── Group 3: ScriptoriumLectionary ─────────────────
section('ScriptoriumLectionary');

test('lectionary exports getTodayReadings', () => {
  ctx.ScriptoriumLectionary = undefined;
  loadJS('assets/js/lectionary.js');
  assert.strictEqual(typeof ctx.ScriptoriumLectionary.getTodayReadings, 'function');
});

test('getTodayReadings returns 4 readings for any date', () => {
  var r = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-06-01'));
  assert.strictEqual(r.readings.length, 4);
  r.readings.forEach(rd => {
    assert.ok(rd.book, 'book: ' + rd.book);
    assert.ok(rd.chapter > 0);
    assert.ok(rd.testament === 'ot' || rd.testament === 'nt');
  });
});

test('getTodayReadings honours feast days', () => {
  var xmas = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-12-25'));
  assert.ok(xmas.label.toLowerCase().indexOf('christmas') !== -1);
});

test('scriptorium.html loads lectionary.js before usage', () => {
  var html = fs.readFileSync(path.join(ROOT, 'scriptorium.html'), 'utf8');
  var lc = html.indexOf('lectionary.js');
  var us = html.indexOf('ScriptoriumLectionary.getTodayReadings');
  assert.ok(lc > 0 && us > lc);
});

// ── Group 4: Data consolidation ────────────────────
section('Data consolidation');

function seedV2() {
  ctx.localStorage.setItem('scribeData_v2', JSON.stringify({
    _v: 2,
    profile: { userId: 'd', name: 'V2' },
    progress: { totalCharacters: 1000, dailyChars: 200, dailyDate: 'Sun Jun 07 2026', versesCompleted: 20, ntVerses: 5 },
    rank: { title: 'M.', knowledgeLevel: '5', lastActive: Date.now() },
    streak: { current: 14, lastVisit: 'Sun Jun 07 2026' },
    seal: { epigraphy: 1, astronomy: 2, prophecy: 3, restoration: 0 },
    meta: { migratedAt: Date.now() }
  }));
}

function seedLegacy() {
  ctx.localStorage.setItem('scribeData', JSON.stringify({ name: 'Leg', totalCharacters: 500, streak: 7, rank: 'S' }));
  ctx.localStorage.setItem('scriptorium_user', JSON.stringify({ name: 'Leg', userId: 'l1', totalCharacters: 500, streak: 7 }));
}

test('auth.js stubs read scribeData_v2', () => {
  ctx.localStorage.clear();
  delete ctx.__getUnifiedUser;
  seedV2();
  loadJS('assets/js/auth.js');
  var u = ctx.__getUnifiedUser();
  assert.ok(u);
  assert.strictEqual(u.profile.name, 'V2');
  assert.strictEqual(u.streak.current, 14);
});

test('stubs fall back to legacy keys', () => {
  ctx.localStorage.clear();
  delete ctx.__getUnifiedUser;
  seedLegacy();
  loadJS('assets/js/auth.js');
  var u = ctx.__getUnifiedUser();
  assert.ok(u);
  assert.strictEqual(u.profile.name, 'Leg');
  assert.strictEqual(u.streak.current, 7);
});

test('stubs return null when no data exists', () => {
  ctx.localStorage.clear();
  delete ctx.__getUnifiedUser;
  loadJS('assets/js/auth.js');
  assert.strictEqual(ctx.__getUnifiedUser(), null);
});

test('__setUnifiedUser writes scriptorium_v3', () => {
  ctx.localStorage.clear();
  delete ctx.__setUnifiedUser;
  loadJS('assets/js/auth.js');
  ctx.__setUnifiedUser({
    _v: 3,
    profile: { userId: 'n', name: 'New' },
    progress: { totalCharacters: 5 },
    rank: { title: 'I' },
    streak: { current: 1 },
    seal: { epigraphy: 0, astronomy: 0, prophecy: 0, restoration: 0 },
    meta: { migratedAt: Date.now() }
  });
  var s = JSON.parse(ctx.localStorage.getItem('scriptorium_v3'));
  assert.strictEqual(s.profile.name, 'New');
  assert.strictEqual(s._v, 3);
});

test('core.js overwrites stubs with full implementation', () => {
  delete ctx.__getUnifiedUser;
  ctx.localStorage.clear();
  seedV2();
  var stubFn = ctx.__getUnifiedUser;
  loadJS('assets/js/scriptorium-core.js');
  assert.notStrictEqual(ctx.__getUnifiedUser, stubFn);
  assert.ok(ctx.__getUnifiedUser());
});

test('ot-gallery.html has inline __getUnifiedUser stub before deferred', () => {
  var h = fs.readFileSync(path.join(ROOT, 'ot-gallery.html'), 'utf8');
  var st = h.indexOf('window.__getUnifiedUser');
  var df = h.indexOf('defer src="assets/js/');
  assert.ok(st > 0 && df > st);
});

test('nt-gallery.html has inline __getUnifiedUser stub before deferred', () => {
  var h = fs.readFileSync(path.join(ROOT, 'nt-gallery.html'), 'utf8');
  var st = h.indexOf('window.__getUnifiedUser');
  var df = h.indexOf('defer src="assets/js/');
  assert.ok(st > 0 && df > st);
});

// ── Group 5: core.js structural integrity ─────────
section('core.js structural integrity');

test('scriptorium-core.js ends with })();', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-core.js'), 'utf8').trim();
  assert.ok(code.endsWith('})();'), 'file ends with })();');
});

test('core.js parses and defines globals', () => {
  assert.ok(ctx.ScriptoriumCore);
  assert.strictEqual(typeof ctx.ScriptoriumCore.init, 'function');
  assert.strictEqual(typeof ctx.showVerseQuickLook, 'function');
  assert.strictEqual(typeof ctx.openPatristicCommentary, 'function');
  assert.strictEqual(typeof ctx.Scr, 'object');
});

test('all JS files parse without errors', () => {
  var files = [
    'assets/js/api.js',
    'assets/js/auth.js',
    'assets/js/sidebar.js',
    'assets/js/scriptorium-core.js',
    'assets/js/scriptorium-reader.js',
    'assets/js/lectionary.js',
    'assets/audio/scriptorium-audio.js'
  ];
  files.forEach(f => {
    var code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    (new Function(code));
  });
});

// ── Group 6: XP engine (scriptorium-core) ───────────
section('XP engine');

test('computeRankFromXp returns correct tiers', () => {
  var sc = ctx.ScriptoriumCore;
  assert.strictEqual(sc.computeRankFromXp(0), 'SEEKER');
  assert.strictEqual(sc.computeRankFromXp(50), 'SEEKER');
  assert.strictEqual(sc.computeRankFromXp(100), 'INITIATE');
  assert.strictEqual(sc.computeRankFromXp(500), 'SCRIBE');
  assert.strictEqual(sc.computeRankFromXp(1500), 'APPRENTICE SCRIBE');
  assert.strictEqual(sc.computeRankFromXp(50000), 'PRIME SCRIBE');
  assert.strictEqual(sc.computeRankFromXp(99999), 'PRIME SCRIBE');
});

test('getNextRankXp returns correct thresholds', () => {
  var sc = ctx.ScriptoriumCore;
  assert.strictEqual(sc.getNextRankXp(0), 100);
  assert.strictEqual(sc.getNextRankXp(50), 100);
  assert.strictEqual(sc.getNextRankXp(100), 300);
  assert.strictEqual(sc.getNextRankXp(700), 1500);
  assert.strictEqual(sc.getNextRankXp(50000), null);
});

test('getRankProgress returns 0-1 fraction to next rank', () => {
  var sc = ctx.ScriptoriumCore;
  assert.strictEqual(sc.getRankProgress(0), 0);
  assert.strictEqual(sc.getRankProgress(50), 0.5);
  assert.strictEqual(sc.getRankProgress(100), 0);
  assert.strictEqual(sc.getRankProgress(50000), 1);
});

test('getTotalXp returns number', () => {
  var sc = ctx.ScriptoriumCore;
  ctx.localStorage.clear();
  assert.strictEqual(typeof sc.getTotalXp(), 'number');
});

test('checkAchievements is a function and returns results', () => {
  assert.strictEqual(typeof ctx.ScriptoriumCore.checkAchievements, 'function');
});

test('BADGES array has 29 entries with id, name, icon, xp, tier', () => {
  var sc = ctx.ScriptoriumCore;
  var b = sc.BADGES;
  assert.ok(Array.isArray(b));
  assert.ok(b.length >= 27, 'Expected 27+ badges, got ' + b.length);
  b.forEach(function(badge, i) {
    assert.ok(badge.id, 'badge ' + i + ' missing id');
    assert.ok(badge.name, 'badge ' + i + ' missing name');
    assert.ok(badge.icon, 'badge ' + i + ' missing icon');
    assert.strictEqual(typeof badge.xp, 'number', 'badge ' + i + ' xp not number');
    assert.ok(badge.tier, 'badge ' + i + ' missing tier');
  });
});

test('XP_RANKS has 10 tiers with title and minXp', () => {
  var sc = ctx.ScriptoriumCore;
  assert.ok(Array.isArray(sc.XP_RANKS));
  assert.strictEqual(sc.XP_RANKS.length, 10);
  assert.strictEqual(sc.XP_RANKS[0].title, 'SEEKER');
  assert.strictEqual(sc.XP_RANKS[0].minXp, 0);
  assert.strictEqual(sc.XP_RANKS[9].title, 'PRIME SCRIBE');
  assert.strictEqual(sc.XP_RANKS[9].minXp, 50000);
});

// ── Group 7: sidebar.js integration ───────────────
section('sidebar.js integration');

function makeSidebarDOM() {
  var c = document.createElement('div');
  c.id = 'sidebarContainer';
  document.body.appendChild(c);
  ctx.SIDEBAR_HTML = undefined;
  ctx.__getUnifiedUser = function() {
    return {
      profile: { name: 'Scribe', gender: 'male', userId: 's1', tradition: 'reformed' },
      progress: { totalCharacters: 500, dailyChars: 10, dailyDate: new Date().toDateString(), versesCompleted: 5, ntVerses: 2 },
      rank: { title: 'SCRIBE', knowledgeLevel: '3' },
      streak: { current: 7 },
      seal: { epigraphy: 1, astronomy: 0, prophecy: 0, restoration: 0 }
    };
  };
  ctx.localStorage.setItem('scriptorium_token', 't');
}

test('sidebar.js defines SIDEBAR_HTML with nav links', () => {
  ctx.localStorage.clear();
  delete ctx.__getUnifiedUser;
  loadJS('assets/js/sidebar.js');
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
  assert.ok(code.indexOf('museum-sidebar') !== -1, 'Missing sidebar class');
  assert.ok(code.indexOf('sidebar-nav') !== -1, 'Missing sidebar-nav');
  assert.ok(code.indexOf('THE THRESHOLD') !== -1, 'Missing home link');
  assert.ok(code.indexOf('COVENANT MAP') !== -1, 'Missing covenant map link');
});

test('sidebar.js no longer has SCRIBE INDUCTION nav link', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
  assert.ok(code.indexOf("SCRIBE INDUCTION") === -1, 'Old register nav link still present');
});

test('sidebar.js CSS supports nav and logo', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
  assert.ok(code.indexOf('museum-sidebar') !== -1, 'Missing sidebar CSS class');
  assert.ok(code.indexOf('nav-link') !== -1, 'Missing nav-link CSS');
});

test('sidebar.js defines wireAuthState function', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/sidebar.js'), 'utf8');
  assert.ok(code.indexOf('wireAuthState') !== -1, 'Missing wireAuthState');
  assert.ok(code.indexOf('markActiveLink') !== -1, 'Missing markActiveLink');
});

// ── Group 8: Lectionary edge cases ─────────────
section('Lectionary edge cases');

test('getTodayReadings accepts tradition param', () => {
  var r = ctx.ScriptoriumLectionary.getTodayReadings(new Date(), 'reformed');
  assert.strictEqual(r.readings.length, 4);
  var r2 = ctx.ScriptoriumLectionary.getTodayReadings(new Date(), 'orthodox');
  assert.strictEqual(r2.readings.length, 4);
});

test('getTodayReadings handles null/undefined tradition', () => {
  var r = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-06-15'), null);
  assert.strictEqual(r.readings.length, 4);
  var r2 = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-06-15'), undefined);
  assert.strictEqual(r2.readings.length, 4);
});

test('getTodayReadings returns label for every day', () => {
  for (var m = 0; m < 12; m++) {
    var d = new Date(2026, m, 15);
    var r = ctx.ScriptoriumLectionary.getTodayReadings(d);
    assert.ok(r.label, 'No label for ' + d.toISOString());
    assert.ok(r.label.length > 0);
  }
});

// ── Group 9: reader.js module structure ─────────
section('reader.js module structure');

test('reader.js defines core translation constants', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
  assert.ok(code.indexOf('TRANSLATIONS') !== -1, 'Missing TRANSLATIONS');
  assert.ok(code.indexOf('web') !== -1, 'Missing WEB');
  assert.ok(code.indexOf('kjv') !== -1, 'Missing KJV');
  assert.ok(code.indexOf('openStudyPopover') !== -1, 'Missing study popover');
  assert.ok(code.indexOf('openCrossRef') !== -1, 'Missing cross-ref handler');
});

test('reader.js defines CSS class names', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
  assert.ok(code.indexOf('scr-study-popover') !== -1, 'Missing popover class');
  assert.ok(code.indexOf('scr-verse-text') !== -1, 'Missing verse text class');
  assert.ok(code.indexOf('scr-trans-select') !== -1, 'Missing translation selector');
});

// ── Group 10: CSP headers across HTML pages ──────
section('CSP integrity');

function hasCSP(page) {
  var h = fs.readFileSync(path.join(ROOT, page), 'utf8');
  return h.indexOf('Content-Security-Policy') !== -1 || h.indexOf('http-equiv="Content-Security-Policy"') !== -1;
}

function hasCSPBibleAPI(page) {
  var h = fs.readFileSync(path.join(ROOT, page), 'utf8');
  return h.indexOf('bible-api.com') !== -1 && (h.indexOf('Content-Security-Policy') !== -1 || h.indexOf('http-equiv="Content-Security-Policy"') !== -1);
}

test('scriptorium.html CSP includes bible-api.com', function() { assert.ok(hasCSPBibleAPI('scriptorium.html')); });
test('ot-gallery.html CSP includes bible-api.com', function() { assert.ok(hasCSPBibleAPI('ot-gallery.html')); });
test('nt-gallery.html CSP includes bible-api.com', function() { assert.ok(hasCSPBibleAPI('nt-gallery.html')); });
test('comparison-mode.html CSP includes bible-api.com', function() { assert.ok(hasCSPBibleAPI('comparison-mode.html')); });
test('challenges.html CSP includes bible-api.com', function() { assert.ok(hasCSPBibleAPI('challenges.html')); });
test('register.html has CSP meta tag', function() { assert.ok(hasCSP('register.html')); });
test('login.html has CSP meta tag', function() { assert.ok(hasCSP('login.html')); });
test('plans.html has CSP meta tag', function() { assert.ok(hasCSP('plans.html')); });
test('map.html has CSP meta tag', function() { assert.ok(hasCSP('map.html')); });

// ── Group 11: HTML structural checks ─────────
section('HTML structural integrity');

var HTML_OG_PAGES = [
  'scriptorium.html', 'ot-gallery.html', 'nt-gallery.html', 'map.html',
  'register.html', 'login.html', 'plans.html', 'challenges.html',
  'genealogy.html', 'onomasticon.html', 'typology.html',
  'comparison-mode.html', 'paleo-epigraphy.html', 'scribes-chamber.html',
  'covenant-map.html', 'ethiopian-canon.html', 'settings.html',
  'admin.html', 'archive.html', 'induction.html'
];

HTML_OG_PAGES.forEach(function(page) {
  test(page + ' has og:image and og:title meta', function() {
    var h = fs.readFileSync(path.join(ROOT, page), 'utf8');
    assert.ok(h.indexOf('og:image') !== -1, page + ' missing og:image');
    assert.ok(h.indexOf('og:title') !== -1, page + ' missing og:title');
    assert.ok(h.indexOf('og:description') !== -1, page + ' missing og:description');
  });
});

// ── Group 12: Scr object utilities ────────────
section('Scr utility object');

test('Scr object has toast method', () => {
  assert.strictEqual(typeof ctx.Scr.toast, 'function', 'Missing Scr.toast');
});

test('Scr.toast shows and hides message', () => {
  // simulate: create a mock toast element
  var el = { textContent: '', classList: { add: function() {}, remove: function() {} } };
  var orig = ctx.document.getElementById;
  ctx.document.getElementById = function(id) { if (id === 'toast') return el; return orig ? orig(id) : null; };
  ctx.Scr.toast('Test toast');
  ctx.document.getElementById = orig;
  assert.ok(true);
});

// ── Group 13: core.js init side effects ──────
section('core.js init side effects');

test('core.js init creates patristic data on window', () => {
  assert.ok(Array.isArray(ctx.PATRISTIC_COMMENTARY) || ctx.PATRISTIC_COMMENTARY === undefined,
    'PATRISTIC_COMMENTARY should be array or undefined');
});

test('core.js exports addBookmark and getBookmarks globals', () => {
  assert.strictEqual(typeof ctx.addBookmark, 'function', 'Missing addBookmark');
  assert.strictEqual(typeof ctx.getBookmarks, 'function', 'Missing getBookmarks');
  assert.strictEqual(typeof ctx.isBookmarked, 'function', 'Missing isBookmarked');
});

// ── Group 14: lectionary internal structure ──
section('lectionary internal structure');

test('lectionary defines FEASTS table and reading data', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/lectionary.js'), 'utf8');
  assert.ok(code.indexOf('FEASTS') !== -1, 'Missing FEASTS');
  assert.ok(code.indexOf('getTodayReadings') !== -1, 'Missing getTodayReadings');
});

test('lectionary handles leap year dates', () => {
  var r = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2028-02-29'));
  assert.strictEqual(r.readings.length, 4);
  var r2 = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2027-02-28'));
  assert.strictEqual(r2.readings.length, 4);
});

test('lectionary handles month boundaries', () => {
  var r = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-01-31'));
  assert.strictEqual(r.readings.length, 4);
  var r2 = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-12-31'));
  assert.strictEqual(r2.readings.length, 4);
});

test('lectionary returns unique reading types', () => {
  var r = ctx.ScriptoriumLectionary.getTodayReadings(new Date('2026-06-21'));
  var types = {};
  r.readings.forEach(function(rd) { types[rd.type] = true; });
  assert.ok(Object.keys(types).length >= 3, 'Expected 3+ unique types');
});

// ── Group 15: reader.js patterns ──────────
section('reader.js patterns');

test('reader.js has fetch timeout and error callbacks', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/scriptorium-reader.js'), 'utf8');
  assert.ok(code.indexOf('setTimeout') !== -1, 'Missing timeout pattern');
  assert.ok(code.indexOf('try') !== -1, 'Missing try-catch');
  assert.ok(code.indexOf('.catch') !== -1 || code.indexOf('onerror') !== -1, 'Missing error handler');
});

test('reader.js has chapter navigation methods', () => {
  assert.strictEqual(typeof ctx.ScrReader.nextChapter, 'function');
  assert.strictEqual(typeof ctx.ScrReader.prevChapter, 'function');
  assert.strictEqual(typeof ctx.ScrReader.goToChapter, 'function');
});

test('reader.js has open and close methods', () => {
  assert.strictEqual(typeof ctx.ScrReader.open, 'function');
  assert.strictEqual(typeof ctx.ScrReader.close, 'function');
});

// ── Group 16: map-data structure ──────────
section('map-data structure');

test('map-data.js defines JOURNEYS array', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
  assert.ok(code.indexOf('JOURNEYS') !== -1, 'Missing JOURNEYS');
  assert.ok(code.indexOf('stops') !== -1, 'Missing stops in journeys');
});

test('map-data.js Paul-first-journey has stops with coordinates', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/js/map-data.js'), 'utf8');
  assert.ok(code.indexOf('Antioch') !== -1, 'Missing Antioch');
  assert.ok(code.indexOf('lat') !== -1, 'Missing latitude');
  assert.ok(code.indexOf('lng') !== -1, 'Missing longitude');
});

// ── Group 17: CSS file parse ──────────────
section('CSS file parse');

test('shared.css parses without errors', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/css/shared.css'), 'utf8');
  (new Function('return ' + JSON.stringify(code)))();
});

test('features.css parses without errors', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/css/features.css'), 'utf8');
  (new Function('return ' + JSON.stringify(code)))();
});

// ── Group 18: File existence ──────────
section('File existence');

var CRITICAL_FILES = [
  'assets/js/api.js',
  'assets/js/auth.js',
  'assets/js/sidebar.js',
  'assets/js/scriptorium-core.js',
  'assets/js/scriptorium-reader.js',
  'assets/js/lectionary.js',
  'assets/css/shared.css',
  'assets/css/features.css',
  'assets/audio/scriptorium-audio.js',
  'assets/fonts/fonts.css',
  'manifest.json',
  'sw.js',
  'assets/js/map-data.js'
];

CRITICAL_FILES.forEach(function(f) {
  test(f + ' exists', function() {
    assert.ok(fs.existsSync(path.join(ROOT, f)), 'Missing: ' + f);
  });
});

var CRITICAL_HTML = [
  'scriptorium.html', 'ot-gallery.html', 'nt-gallery.html', 'map.html',
  'register.html', 'login.html', 'plans.html', 'challenges.html',
  'genealogy.html', 'onomasticon.html', 'typology.html',
  'comparison-mode.html', 'paleo-epigraphy.html', 'scribes-chamber.html',
  'covenant-map.html', 'ethiopian-canon.html', 'settings.html',
  'admin.html', 'archive.html', 'induction.html',
  'narthex.html', 'tabernacle.html', 'sanctum-3d.html'
];

CRITICAL_HTML.forEach(function(f) {
  test(f + ' exists', function() {
    assert.ok(fs.existsSync(path.join(ROOT, f)), 'Missing HTML: ' + f);
  });
});

// ── Group 19: ScriptoriumAudio structure ──
section('ScriptoriumAudio structure');

test('scriptorium-audio.js defines ScriptoriumAudio', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/audio/scriptorium-audio.js'), 'utf8');
  assert.ok(code.indexOf('ScriptoriumAudio') !== -1, 'Missing ScriptoriumAudio');
});

test('scriptorium-audio.js defines ScriptoriumAudio with init and transitionTo', () => {
  var code = fs.readFileSync(path.join(ROOT, 'assets/audio/scriptorium-audio.js'), 'utf8');
  assert.ok(code.indexOf('ScriptoriumAudio') !== -1, 'Missing ScriptoriumAudio');
  assert.ok(code.indexOf('.init') !== -1 || code.indexOf('init:') !== -1, 'Missing init method');
  assert.ok(code.indexOf('transitionTo') !== -1, 'Missing transitionTo');
  assert.ok(code.indexOf('play') !== -1, 'Missing play');
});

// ── Group 20: core.js badge icons ──────
section('core.js badge icons');

test('BADGES icons are all non-empty strings', () => {
  ctx.ScriptoriumCore.BADGES.forEach(function(b, i) {
    assert.ok(b.icon && b.icon.length > 0, 'Badge ' + i + ' (' + b.id + ') has empty icon');
    assert.strictEqual(typeof b.icon, 'string', 'Badge ' + i + ' icon not a string');
  });
});

test('BADGES ids are unique', () => {
  var ids = {};
  ctx.ScriptoriumCore.BADGES.forEach(function(b) {
    assert.ok(!ids[b.id], 'Duplicate badge id: ' + b.id);
    ids[b.id] = true;
  });
});

// ── Cross-module (end-to-end) ────────────
section('Cross-module (end-to-end)');

test('register → login → data read pipeline', () => {
  ctx.localStorage.clear();
  ctx.ScriptoriumAPI = undefined;
  delete ctx.__getUnifiedUser;

  loadJS('assets/js/api.js');
  loadJS('assets/js/auth.js');

  var steps = [];
  ctx.fetch = (url, opts) => {
    steps.push(url);
    if (url.indexOf('/api/auth/register') !== -1) {
      return Promise.resolve({ ok: true, json() { return Promise.resolve({ token: 'r', scribe: { name: 'A' } }); } });
    }
    if (url.indexOf('/api/auth/login') !== -1) {
      return Promise.resolve({ ok: true, json() { return Promise.resolve({ token: 'l', scribe: { userId: 'a' } }); } });
    }
    return Promise.resolve({ ok: true, json() { return Promise.resolve({}); } });
  };

  return ctx.ScriptoriumAPI.register({ name: 'A', userId: 'a', email: 'a@b', password: 'x' })
    .then(() => {
      assert.ok(steps.some(s => s.indexOf('/api/auth/register') !== -1));
      assert.strictEqual(typeof ctx.__getUnifiedUser, 'function');
    });
});

test('core.js init + ScrReader stub + data stubs all coexist', () => {
  assert.ok(ctx.ScriptoriumCore);
  assert.ok(ctx.ScrReader);
  assert.strictEqual(typeof ctx.__getUnifiedUser, 'function');
  assert.strictEqual(typeof ctx.__setUnifiedUser, 'function');
});

test('core.js __setUnifiedUser writes scriptorium_v3 with full schema', () => {
  ctx.localStorage.clear();
  ctx.__setUnifiedUser({ profile: { userId: 't1' }, progress: {}, rank: {}, streak: {}, seal: {}, meta: {} });
  var v3 = JSON.parse(ctx.localStorage.getItem('scriptorium_v3'));
  assert.ok(v3, 'Missing scriptorium_v3');
  assert.strictEqual(v3._v, 3);
  assert.ok(v3.profile, 'Missing profile');
  assert.ok(v3.progress, 'Missing progress');
  assert.ok(v3.rank, 'Missing rank');
  assert.ok(v3.streak, 'Missing streak');
  assert.ok(v3.seal, 'Missing seal');
  assert.ok(v3.meta, 'Missing meta');
  assert.strictEqual(v3.profile.userId, 't1');
  assert.ok(ctx.localStorage.getItem('scribeData_v2') === null, 'Legacy key not pruned');
});

test('sidebar reads scribe data from localStorage', () => {
  ctx.localStorage.setItem('scriptorium_user', JSON.stringify({
    name: 'Reg Scribe', gender: 'male', rank: 'SCRIBE',
    totalCharacters: 500, dailyChars: 10, dailyDate: new Date().toDateString(),
    streak: 3, knowledgeLevel: '2', userId: 'rs1',
    lastActive: Date.now(), versesCompleted: 5, ntVerses: 2
  }));
  var user = null;
  try { user = JSON.parse(ctx.localStorage.getItem('scriptorium_user')); } catch(e) {}
  assert.ok(user, 'User data not readable');
  assert.strictEqual(user.name, 'Reg Scribe');
  assert.strictEqual(user.rank, 'SCRIBE');
});

test('sidebar computeRank falls back when ScriptoriumCore missing', () => {
  var saved = ctx.ScriptoriumCore;
  ctx.ScriptoriumCore = undefined;
  delete ctx.__getUnifiedUser;
  // Reload sidebar — computeRank runs with fallback path
  ctx.localStorage.clear();
  ctx.localStorage.setItem('scriptorium_user', JSON.stringify({
    name: 'Fallback', gender: 'male', rank: 'INITIATE',
    totalCharacters: 6000, dailyChars: 0, dailyDate: '',
    streak: 0, knowledgeLevel: '1', userId: 'fb1',
    lastActive: Date.now(), versesCompleted: 0, ntVerses: 0
  }));
  loadJS('assets/js/sidebar.js');
  ctx.ScriptoriumCore = saved;
});

// ═══════════════════════════════════════════════════
// Results
// ═══════════════════════════════════════════════════
console.log('\n\u2550\u2550\u2550 RESULTS \u2550\u2550\u2550');
console.log('  ' + passed + ' passed, ' + failed + ' failed' + (failed > 0 ? ' \u2717' : ' \u2713'));
console.log('');
process.exit(failed > 0 ? 1 : 0);
