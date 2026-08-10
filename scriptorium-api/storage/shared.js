const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '..', '..', 'data');
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

function calcStreakWithGrace(dates) {
  var result = { rawStreak: 0, graceDays: 0, withinGrace: false, prevStreak: 0, lastDate: null, gap: 0 };
  if (!dates || dates.length === 0) return { ...result, streak: 0 };
  result.lastDate = dates[0];
  const DAY_MS = 86400000;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - DAY_MS).toISOString().split('T')[0];
  var expected = (dates[0] === yesterday && dates[0] !== today) ? yesterday : today;
  var raw = 0;
  for (var i = 0; i < dates.length; i++) {
    if (dates[i] === expected) { raw++; expected = new Date(new Date(expected).getTime() - DAY_MS).toISOString().split('T')[0]; }
    else break;
  }
  result.rawStreak = raw;
  if (raw > 0) {
    result.streak = raw; result.withinGrace = false; result.prevStreak = raw; result.gap = 0;
    result.graceDays = Math.max(1, Math.floor(raw / 30));
    return result;
  }
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

module.exports = {
  DB_DIR, DB_PATH, SCRIBES_JSON, NL_JSON,
  KV_SCRIBES_KEY, KV_NEWSLETTER_KEY, KV_BOOKMARKS_PREFIX, KV_READING_PREFIX,
  ensureDir, parseScribe, parseNlRow, calcStreakWithGrace
};
