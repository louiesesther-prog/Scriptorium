const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const { DB_DIR, SCRIBES_JSON, NL_JSON, KV_SCRIBES_KEY, KV_NEWSLETTER_KEY, KV_BOOKMARKS_PREFIX, KV_READING_PREFIX, ensureDir, parseScribe, parseNlRow, calcStreakWithGrace } = require('./shared');

let kv = null;

function init() {
  try {
    const { kv: kvClient } = require('@vercel/kv');
    kv = kvClient;
    logger.info('Using Vercel KV for persistent storage');
    return true;
  } catch (e) {
    logger.warn({ err: e.message }, 'Vercel KV unavailable, falling back to JSON');
    return false;
  }
}

function kvGet(key) {
  try { return kv ? kv.get(key) : null; } catch (e) { return null; }
}

function kvSet(key, val) {
  try { if (kv) kv.set(key, val); } catch (e) {}
}

function storeRead(key, jsonPath) {
  if (kv) { const val = kvGet(key); return Array.isArray(val) ? val : []; }
  try { if (!fs.existsSync(jsonPath)) return []; return JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch (e) { return []; }
}

function storeWrite(key, jsonPath, data) {
  if (kv) { kvSet(key, data); return; }
  ensureDir(); fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

function allScribes() {
  return storeRead(KV_SCRIBES_KEY, SCRIBES_JSON);
}

function findScribeByUserId(userId) {
  return allScribes().find(s => s.userId === userId) || null;
}

function findScribeByEmail(email) {
  return allScribes().find(s => s.email === email) || null;
}

function insertScribe(scribe) {
  const records = allScribes();
  records.push(scribe);
  storeWrite(KV_SCRIBES_KEY, SCRIBES_JSON, records);
}

function updateScribe(userId, updates) {
  const records = allScribes();
  const idx = records.findIndex(s => s.userId === userId);
  if (idx === -1) return;
  Object.assign(records[idx], updates);
  storeWrite(KV_SCRIBES_KEY, SCRIBES_JSON, records);
}

function countScribes() {
  return allScribes().length;
}

function scribesWithPlanSubs() {
  return allScribes().filter(s => s.planSubscriptions && s.planSubscriptions.length > 0);
}

function scribesWithChallengeSubs() {
  return allScribes().filter(s => s.challengeSubscriptions && s.challengeSubscriptions.length > 0);
}

function countNewsletterSubs() {
  return allNewsletterSubs().length;
}

function countConfirmedNewsletterSubs() {
  return allNewsletterSubs().filter(s => s.confirmed && !s.unsubscribedAt).length;
}

function allNewsletterSubs() {
  return storeRead(KV_NEWSLETTER_KEY, NL_JSON);
}

function findNewsletterSub(email) {
  return allNewsletterSubs().find(s => s.email === email) || null;
}

function findNewsletterSubByConfirmToken(token) {
  return allNewsletterSubs().find(s => s.confirmToken === token) || null;
}

function insertNewsletterSub(sub) {
  const subs = allNewsletterSubs();
  subs.push(sub);
  storeWrite(KV_NEWSLETTER_KEY, NL_JSON, subs);
}

function updateNewsletterSub(email, updates) {
  const subs = allNewsletterSubs();
  const idx = subs.findIndex(s => s.email === email);
  if (idx === -1) return;
  Object.assign(subs[idx], updates);
  storeWrite(KV_NEWSLETTER_KEY, NL_JSON, subs);
}

function deleteNewsletterSub(email) {
  const subs = allNewsletterSubs().filter(s => s.email !== email);
  storeWrite(KV_NEWSLETTER_KEY, NL_JSON, subs);
}

function bookmarksKey(userId) { return KV_BOOKMARKS_PREFIX + userId; }

function getBookmarks(userId) {
  if (kv) { const val = kvGet(bookmarksKey(userId)); return Array.isArray(val) ? val : []; }
  return [];
}

function addBookmark(bm) {
  if (!kv) return;
  const list = getBookmarks(bm.userId);
  list.unshift(bm);
  kvSet(bookmarksKey(bm.userId), list);
}

function removeBookmark(id, userId) {
  if (!kv) return;
  const list = getBookmarks(userId).filter(b => b.id !== id);
  kvSet(bookmarksKey(userId), list);
}

function findBookmark(userId, bookId, chapter, verse) {
  if (!kv) return null;
  return getBookmarks(userId).find(b => b.bookId === bookId && b.chapter === chapter && b.verse === verse) || null;
}

function readingKey(userId) { return KV_READING_PREFIX + userId; }

function logDailyReading(userId, date, bookId, chapter) {
  if (!kv) return;
  const list = kvGet(readingKey(userId)) || [];
  if (list.some(e => e.date === date && e.bookId === bookId && e.chapter === chapter)) return;
  list.push({ date, bookId, chapter });
  kvSet(readingKey(userId), list);
}

function getReadingHistory(userId, days) {
  if (!kv) return [];
  const list = kvGet(readingKey(userId)) || [];
  const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
  const grouped = {};
  for (const e of list) { if (e.date >= since) grouped[e.date] = (grouped[e.date] || 0) + 1; }
  return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count }));
}

function getStreakDates(userId) {
  if (!kv) return [];
  const list = kvGet(readingKey(userId)) || [];
  return [...new Set(list.map(e => e.date))].sort().reverse();
}

function getStreak(userId) {
  return calcStreakWithGrace(getStreakDates(userId)).streak;
}

function getStreakDetails(userId) {
  return calcStreakWithGrace(getStreakDates(userId));
}

function addPrayer(text, anonymous, userId, name) {
  if (!kv) return Promise.resolve(null);
  try {
    const prayersPath = path.join(DB_DIR, 'prayers.json');
    const prayers = JSON.parse(fs.readFileSync(prayersPath, 'utf8') || '[]');
    const p = { id: Date.now(), text, anonymous: anonymous ? 1 : 0, userId: userId || null, name: anonymous ? '' : (name || ''), prayCount: 0, prayedBy: '[]', createdAt: new Date().toISOString() };
    prayers.unshift(p);
    fs.writeFileSync(prayersPath, JSON.stringify(prayers, null, 2));
    return Promise.resolve({ ...p, anonymous: !!p.anonymous, prayCount: 0, prayedBy: [] });
  } catch(e) { return Promise.resolve(null); }
}

function getPrayers(limit) {
  if (!kv) return [];
  try {
    const prayersPath = path.join(DB_DIR, 'prayers.json');
    const prayers = JSON.parse(fs.readFileSync(prayersPath, 'utf8') || '[]');
    return prayers.slice(0, limit || 50).map(p => ({ ...p, anonymous: !!p.anonymous, prayCount: p.prayCount || 0, prayedBy: JSON.parse(p.prayedBy || '[]') }));
  } catch(e) { return []; }
}

function prayForPrayer(id, userId) {
  if (!kv) return Promise.resolve(null);
  try {
    const prayersPath = path.join(DB_DIR, 'prayers.json');
    const prayers = JSON.parse(fs.readFileSync(prayersPath, 'utf8') || '[]');
    const idx = prayers.findIndex(p => p.id === id);
    if (idx < 0) return Promise.resolve(null);
    const p = prayers[idx];
    const prayedBy = JSON.parse(p.prayedBy || '[]');
    if (userId && prayedBy.indexOf(userId) >= 0) return Promise.resolve({ ...p, anonymous: !!p.anonymous, prayCount: p.prayCount || 0, prayedBy, alreadyPrayed: true });
    if (userId) prayedBy.push(userId);
    prayers[idx].prayCount = (prayers[idx].prayCount || 0) + 1;
    prayers[idx].prayedBy = JSON.stringify(prayedBy);
    fs.writeFileSync(prayersPath, JSON.stringify(prayers, null, 2));
    return Promise.resolve({ ...prayers[idx], anonymous: !!prayers[idx].anonymous, prayCount: prayers[idx].prayCount || 0, prayedBy });
  } catch(e) { return Promise.resolve(null); }
}

function addPlanComment() { return null; }

function getPlanComments() { return []; }

function requestPartner() { return null; }

function respondToPartner() { return null; }

function getPartnerRequests() { return []; }

function getPartnerShips() { return []; }

function isReady() { return true; }

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
