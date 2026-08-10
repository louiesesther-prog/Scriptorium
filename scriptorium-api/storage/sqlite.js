const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { DB_DIR, DB_PATH, SCRIBES_JSON, NL_JSON, ensureDir, parseScribe, parseNlRow, calcStreakWithGrace } = require('./shared');
const logger = require('../logger');

let db;

function init() {
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
  try { db.exec('ALTER TABLE scribes ADD COLUMN isAdmin INTEGER DEFAULT 0'); } catch(e) {}
  try { db.exec('ALTER TABLE scribes ADD COLUMN tradition TEXT DEFAULT \'\''); } catch(e) {}
  logger.info('SQLite database initialized at ' + DB_PATH);
  migrateFromJson();
  return true;
}

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

function allScribes() {
  return db.prepare('SELECT * FROM scribes').all().map(parseScribe);
}

function findScribeByUserId(userId) {
  return parseScribe(db.prepare('SELECT * FROM scribes WHERE userId = ?').get(userId));
}

function findScribeByEmail(email) {
  return parseScribe(db.prepare('SELECT * FROM scribes WHERE email = ?').get(email));
}

function insertScribe(scribe) {
  db.prepare(`INSERT INTO scribes (userId, email, name, password, country, city, gender, knowledge, rank, joined, lastActive, totalCharacters, versesCompleted, ntVerses, planSubscriptions, challengeSubscriptions, isAdmin, tradition) VALUES (@userId, @email, @name, @password, @country, @city, @gender, @knowledge, @rank, @joined, @lastActive, @totalCharacters, @versesCompleted, @ntVerses, @planSubscriptions, @challengeSubscriptions, @isAdmin, @tradition)`).run({ ...scribe, planSubscriptions: JSON.stringify(scribe.planSubscriptions || '[]'), challengeSubscriptions: JSON.stringify(scribe.challengeSubscriptions || '[]'), isAdmin: scribe.isAdmin || 0, tradition: scribe.tradition || '' });
}

function updateScribe(userId, updates) {
  const fields = []; const vals = {};
  for (const [k, v] of Object.entries(updates)) {
    if (k === 'planSubscriptions' || k === 'challengeSubscriptions') { fields.push(k + ' = ?'); vals[k] = JSON.stringify(v); }
    else { fields.push(k + ' = ?'); vals[k] = v; }
  }
  if (fields.length === 0) return;
  db.prepare(`UPDATE scribes SET ${fields.join(', ')} WHERE userId = ?`).run(...Object.values(vals), userId);
}

function countScribes() {
  return db.prepare('SELECT COUNT(*) AS c FROM scribes').get().c;
}

function scribesWithPlanSubs() {
  return db.prepare('SELECT planSubscriptions FROM scribes WHERE planSubscriptions IS NOT NULL AND planSubscriptions != \'[]\'').all().map(r => ({ planSubscriptions: JSON.parse(r.planSubscriptions || '[]') }));
}

function scribesWithChallengeSubs() {
  return db.prepare('SELECT challengeSubscriptions FROM scribes WHERE challengeSubscriptions IS NOT NULL AND challengeSubscriptions != \'[]\'').all().map(r => ({ challengeSubscriptions: JSON.parse(r.challengeSubscriptions || '[]') }));
}

function countNewsletterSubs() {
  return db.prepare('SELECT COUNT(*) AS c FROM newsletter').get().c;
}

function countConfirmedNewsletterSubs() {
  return db.prepare('SELECT COUNT(*) AS c FROM newsletter WHERE confirmed = 1 AND unsubscribedAt IS NULL').get().c;
}

function allNewsletterSubs() {
  return db.prepare('SELECT * FROM newsletter').all().map(parseNlRow);
}

function findNewsletterSub(email) {
  return parseNlRow(db.prepare('SELECT * FROM newsletter WHERE email = ?').get(email));
}

function findNewsletterSubByConfirmToken(token) {
  return parseNlRow(db.prepare('SELECT * FROM newsletter WHERE confirmToken = ?').get(token));
}

function insertNewsletterSub(sub) {
  db.prepare(`INSERT INTO newsletter (email, subscribedAt, confirmed, confirmToken, preferences, unsubscribedAt) VALUES (@email, @subscribedAt, @confirmed, @confirmToken, @preferences, @unsubscribedAt)`).run({ email: sub.email, subscribedAt: sub.subscribedAt, confirmed: sub.confirmed ? 1 : 0, confirmToken: sub.confirmToken || null, preferences: JSON.stringify(sub.preferences || {}), unsubscribedAt: sub.unsubscribedAt || null });
}

function updateNewsletterSub(email, updates) {
  const fields = []; const vals = [];
  for (const [k, v] of Object.entries(updates)) {
    if (k === 'preferences') { fields.push(k + ' = ?'); vals.push(JSON.stringify(v)); }
    else if (k === 'confirmed') { fields.push(k + ' = ?'); vals.push(v ? 1 : 0); }
    else { fields.push(k + ' = ?'); vals.push(v); }
  }
  if (fields.length === 0) return;
  db.prepare(`UPDATE newsletter SET ${fields.join(', ')} WHERE email = ?`).run(...vals, email);
}

function deleteNewsletterSub(email) {
  db.prepare('DELETE FROM newsletter WHERE email = ?').run(email);
}

function getBookmarks(userId) {
  return db.prepare('SELECT * FROM bookmarks WHERE userId = ? ORDER BY timestamp DESC').all(userId);
}

function addBookmark(bm) {
  db.prepare('INSERT INTO bookmarks (id, userId, bookId, bookName, chapter, verse, text, color, note, timestamp) VALUES (@id, @userId, @bookId, @bookName, @chapter, @verse, @text, @color, @note, @timestamp)').run(bm);
}

function removeBookmark(id, userId) {
  db.prepare('DELETE FROM bookmarks WHERE id = ? AND userId = ?').run(id, userId);
}

function findBookmark(userId, bookId, chapter, verse) {
  return db.prepare('SELECT * FROM bookmarks WHERE userId = ? AND bookId = ? AND chapter = ? AND verse = ?').get(userId, bookId, chapter, verse) || null;
}

function logDailyReading(userId, date, bookId, chapter) {
  const existing = db.prepare('SELECT id FROM daily_reading WHERE userId = ? AND date = ? AND bookId = ? AND chapter = ?').get(userId, date, bookId, chapter);
  if (existing) return;
  db.prepare('INSERT INTO daily_reading (userId, date, bookId, chapter) VALUES (?, ?, ?, ?)').run(userId, date, bookId, chapter);
}

function getReadingHistory(userId, days) {
  const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
  return db.prepare('SELECT date, COUNT(*) as count FROM daily_reading WHERE userId = ? AND date >= ? GROUP BY date ORDER BY date').all(userId, since);
}

function getStreakDates(userId) {
  const rows = db.prepare('SELECT DISTINCT date FROM daily_reading WHERE userId = ? ORDER BY date DESC').all(userId);
  return rows.map(r => r.date);
}

function getStreak(userId) {
  return calcStreakWithGrace(getStreakDates(userId)).streak;
}

function getStreakDetails(userId) {
  return calcStreakWithGrace(getStreakDates(userId));
}

function addPrayer(text, anonymous, userId, name) {
  const stmt = db.prepare(`INSERT INTO prayer_requests (text, anonymous, userId, name, prayCount, prayedBy, createdAt) VALUES (?, ?, ?, ?, 0, '[]', ?)`);
  const info = stmt.run(text, anonymous ? 1 : 0, userId || null, anonymous ? '' : (name || ''), new Date().toISOString());
  const row = db.prepare('SELECT * FROM prayer_requests WHERE id = ?').get(info.lastInsertRowid);
  return row ? { ...row, anonymous: !!row.anonymous, prayCount: row.prayCount || 0, prayedBy: JSON.parse(row.prayedBy || '[]') } : null;
}

function getPrayers(limit) {
  limit = limit || 50;
  const rows = db.prepare('SELECT * FROM prayer_requests ORDER BY id DESC LIMIT ?').all(limit);
  return rows.map(r => ({ ...r, anonymous: !!r.anonymous, prayCount: r.prayCount || 0, prayedBy: JSON.parse(r.prayedBy || '[]') }));
}

function prayForPrayer(id, userId) {
  const row = db.prepare('SELECT * FROM prayer_requests WHERE id = ?').get(id);
  if (!row) return null;
  const prayedBy = JSON.parse(row.prayedBy || '[]');
  if (userId && prayedBy.indexOf(userId) >= 0) return { ...row, anonymous: !!row.anonymous, prayCount: row.prayCount || 0, prayedBy, alreadyPrayed: true };
  if (userId) prayedBy.push(userId);
  db.prepare('UPDATE prayer_requests SET prayCount = prayCount + 1, prayedBy = ? WHERE id = ?').run(JSON.stringify(prayedBy), id);
  const updated = db.prepare('SELECT * FROM prayer_requests WHERE id = ?').get(id);
  return { ...updated, anonymous: !!updated.anonymous, prayCount: updated.prayCount || 0, prayedBy: JSON.parse(updated.prayedBy || '[]') };
}

function addPlanComment(planId, dayIndex, userId, name, text) {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`INSERT INTO plan_comments (planId, dayIndex, userId, name, text, createdAt) VALUES (?,?,?,?,?,?)`);
  const info = stmt.run(planId, dayIndex, userId, name, text, createdAt);
  return db.prepare('SELECT * FROM plan_comments WHERE id = ?').get(info.lastInsertRowid) || null;
}

function getPlanComments(planId, dayIndex) {
  return db.prepare('SELECT * FROM plan_comments WHERE planId = ? AND dayIndex = ? ORDER BY id ASC').all(planId, dayIndex);
}

function requestPartner(requesterId, targetId, planId) {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`INSERT INTO reading_partners (requesterId, targetId, planId, status, createdAt) VALUES (?,?,?,'pending',?)`);
  const info = stmt.run(requesterId, targetId, planId, createdAt);
  return db.prepare('SELECT * FROM reading_partners WHERE id = ?').get(info.lastInsertRowid) || null;
}

function respondToPartner(id, status) {
  const respondedAt = new Date().toISOString();
  db.prepare('UPDATE reading_partners SET status = ?, respondedAt = ? WHERE id = ?').run(status, respondedAt, id);
  return db.prepare('SELECT * FROM reading_partners WHERE id = ?').get(id) || null;
}

function getPartnerRequests(userId) {
  return db.prepare('SELECT * FROM reading_partners WHERE targetId = ? ORDER BY id DESC').all(userId);
}

function getPartnerShips(userId) {
  return db.prepare(`SELECT * FROM reading_partners WHERE (requesterId = ? OR targetId = ?) AND status = 'accepted' ORDER BY id DESC`).all(userId, userId);
}

function isReady() { return !!db; }

module.exports = {
  init, isReady,
  allScribes, countScribes, scribesWithPlanSubs, scribesWithChallengeSubs,
  findScribeByUserId, findScribeByEmail, insertScribe, updateScribe,
  countNewsletterSubs, countConfirmedNewsletterSubs,
  allNewsletterSubs, findNewsletterSub, findNewsletterSubByConfirmToken, insertNewsletterSub, updateNewsletterSub, deleteNewsletterSub,
  getBookmarks, addBookmark, removeBookmark, findBookmark,
  logDailyReading, getReadingHistory, getStreak, getStreakDetails,
  addPrayer, getPrayers, prayForPrayer,
  addPlanComment, getPlanComments,
  requestPartner, respondToPartner, getPartnerRequests, getPartnerShips
};
