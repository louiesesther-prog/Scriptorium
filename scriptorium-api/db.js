const path = require('path');
const fs = require('fs');
const logger = require('./logger');

// Storage backends: SQLite (local), PostgreSQL (Vercel), Vercel KV (Vercel fallback), JSON (last resort)
let db = null;
let pgPool = null;
let kv = null;
let usePg = false;
let useKv = false;
let useJsonFallback = false;

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'scriptorium.db');
const SCRIBES_JSON = path.join(DB_DIR, 'scribes.json');
const NL_JSON = path.join(DB_DIR, 'newsletter.json');

const KV_SCRIBES_KEY = 'scribes';
const KV_NEWSLETTER_KEY = 'newsletter';
const KV_BOOKMARKS_PREFIX = 'bookmarks:';
const KV_READING_PREFIX = 'reading:';

function ensureDir() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
}

// ── PostgreSQL adapter ──
async function initPg() {
  try {
    const { Pool } = require('pg');
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!connectionString) return false;
    pgPool = new Pool({ connectionString, max: 1, idleTimeoutMillis: 10000 });
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS scribes (
        "userId" TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        country TEXT DEFAULT '',
        city TEXT DEFAULT '',
        gender TEXT DEFAULT 'seeker',
        knowledge TEXT DEFAULT '1',
        rank TEXT DEFAULT 'Seeker',
        joined TEXT NOT NULL,
        "lastActive" BIGINT DEFAULT 0,
        "totalCharacters" INTEGER DEFAULT 0,
        "versesCompleted" INTEGER DEFAULT 0,
        "ntVerses" INTEGER DEFAULT 0,
        "planSubscriptions" TEXT DEFAULT '[]',
        "challengeSubscriptions" TEXT DEFAULT '[]',
        "isAdmin" INTEGER DEFAULT 0,
        "tradition" TEXT DEFAULT ''
      );
      CREATE TABLE IF NOT EXISTS newsletter (
        email TEXT PRIMARY KEY,
        "subscribedAt" TEXT NOT NULL,
        confirmed INTEGER DEFAULT 0,
        "confirmToken" TEXT,
        preferences TEXT DEFAULT '{}',
        "unsubscribedAt" TEXT
      );
      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "bookId" TEXT NOT NULL,
        "bookName" TEXT DEFAULT '',
        chapter INTEGER NOT NULL,
        verse INTEGER NOT NULL,
        text TEXT DEFAULT '',
        color TEXT DEFAULT '#d4af37',
        note TEXT DEFAULT '',
        timestamp BIGINT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks("userId");
      CREATE TABLE IF NOT EXISTS daily_reading (
        id SERIAL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        date TEXT NOT NULL,
        "bookId" TEXT NOT NULL,
        chapter INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_daily_reading_user ON daily_reading("userId", date);
      CREATE TABLE IF NOT EXISTS prayer_requests (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        anonymous INTEGER DEFAULT 0,
        "userId" TEXT,
        name TEXT DEFAULT '',
        "prayCount" INTEGER DEFAULT 0,
        "prayedBy" TEXT DEFAULT '[]',
        "createdAt" TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS plan_comments (
        id SERIAL PRIMARY KEY,
        "planId" TEXT NOT NULL,
        "dayIndex" INTEGER NOT NULL,
        "userId" TEXT NOT NULL,
        name TEXT DEFAULT '',
        text TEXT NOT NULL,
        "createdAt" TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_plan_comments_plan ON plan_comments("planId", "dayIndex");
      CREATE TABLE IF NOT EXISTS reading_partners (
        id SERIAL PRIMARY KEY,
        "requesterId" TEXT NOT NULL,
        "targetId" TEXT NOT NULL,
        "planId" TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        "createdAt" TEXT NOT NULL,
        "respondedAt" TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_reading_partners ON reading_partners("requesterId", "targetId");
    `);
    usePg = true;
    // Migration for existing databases
    try { await pgPool.query('ALTER TABLE scribes ADD COLUMN IF NOT EXISTS "tradition" TEXT DEFAULT \'\''); } catch(e) {}
    logger.info('Using PostgreSQL for persistent storage');
    return true;
  } catch (e) {
    logger.warn({ err: e.message }, 'PostgreSQL unavailable');
    return false;
  }
}

function pgQuery(text, params) {
  return pgPool.query(text, params).then(r => r.rows);
}

function parseScribe(row) {
  if (!row) return null;
  try { row.planSubscriptions = JSON.parse(row.planSubscriptions || '[]'); } catch(e) { row.planSubscriptions = []; }
  try { row.challengeSubscriptions = JSON.parse(row.challengeSubscriptions || '[]'); } catch(e) { row.challengeSubscriptions = []; }
  return row;
}

function parseNlRow(row) {
  if (!row) return null;
  row.confirmed = !!row.confirmed;
  try { row.preferences = JSON.parse(row.preferences || '{}'); } catch(e) { row.preferences = {}; }
  return row;
}

// ── KV adapter ──
function initKv() {
  try {
    const { kv: kvClient } = require('@vercel/kv');
    kv = kvClient;
    useKv = true;
    logger.info('Using Vercel KV for persistent storage');
    return true;
  } catch (e) {
    logger.warn({ err: e.message }, 'Vercel KV unavailable, falling back to JSON');
    return false;
  }
}

function kvGet(key) {
  try { return kv.get(key); } catch (e) { return null; }
}
function kvSet(key, val) {
  try { return kv.set(key, val); } catch (e) { /* ignore */ }
}

// ── SQLite adapter ──
function initSqlite() {
  try {
    const Database = require('better-sqlite3');
    ensureDir();
    db = new Database(DB_PATH);
      db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.exec(`
      CREATE TABLE IF NOT EXISTS scribes (
        userId TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL,
        password TEXT NOT NULL, country TEXT DEFAULT '', city TEXT DEFAULT '',
        gender TEXT DEFAULT 'seeker', knowledge TEXT DEFAULT '1', rank TEXT DEFAULT 'Seeker',
        joined TEXT NOT NULL, lastActive INTEGER DEFAULT 0, totalCharacters INTEGER DEFAULT 0,
        versesCompleted INTEGER DEFAULT 0, ntVerses INTEGER DEFAULT 0,
        planSubscriptions TEXT DEFAULT '[]', challengeSubscriptions TEXT DEFAULT '[]',
        tradition TEXT DEFAULT ''
      );

      CREATE TABLE IF NOT EXISTS newsletter (
        email TEXT PRIMARY KEY, subscribedAt TEXT NOT NULL, confirmed INTEGER DEFAULT 0,
        confirmToken TEXT, preferences TEXT DEFAULT '{}', unsubscribedAt TEXT
      );
      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY, userId TEXT NOT NULL, bookId TEXT NOT NULL,
        bookName TEXT DEFAULT '', chapter INTEGER NOT NULL, verse INTEGER NOT NULL,
        text TEXT DEFAULT '', color TEXT DEFAULT '#d4af37', note TEXT DEFAULT '',
        timestamp INTEGER NOT NULL, FOREIGN KEY (userId) REFERENCES scribes(userId)
      );
      CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(userId);
      CREATE TABLE IF NOT EXISTS daily_reading (
        id INTEGER PRIMARY KEY AUTOINCREMENT, userId TEXT NOT NULL,
        date TEXT NOT NULL, bookId TEXT NOT NULL, chapter INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES scribes(userId)
      );
      CREATE INDEX IF NOT EXISTS idx_daily_reading_user ON daily_reading(userId, date);
      CREATE TABLE IF NOT EXISTS prayer_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL,
        anonymous INTEGER DEFAULT 0, userId TEXT,
        name TEXT DEFAULT '', prayCount INTEGER DEFAULT 0,
        prayedBy TEXT DEFAULT '[]', createdAt TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS plan_comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        planId TEXT NOT NULL, dayIndex INTEGER NOT NULL,
        userId TEXT NOT NULL, name TEXT DEFAULT '',
        text TEXT NOT NULL, createdAt TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES scribes(userId)
      );
      CREATE INDEX IF NOT EXISTS idx_plan_comments_plan ON plan_comments(planId, dayIndex);
      CREATE TABLE IF NOT EXISTS reading_partners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        requesterId TEXT NOT NULL, targetId TEXT NOT NULL,
        planId TEXT NOT NULL, status TEXT DEFAULT 'pending',
        createdAt TEXT NOT NULL, respondedAt TEXT,
        FOREIGN KEY (requesterId) REFERENCES scribes(userId),
        FOREIGN KEY (targetId) REFERENCES scribes(userId)
      );
      CREATE INDEX IF NOT EXISTS idx_reading_partners ON reading_partners(requesterId, targetId);
    `);
    try { db.exec('ALTER TABLE scribes ADD COLUMN isAdmin INTEGER DEFAULT 0'); } catch(e) { /* already exists */ }
    try { db.exec('ALTER TABLE scribes ADD COLUMN tradition TEXT DEFAULT \'\''); } catch(e) { /* already exists */ }
    logger.info('SQLite database initialized at ' + DB_PATH);
    return true;
  } catch (e) {
    logger.warn({ err: e.message }, 'SQLite unavailable, falling back to JSON storage');
    return false;
  }
}

// ── JSON migration (SQLite only) ──
function migrateFromJson() {
  try {
    if (fs.existsSync(SCRIBES_JSON)) {
      const scribes = JSON.parse(fs.readFileSync(SCRIBES_JSON, 'utf8'));
      if (Array.isArray(scribes) && scribes.length > 0) {
        const insert = db.prepare(`INSERT OR IGNORE INTO scribes (userId, email, name, password, country, city, gender, knowledge, rank, joined, lastActive, totalCharacters, versesCompleted, ntVerses, planSubscriptions, challengeSubscriptions) VALUES (@userId, @email, @name, @password, @country, @city, @gender, @knowledge, @rank, @joined, @lastActive, @totalCharacters, @versesCompleted, @ntVerses, @planSubscriptions, @challengeSubscriptions)`);
        const tx = db.transaction(rows => { for (const r of rows) insert.run(r); });
        tx(scribes.map(s => ({ ...s, planSubscriptions: JSON.stringify(s.planSubscriptions || []), challengeSubscriptions: JSON.stringify(s.challengeSubscriptions || []) })));
        logger.info('Migrated ' + scribes.length + ' scribes from JSON');
      }
    }
    if (fs.existsSync(NL_JSON)) {
      const subs = JSON.parse(fs.readFileSync(NL_JSON, 'utf8'));
      if (Array.isArray(subs) && subs.length > 0) {
        const insert = db.prepare(`INSERT OR IGNORE INTO newsletter (email, subscribedAt, confirmed, confirmToken, preferences, unsubscribedAt) VALUES (@email, @subscribedAt, @confirmed, @confirmToken, @preferences, @unsubscribedAt)`);
        const tx = db.transaction(rows => { for (const r of rows) insert.run(r); });
        tx(subs.map(s => ({ email: s.email, subscribedAt: s.subscribedAt, confirmed: s.confirmed ? 1 : 0, confirmToken: s.confirmToken || null, preferences: JSON.stringify(s.preferences || {}), unsubscribedAt: s.unsubscribedAt || null })));
        logger.info('Migrated ' + subs.length + ' newsletter subscribers from JSON');
      }
    }
  } catch (e) {
    logger.error({ err: e.message }, 'JSON migration failed');
  }
}

// ── Init ──
(async function init() {
  if (process.env.VERCEL) {
    if (await initPg()) return;
    if (initKv()) return;
    useJsonFallback = true;
  } else {
    useJsonFallback = !initSqlite();
  }
  if (!useJsonFallback && db) migrateFromJson();
})();

// ── Store helpers (KV/JSON persistence) ──
function storeRead(key, jsonPath) {
  if (useKv) { const val = kvGet(key); return Array.isArray(val) ? val : []; }
  try { if (!fs.existsSync(jsonPath)) return []; return JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch (e) { return []; }
}
function storeWrite(key, jsonPath, data) {
  if (useKv) { kvSet(key, data); return; }
  ensureDir(); fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ── Scribble CRUD ──
async function allScribes() {
  if (usePg) { const rows = await pgQuery('SELECT * FROM scribes'); return rows.map(parseScribe); }
  if (useKv || useJsonFallback) return storeRead(KV_SCRIBES_KEY, SCRIBES_JSON);
  return db.prepare('SELECT * FROM scribes').all().map(parseScribe);
}

async function findScribeByUserId(userId) {
  if (usePg) { const rows = await pgQuery('SELECT * FROM scribes WHERE "userId" = $1', [userId]); return parseScribe(rows[0]); }
  if (useKv || useJsonFallback) return (await allScribes()).find(s => s.userId === userId) || null;
  return parseScribe(db.prepare('SELECT * FROM scribes WHERE userId = ?').get(userId));
}

async function findScribeByEmail(email) {
  if (usePg) { const rows = await pgQuery('SELECT * FROM scribes WHERE email = $1', [email]); return parseScribe(rows[0]); }
  if (useKv || useJsonFallback) return (await allScribes()).find(s => s.email === email) || null;
  return parseScribe(db.prepare('SELECT * FROM scribes WHERE email = ?').get(email));
}

async function insertScribe(scribe) {
  if (usePg) {
    await pgQuery(`INSERT INTO scribes ("userId", email, name, password, country, city, gender, knowledge, rank, joined, "lastActive", "totalCharacters", "versesCompleted", "ntVerses", "planSubscriptions", "challengeSubscriptions", "isAdmin", "tradition") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`, [
      scribe.userId, scribe.email, scribe.name, scribe.password, scribe.country || '', scribe.city || '',
      scribe.gender || 'seeker', scribe.knowledge || '1', scribe.rank || 'Seeker', scribe.joined,
      scribe.lastActive || 0, scribe.totalCharacters || 0, scribe.versesCompleted || 0, scribe.ntVerses || 0,
      JSON.stringify(scribe.planSubscriptions || []), JSON.stringify(scribe.challengeSubscriptions || []),
      scribe.isAdmin || 0, scribe.tradition || ''
    ]);
    return;
  }
  if (useKv || useJsonFallback) {
    const records = await allScribes();
    records.push(scribe);
    storeWrite(KV_SCRIBES_KEY, SCRIBES_JSON, records);
    return;
  }
  db.prepare(`INSERT INTO scribes (userId, email, name, password, country, city, gender, knowledge, rank, joined, lastActive, totalCharacters, versesCompleted, ntVerses, planSubscriptions, challengeSubscriptions, isAdmin, tradition) VALUES (@userId, @email, @name, @password, @country, @city, @gender, @knowledge, @rank, @joined, @lastActive, @totalCharacters, @versesCompleted, @ntVerses, @planSubscriptions, @challengeSubscriptions, @isAdmin, @tradition)`).run({ ...scribe, planSubscriptions: JSON.stringify(scribe.planSubscriptions || '[]'), challengeSubscriptions: JSON.stringify(scribe.challengeSubscriptions || '[]'), isAdmin: scribe.isAdmin || 0, tradition: scribe.tradition || '' });
}

async function updateScribe(userId, updates) {
  if (usePg) {
    const fields = []; const vals = [];
    for (const [k, v] of Object.entries(updates)) {
      const col = k.replace(/([A-Z])/g, '_$1').toLowerCase();
      if (k === 'planSubscriptions' || k === 'challengeSubscriptions') { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(JSON.stringify(v)); }
      else { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(v); }
    }
    if (fields.length === 0) return;
    vals.push(userId);
    await pgQuery(`UPDATE scribes SET ${fields.join(', ')} WHERE "userId" = $${vals.length}`, vals);
    return;
  }
  if (useKv || useJsonFallback) {
    const records = await allScribes();
    const idx = records.findIndex(s => s.userId === userId);
    if (idx === -1) return;
    Object.assign(records[idx], updates);
    storeWrite(KV_SCRIBES_KEY, SCRIBES_JSON, records);
    return;
  }
  const fields = []; const vals = {};
  for (const [k, v] of Object.entries(updates)) {
    if (k === 'planSubscriptions' || k === 'challengeSubscriptions') { fields.push(k + ' = ?'); vals[k] = JSON.stringify(v); }
    else { fields.push(k + ' = ?'); vals[k] = v; }
  }
  if (fields.length === 0) return;
  db.prepare(`UPDATE scribes SET ${fields.join(', ')} WHERE userId = ?`).run(...Object.values(vals), userId);
}

// ── Newsletter CRUD ──
async function allNewsletterSubs() {
  if (usePg) { const rows = await pgQuery('SELECT * FROM newsletter'); return rows.map(parseNlRow); }
  if (useKv || useJsonFallback) return storeRead(KV_NEWSLETTER_KEY, NL_JSON);
  return db.prepare('SELECT * FROM newsletter').all().map(parseNlRow);
}

async function findNewsletterSub(email) {
  if (usePg) { const rows = await pgQuery('SELECT * FROM newsletter WHERE email = $1', [email]); return parseNlRow(rows[0]); }
  if (useKv || useJsonFallback) return (await allNewsletterSubs()).find(s => s.email === email) || null;
  return parseNlRow(db.prepare('SELECT * FROM newsletter WHERE email = ?').get(email));
}

async function insertNewsletterSub(sub) {
  if (usePg) {
    await pgQuery(`INSERT INTO newsletter (email, "subscribedAt", confirmed, "confirmToken", preferences, "unsubscribedAt") VALUES ($1,$2,$3,$4,$5,$6)`, [sub.email, sub.subscribedAt, sub.confirmed ? 1 : 0, sub.confirmToken || null, JSON.stringify(sub.preferences || {}), sub.unsubscribedAt || null]);
    return;
  }
  if (useKv || useJsonFallback) {
    const subs = await allNewsletterSubs();
    subs.push(sub);
    storeWrite(KV_NEWSLETTER_KEY, NL_JSON, subs);
    return;
  }
  db.prepare(`INSERT INTO newsletter (email, subscribedAt, confirmed, confirmToken, preferences, unsubscribedAt) VALUES (@email, @subscribedAt, @confirmed, @confirmToken, @preferences, @unsubscribedAt)`).run({ email: sub.email, subscribedAt: sub.subscribedAt, confirmed: sub.confirmed ? 1 : 0, confirmToken: sub.confirmToken || null, preferences: JSON.stringify(sub.preferences || {}), unsubscribedAt: sub.unsubscribedAt || null });
}

async function updateNewsletterSub(email, updates) {
  if (usePg) {
    const fields = []; const vals = [];
    for (const [k, v] of Object.entries(updates)) {
      if (k === 'preferences') { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(JSON.stringify(v)); }
      else if (k === 'confirmed') { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(v ? 1 : 0); }
      else { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(v); }
    }
    if (fields.length === 0) return;
    vals.push(email);
    await pgQuery(`UPDATE newsletter SET ${fields.join(', ')} WHERE email = $${vals.length}`, vals);
    return;
  }
  if (useKv || useJsonFallback) {
    const subs = await allNewsletterSubs();
    const idx = subs.findIndex(s => s.email === email);
    if (idx === -1) return;
    Object.assign(subs[idx], updates);
    storeWrite(KV_NEWSLETTER_KEY, NL_JSON, subs);
    return;
  }
  const fields = []; const vals = [];
  for (const [k, v] of Object.entries(updates)) {
    if (k === 'preferences') { fields.push(k + ' = ?'); vals.push(JSON.stringify(v)); }
    else if (k === 'confirmed') { fields.push(k + ' = ?'); vals.push(v ? 1 : 0); }
    else { fields.push(k + ' = ?'); vals.push(v); }
  }
  if (fields.length === 0) return;
  db.prepare(`UPDATE newsletter SET ${fields.join(', ')} WHERE email = ?`).run(...vals, email);
}

async function deleteNewsletterSub(email) {
  if (usePg) { await pgQuery('DELETE FROM newsletter WHERE email = $1', [email]); return; }
  if (useKv || useJsonFallback) {
    const subs = (await allNewsletterSubs()).filter(s => s.email !== email);
    storeWrite(KV_NEWSLETTER_KEY, NL_JSON, subs);
    return;
  }
  db.prepare('DELETE FROM newsletter WHERE email = ?').run(email);
}

// ── Bookmark CRUD ──
function bookmarksKey(userId) { return KV_BOOKMARKS_PREFIX + userId; }

async function getBookmarks(userId) {
  if (usePg) { return await pgQuery('SELECT * FROM bookmarks WHERE "userId" = $1 ORDER BY timestamp DESC', [userId]); }
  if (useKv) { const val = kvGet(bookmarksKey(userId)); return Array.isArray(val) ? val : []; }
  if (useJsonFallback) return [];
  return db.prepare('SELECT * FROM bookmarks WHERE userId = ? ORDER BY timestamp DESC').all(userId);
}

async function addBookmark(bm) {
  if (usePg) {
    await pgQuery(`INSERT INTO bookmarks (id, "userId", "bookId", "bookName", chapter, verse, text, color, note, timestamp) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [bm.id, bm.userId, bm.bookId, bm.bookName || '', bm.chapter, bm.verse, bm.text || '', bm.color || '#d4af37', bm.note || '', bm.timestamp]);
    return;
  }
  if (useKv) {
    const list = await getBookmarks(bm.userId);
    list.unshift(bm);
    kvSet(bookmarksKey(bm.userId), list);
    return;
  }
  if (useJsonFallback) return;
  db.prepare('INSERT INTO bookmarks (id, userId, bookId, bookName, chapter, verse, text, color, note, timestamp) VALUES (@id, @userId, @bookId, @bookName, @chapter, @verse, @text, @color, @note, @timestamp)').run(bm);
}

async function removeBookmark(id, userId) {
  if (usePg) { await pgQuery('DELETE FROM bookmarks WHERE id = $1 AND "userId" = $2', [id, userId]); return; }
  if (useKv) {
    const list = (await getBookmarks(userId)).filter(b => b.id !== id);
    kvSet(bookmarksKey(userId), list);
    return;
  }
  if (useJsonFallback) return;
  db.prepare('DELETE FROM bookmarks WHERE id = ? AND userId = ?').run(id, userId);
}

async function findBookmark(userId, bookId, chapter, verse) {
  if (usePg) { const rows = await pgQuery('SELECT * FROM bookmarks WHERE "userId" = $1 AND "bookId" = $2 AND chapter = $3 AND verse = $4', [userId, bookId, chapter, verse]); return rows[0] || null; }
  if (useKv) return (await getBookmarks(userId)).find(b => b.bookId === bookId && b.chapter === chapter && b.verse === verse) || null;
  if (useJsonFallback) return null;
  return db.prepare('SELECT * FROM bookmarks WHERE userId = ? AND bookId = ? AND chapter = ? AND verse = ?').get(userId, bookId, chapter, verse) || null;
}

// ── Daily Reading Log CRUD ──
function readingKey(userId) { return KV_READING_PREFIX + userId; }

async function logDailyReading(userId, date, bookId, chapter) {
  if (usePg) {
    const existing = await pgQuery('SELECT id FROM daily_reading WHERE "userId" = $1 AND date = $2 AND "bookId" = $3 AND chapter = $4', [userId, date, bookId, chapter]);
    if (existing.length > 0) return;
    await pgQuery('INSERT INTO daily_reading ("userId", date, "bookId", chapter) VALUES ($1,$2,$3,$4)', [userId, date, bookId, chapter]);
    return;
  }
  if (useKv) {
    const list = kvGet(readingKey(userId)) || [];
    if (list.some(e => e.date === date && e.bookId === bookId && e.chapter === chapter)) return;
    list.push({ date, bookId, chapter });
    kvSet(readingKey(userId), list);
    return;
  }
  if (useJsonFallback) return;
  const existing = db.prepare('SELECT id FROM daily_reading WHERE userId = ? AND date = ? AND bookId = ? AND chapter = ?').get(userId, date, bookId, chapter);
  if (existing) return;
  db.prepare('INSERT INTO daily_reading (userId, date, bookId, chapter) VALUES (?, ?, ?, ?)').run(userId, date, bookId, chapter);
}

async function getReadingHistory(userId, days) {
  if (usePg) {
    const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
    return await pgQuery('SELECT date, COUNT(*)::int as count FROM daily_reading WHERE "userId" = $1 AND date >= $2 GROUP BY date ORDER BY date', [userId, since]);
  }
  if (useKv) {
    const list = kvGet(readingKey(userId)) || [];
    const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
    const grouped = {};
    for (const e of list) { if (e.date >= since) grouped[e.date] = (grouped[e.date] || 0) + 1; }
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count }));
  }
  if (useJsonFallback) return [];
  const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
  return db.prepare('SELECT date, COUNT(*) as count FROM daily_reading WHERE userId = ? AND date >= ? GROUP BY date ORDER BY date').all(userId, since);
}

// ── Grace period + streak computation (shared across backends) ──
function calcStreakWithGrace(dates) {
  // dates: array of 'YYYY-MM-DD' strings, sorted DESC, distinct
  const DAY_MS = 86400000;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - DAY_MS).toISOString().split('T')[0];
  var result = { rawStreak: 0, graceDays: 0, withinGrace: false, prevStreak: 0, lastDate: null, gap: 0 };

  if (!dates || dates.length === 0) return { ...result, streak: 0 };

  result.lastDate = dates[0];

  // Count raw streak: consecutive days including or ending at today/yesterday
  var expected = (dates[0] === yesterday && dates[0] !== today) ? yesterday : today;
  var raw = 0;
  for (var i = 0; i < dates.length; i++) {
    if (dates[i] === expected) { raw++; expected = new Date(new Date(expected).getTime() - DAY_MS).toISOString().split('T')[0]; }
    else break;
  }
  result.rawStreak = raw;

  if (raw > 0) {
    result.streak = raw;
    result.withinGrace = false;
    result.prevStreak = raw;
    result.gap = 0;
    result.graceDays = Math.max(1, Math.floor(raw / 30));
    return result;
  }

  // Streak is broken — find the previous streak before the gap
  var prev = 0;
  expected = dates[0];
  for (var j = 0; j < dates.length; j++) {
    if (dates[j] === expected) { prev++; expected = new Date(new Date(expected).getTime() - DAY_MS).toISOString().split('T')[0]; }
    else break;
  }
  result.prevStreak = prev;
  result.graceDays = Math.max(1, Math.floor(prev / 30));
  result.gap = Math.round((new Date(today) - new Date(dates[0])) / DAY_MS);
  result.withinGrace = result.gap <= result.graceDays;
  result.streak = result.withinGrace ? prev : 0;
  return result;
}

async function getStreak(userId) {
  var dates;
  if (usePg) {
    const rows = await pgQuery('SELECT DISTINCT date FROM daily_reading WHERE "userId" = $1 ORDER BY date DESC', [userId]);
    dates = rows.map(function(r) { return r.date; });
  } else if (useKv) {
    const list = kvGet(readingKey(userId)) || [];
    dates = [...new Set(list.map(function(e) { return e.date; }))].sort().reverse();
  } else if (useJsonFallback) {
    return 0;
  } else {
    const rows = db.prepare('SELECT DISTINCT date FROM daily_reading WHERE userId = ? ORDER BY date DESC').all(userId);
    dates = rows.map(function(r) { return r.date; });
  }
  return calcStreakWithGrace(dates).streak;
}

async function getStreakDetails(userId) {
  var dates;
  if (usePg) {
    const rows = await pgQuery('SELECT DISTINCT date FROM daily_reading WHERE "userId" = $1 ORDER BY date DESC', [userId]);
    dates = rows.map(function(r) { return r.date; });
  } else if (useKv) {
    const list = kvGet(readingKey(userId)) || [];
    dates = [...new Set(list.map(function(e) { return e.date; }))].sort().reverse();
  } else if (useJsonFallback) {
    dates = [];
  } else {
    const rows = db.prepare('SELECT DISTINCT date FROM daily_reading WHERE userId = ? ORDER BY date DESC').all(userId);
    dates = rows.map(function(r) { return r.date; });
  }
  return calcStreakWithGrace(dates);
}

// ── Prayer Requests ──
function addPrayer(text, anonymous, userId, name) {
  if (usePg) {
    return pgQuery(`INSERT INTO prayer_requests (text, anonymous, "userId", name, "prayCount", "prayedBy", "createdAt") VALUES ($1, $2, $3, $4, 0, '[]', $5) RETURNING *`, [text, anonymous ? 1 : 0, userId || null, anonymous ? '' : (name || ''), new Date().toISOString()])
      .then(rows => rows[0] ? { ...rows[0], anonymous: !!rows[0].anonymous, prayCount: parseInt(rows[0].prayCount) || 0, prayedBy: JSON.parse(rows[0].prayedBy || '[]') } : null);
  }
  if (useJsonFallback) {
    try {
      const prayers = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'prayers.json'), 'utf8') || '[]');
      const p = { id: Date.now(), text, anonymous: anonymous ? 1 : 0, userId: userId || null, name: anonymous ? '' : (name || ''), prayCount: 0, prayedBy: '[]', createdAt: new Date().toISOString() };
      prayers.unshift(p);
      fs.writeFileSync(path.join(DB_DIR, 'prayers.json'), JSON.stringify(prayers, null, 2));
      return Promise.resolve({ ...p, anonymous: !!p.anonymous, prayCount: 0, prayedBy: [] });
    } catch(e) { return Promise.resolve(null); }
  }
  const stmt = db.prepare(`INSERT INTO prayer_requests (text, anonymous, userId, name, prayCount, prayedBy, createdAt) VALUES (?, ?, ?, ?, 0, '[]', ?)`);
  const info = stmt.run(text, anonymous ? 1 : 0, userId || null, anonymous ? '' : (name || ''), new Date().toISOString());
  const row = db.prepare('SELECT * FROM prayer_requests WHERE id = ?').get(info.lastInsertRowid);
  return row ? { ...row, anonymous: !!row.anonymous, prayCount: row.prayCount || 0, prayedBy: JSON.parse(row.prayedBy || '[]') } : null;
}

function getPrayers(limit) {
  limit = limit || 50;
  if (usePg) {
    return pgQuery(`SELECT * FROM prayer_requests ORDER BY id DESC LIMIT $1`, [limit])
      .then(rows => rows.map(r => ({ ...r, anonymous: !!r.anonymous, prayCount: parseInt(r.prayCount) || 0, prayedBy: JSON.parse(r.prayedBy || '[]') })));
  }
  if (useJsonFallback) {
    try {
      const prayers = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'prayers.json'), 'utf8') || '[]');
      return Promise.resolve(prayers.slice(0, limit).map(p => ({ ...p, anonymous: !!p.anonymous, prayCount: p.prayCount || 0, prayedBy: JSON.parse(p.prayedBy || '[]') })));
    } catch(e) { return Promise.resolve([]); }
  }
  const rows = db.prepare('SELECT * FROM prayer_requests ORDER BY id DESC LIMIT ?').all(limit);
  return rows.map(r => ({ ...r, anonymous: !!r.anonymous, prayCount: r.prayCount || 0, prayedBy: JSON.parse(r.prayedBy || '[]') }));
}

function prayForPrayer(id, userId) {
  if (usePg) {
    return pgQuery(`SELECT * FROM prayer_requests WHERE id = $1`, [id]).then(rows => {
      if (rows.length === 0) return null;
      const row = rows[0];
      const prayedBy = JSON.parse(row.prayedBy || '[]');
      if (userId && prayedBy.indexOf(userId) >= 0) return { ...row, anonymous: !!row.anonymous, prayCount: parseInt(row.prayCount) || 0, prayedBy, alreadyPrayed: true };
      if (userId) prayedBy.push(userId);
      return pgQuery(`UPDATE prayer_requests SET "prayCount" = "prayCount" + 1, "prayedBy" = $1 WHERE id = $2 RETURNING *`, [JSON.stringify(prayedBy), id])
        .then(rows2 => rows2[0] ? { ...rows2[0], anonymous: !!rows2[0].anonymous, prayCount: parseInt(rows2[0].prayCount) || 0, prayedBy: JSON.parse(rows2[0].prayedBy || '[]') } : null);
    });
  }
  if (useJsonFallback) {
    try {
      const prayers = JSON.parse(fs.readFileSync(path.join(DB_DIR, 'prayers.json'), 'utf8') || '[]');
      const idx = prayers.findIndex(p => p.id === id);
      if (idx < 0) return Promise.resolve(null);
      const p = prayers[idx];
      const prayedBy = JSON.parse(p.prayedBy || '[]');
      if (userId && prayedBy.indexOf(userId) >= 0) return Promise.resolve({ ...p, anonymous: !!p.anonymous, prayCount: p.prayCount || 0, prayedBy, alreadyPrayed: true });
      if (userId) prayedBy.push(userId);
      prayers[idx].prayCount = (prayers[idx].prayCount || 0) + 1;
      prayers[idx].prayedBy = JSON.stringify(prayedBy);
      fs.writeFileSync(path.join(DB_DIR, 'prayers.json'), JSON.stringify(prayers, null, 2));
      return Promise.resolve({ ...prayers[idx], anonymous: !!prayers[idx].anonymous, prayCount: prayers[idx].prayCount || 0, prayedBy });
    } catch(e) { return Promise.resolve(null); }
  }
  const row = db.prepare('SELECT * FROM prayer_requests WHERE id = ?').get(id);
  if (!row) return null;
  const prayedBy = JSON.parse(row.prayedBy || '[]');
  if (userId && prayedBy.indexOf(userId) >= 0) return { ...row, anonymous: !!row.anonymous, prayCount: row.prayCount || 0, prayedBy, alreadyPrayed: true };
  if (userId) prayedBy.push(userId);
  db.prepare('UPDATE prayer_requests SET prayCount = prayCount + 1, prayedBy = ? WHERE id = ?').run(JSON.stringify(prayedBy), id);
  const updated = db.prepare('SELECT * FROM prayer_requests WHERE id = ?').get(id);
  return { ...updated, anonymous: !!updated.anonymous, prayCount: updated.prayCount || 0, prayedBy: JSON.parse(updated.prayedBy || '[]') };
}

// ── Plan Comments ──
function addPlanComment(planId, dayIndex, userId, name, text) {
  const createdAt = new Date().toISOString();
  if (usePg) {
    return pgQuery(`INSERT INTO plan_comments ("planId", "dayIndex", "userId", name, text, "createdAt") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [planId, dayIndex, userId, name, text, createdAt])
      .then(rows => rows[0] || null);
  }
  if (useJsonFallback) return Promise.resolve(null);
  const stmt = db.prepare(`INSERT INTO plan_comments (planId, dayIndex, userId, name, text, createdAt) VALUES (?,?,?,?,?,?)`);
  const info = stmt.run(planId, dayIndex, userId, name, text, createdAt);
  return db.prepare('SELECT * FROM plan_comments WHERE id = ?').get(info.lastInsertRowid) || null;
}

function getPlanComments(planId, dayIndex) {
  if (usePg) {
    return pgQuery(`SELECT * FROM plan_comments WHERE "planId" = $1 AND "dayIndex" = $2 ORDER BY id ASC`, [planId, dayIndex])
      .then(rows => rows);
  }
  if (useJsonFallback) return Promise.resolve([]);
  return db.prepare('SELECT * FROM plan_comments WHERE planId = ? AND dayIndex = ? ORDER BY id ASC').all(planId, dayIndex);
}

// ── Reading Partners ──
function requestPartner(requesterId, targetId, planId) {
  const createdAt = new Date().toISOString();
  if (usePg) {
    return pgQuery(`INSERT INTO reading_partners ("requesterId", "targetId", "planId", status, "createdAt") VALUES ($1,$2,$3,'pending',$4) RETURNING *`, [requesterId, targetId, planId, createdAt])
      .then(rows => rows[0] || null);
  }
  if (useJsonFallback) return Promise.resolve(null);
  const stmt = db.prepare(`INSERT INTO reading_partners (requesterId, targetId, planId, status, createdAt) VALUES (?,?,?,'pending',?)`);
  const info = stmt.run(requesterId, targetId, planId, createdAt);
  return db.prepare('SELECT * FROM reading_partners WHERE id = ?').get(info.lastInsertRowid) || null;
}

function respondToPartner(id, status) {
  const respondedAt = new Date().toISOString();
  if (usePg) {
    return pgQuery(`UPDATE reading_partners SET status = $1, "respondedAt" = $2 WHERE id = $3 RETURNING *`, [status, respondedAt, id])
      .then(rows => rows[0] || null);
  }
  if (useJsonFallback) return Promise.resolve(null);
  db.prepare('UPDATE reading_partners SET status = ?, respondedAt = ? WHERE id = ?').run(status, respondedAt, id);
  return db.prepare('SELECT * FROM reading_partners WHERE id = ?').get(id) || null;
}

function getPartnerRequests(userId) {
  if (usePg) {
    return pgQuery(`SELECT * FROM reading_partners WHERE "targetId" = $1 ORDER BY id DESC`, [userId])
      .then(rows => rows);
  }
  if (useJsonFallback) return Promise.resolve([]);
  return db.prepare('SELECT * FROM reading_partners WHERE targetId = ? ORDER BY id DESC').all(userId);
}

function getPartnerShips(userId) {
  if (usePg) {
    return pgQuery(`SELECT * FROM reading_partners WHERE ("requesterId" = $1 OR "targetId" = $1) AND status = 'accepted' ORDER BY id DESC`, [userId])
      .then(rows => rows);
  }
  if (useJsonFallback) return Promise.resolve([]);
  return db.prepare(`SELECT * FROM reading_partners WHERE (requesterId = ? OR targetId = ?) AND status = 'accepted' ORDER BY id DESC`).all(userId, userId);
}

module.exports = {
  allScribes, findScribeByUserId, findScribeByEmail, insertScribe, updateScribe,
  allNewsletterSubs, findNewsletterSub, insertNewsletterSub, updateNewsletterSub, deleteNewsletterSub,
  getBookmarks, addBookmark, removeBookmark, findBookmark,
  logDailyReading, getReadingHistory, getStreak, getStreakDetails,
  addPrayer, getPrayers, prayForPrayer,
  addPlanComment, getPlanComments,
  requestPartner, respondToPartner, getPartnerRequests, getPartnerShips,
  get useJsonFallback() { return useJsonFallback; },
  get useKv() { return useKv; },
  get usePg() { return usePg; }
};
