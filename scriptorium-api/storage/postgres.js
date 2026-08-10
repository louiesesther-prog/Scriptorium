const { Pool } = require('pg');
const logger = require('../logger');
const { parseScribe, parseNlRow, calcStreakWithGrace } = require('./shared');

let pool;

async function init() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) return false;
  pool = new Pool({ connectionString, max: 1, idleTimeoutMillis: 10000 });
  await pool.query(`
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
  try { await pool.query('ALTER TABLE scribes ADD COLUMN IF NOT EXISTS "tradition" TEXT DEFAULT \'\''); } catch(e) {}
  logger.info('Using PostgreSQL for persistent storage');
  return true;
}

function pgQuery(text, params) {
  return pool.query(text, params).then(r => r.rows);
}

async function allScribes() {
  const rows = await pgQuery('SELECT * FROM scribes');
  return rows.map(parseScribe);
}

async function findScribeByUserId(userId) {
  const rows = await pgQuery('SELECT * FROM scribes WHERE "userId" = $1', [userId]);
  return parseScribe(rows[0]);
}

async function findScribeByEmail(email) {
  const rows = await pgQuery('SELECT * FROM scribes WHERE email = $1', [email]);
  return parseScribe(rows[0]);
}

async function insertScribe(scribe) {
  await pgQuery(`INSERT INTO scribes ("userId", email, name, password, country, city, gender, knowledge, rank, joined, "lastActive", "totalCharacters", "versesCompleted", "ntVerses", "planSubscriptions", "challengeSubscriptions", "isAdmin", "tradition") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`, [
    scribe.userId, scribe.email, scribe.name, scribe.password, scribe.country || '', scribe.city || '',
    scribe.gender || 'seeker', scribe.knowledge || '1', scribe.rank || 'Seeker', scribe.joined,
    scribe.lastActive || 0, scribe.totalCharacters || 0, scribe.versesCompleted || 0, scribe.ntVerses || 0,
    JSON.stringify(scribe.planSubscriptions || []), JSON.stringify(scribe.challengeSubscriptions || []),
    scribe.isAdmin || 0, scribe.tradition || ''
  ]);
}

async function updateScribe(userId, updates) {
  const fields = []; const vals = [];
  for (const [k, v] of Object.entries(updates)) {
    if (k === 'planSubscriptions' || k === 'challengeSubscriptions') { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(JSON.stringify(v)); }
    else { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(v); }
  }
  if (fields.length === 0) return;
  vals.push(userId);
  await pgQuery(`UPDATE scribes SET ${fields.join(', ')} WHERE "userId" = $${vals.length}`, vals);
}

async function countScribes() {
  const rows = await pgQuery('SELECT COUNT(*) AS c FROM scribes');
  return parseInt(rows[0].c) || 0;
}

async function scribesWithPlanSubs() {
  const rows = await pgQuery(`SELECT "planSubscriptions" FROM scribes WHERE "planSubscriptions" IS NOT NULL AND "planSubscriptions" != '[]'`);
  return rows.map(r => ({ planSubscriptions: JSON.parse(r.planSubscriptions || '[]') }));
}

async function scribesWithChallengeSubs() {
  const rows = await pgQuery(`SELECT "challengeSubscriptions" FROM scribes WHERE "challengeSubscriptions" IS NOT NULL AND "challengeSubscriptions" != '[]'`);
  return rows.map(r => ({ challengeSubscriptions: JSON.parse(r.challengeSubscriptions || '[]') }));
}

async function countNewsletterSubs() {
  const rows = await pgQuery('SELECT COUNT(*) AS c FROM newsletter');
  return parseInt(rows[0].c) || 0;
}

async function countConfirmedNewsletterSubs() {
  const rows = await pgQuery('SELECT COUNT(*) AS c FROM newsletter WHERE confirmed = 1 AND "unsubscribedAt" IS NULL');
  return parseInt(rows[0].c) || 0;
}

async function allNewsletterSubs() {
  const rows = await pgQuery('SELECT * FROM newsletter');
  return rows.map(parseNlRow);
}

async function findNewsletterSub(email) {
  const rows = await pgQuery('SELECT * FROM newsletter WHERE email = $1', [email]);
  return parseNlRow(rows[0]);
}

async function findNewsletterSubByConfirmToken(token) {
  const rows = await pgQuery('SELECT * FROM newsletter WHERE "confirmToken" = $1', [token]);
  return parseNlRow(rows[0]);
}

async function insertNewsletterSub(sub) {
  await pgQuery(`INSERT INTO newsletter (email, "subscribedAt", confirmed, "confirmToken", preferences, "unsubscribedAt") VALUES ($1,$2,$3,$4,$5,$6)`, [sub.email, sub.subscribedAt, sub.confirmed ? 1 : 0, sub.confirmToken || null, JSON.stringify(sub.preferences || {}), sub.unsubscribedAt || null]);
}

async function updateNewsletterSub(email, updates) {
  const fields = []; const vals = [];
  for (const [k, v] of Object.entries(updates)) {
    if (k === 'preferences') { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(JSON.stringify(v)); }
    else if (k === 'confirmed') { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(v ? 1 : 0); }
    else { fields.push(`"${k}" = $${vals.length + 1}`); vals.push(v); }
  }
  if (fields.length === 0) return;
  vals.push(email);
  await pgQuery(`UPDATE newsletter SET ${fields.join(', ')} WHERE email = $${vals.length}`, vals);
}

async function deleteNewsletterSub(email) {
  await pgQuery('DELETE FROM newsletter WHERE email = $1', [email]);
}

async function getBookmarks(userId) {
  return await pgQuery('SELECT * FROM bookmarks WHERE "userId" = $1 ORDER BY timestamp DESC', [userId]);
}

async function addBookmark(bm) {
  await pgQuery(`INSERT INTO bookmarks (id, "userId", "bookId", "bookName", chapter, verse, text, color, note, timestamp) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [bm.id, bm.userId, bm.bookId, bm.bookName || '', bm.chapter, bm.verse, bm.text || '', bm.color || '#d4af37', bm.note || '', bm.timestamp]);
}

async function removeBookmark(id, userId) {
  await pgQuery('DELETE FROM bookmarks WHERE id = $1 AND "userId" = $2', [id, userId]);
}

async function findBookmark(userId, bookId, chapter, verse) {
  const rows = await pgQuery('SELECT * FROM bookmarks WHERE "userId" = $1 AND "bookId" = $2 AND chapter = $3 AND verse = $4', [userId, bookId, chapter, verse]);
  return rows[0] || null;
}

async function logDailyReading(userId, date, bookId, chapter) {
  const existing = await pgQuery('SELECT id FROM daily_reading WHERE "userId" = $1 AND date = $2 AND "bookId" = $3 AND chapter = $4', [userId, date, bookId, chapter]);
  if (existing.length > 0) return;
  await pgQuery('INSERT INTO daily_reading ("userId", date, "bookId", chapter) VALUES ($1,$2,$3,$4)', [userId, date, bookId, chapter]);
}

async function getReadingHistory(userId, days) {
  const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
  return await pgQuery('SELECT date, COUNT(*)::int as count FROM daily_reading WHERE "userId" = $1 AND date >= $2 GROUP BY date ORDER BY date', [userId, since]);
}

async function getStreakDates(userId) {
  const rows = await pgQuery('SELECT DISTINCT date FROM daily_reading WHERE "userId" = $1 ORDER BY date DESC', [userId]);
  return rows.map(r => r.date);
}

async function getStreak(userId) {
  const dates = await getStreakDates(userId);
  return calcStreakWithGrace(dates).streak;
}

async function getStreakDetails(userId) {
  const dates = await getStreakDates(userId);
  return calcStreakWithGrace(dates);
}

function addPrayer(text, anonymous, userId, name) {
  return pgQuery(`INSERT INTO prayer_requests (text, anonymous, "userId", name, "prayCount", "prayedBy", "createdAt") VALUES ($1, $2, $3, $4, 0, '[]', $5) RETURNING *`, [text, anonymous ? 1 : 0, userId || null, anonymous ? '' : (name || ''), new Date().toISOString()])
    .then(rows => rows[0] ? { ...rows[0], anonymous: !!rows[0].anonymous, prayCount: parseInt(rows[0].prayCount) || 0, prayedBy: JSON.parse(rows[0].prayedBy || '[]') } : null);
}

function getPrayers(limit) {
  limit = limit || 50;
  return pgQuery(`SELECT * FROM prayer_requests ORDER BY id DESC LIMIT $1`, [limit])
    .then(rows => rows.map(r => ({ ...r, anonymous: !!r.anonymous, prayCount: parseInt(r.prayCount) || 0, prayedBy: JSON.parse(r.prayedBy || '[]') })));
}

function prayForPrayer(id, userId) {
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

function addPlanComment(planId, dayIndex, userId, name, text) {
  const createdAt = new Date().toISOString();
  return pgQuery(`INSERT INTO plan_comments ("planId", "dayIndex", "userId", name, text, "createdAt") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [planId, dayIndex, userId, name, text, createdAt])
    .then(rows => rows[0] || null);
}

function getPlanComments(planId, dayIndex) {
  return pgQuery(`SELECT * FROM plan_comments WHERE "planId" = $1 AND "dayIndex" = $2 ORDER BY id ASC`, [planId, dayIndex])
    .then(rows => rows);
}

function requestPartner(requesterId, targetId, planId) {
  const createdAt = new Date().toISOString();
  return pgQuery(`INSERT INTO reading_partners ("requesterId", "targetId", "planId", status, "createdAt") VALUES ($1,$2,$3,'pending',$4) RETURNING *`, [requesterId, targetId, planId, createdAt])
    .then(rows => rows[0] || null);
}

function respondToPartner(id, status) {
  const respondedAt = new Date().toISOString();
  return pgQuery(`UPDATE reading_partners SET status = $1, "respondedAt" = $2 WHERE id = $3 RETURNING *`, [status, respondedAt, id])
    .then(rows => rows[0] || null);
}

function getPartnerRequests(userId) {
  return pgQuery(`SELECT * FROM reading_partners WHERE "targetId" = $1 ORDER BY id DESC`, [userId])
    .then(rows => rows);
}

function getPartnerShips(userId) {
  return pgQuery(`SELECT * FROM reading_partners WHERE ("requesterId" = $1 OR "targetId" = $1) AND status = 'accepted' ORDER BY id DESC`, [userId])
    .then(rows => rows);
}

function isReady() { return !!pool; }

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
