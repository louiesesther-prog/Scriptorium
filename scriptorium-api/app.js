const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const pinoHttp = require('pino-http');
const logger = require('./logger');
const { authMiddleware, adminMiddleware, incrementStreak } = require('./routes/shared');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'https://holyscriptorium.com,https://www.holyscriptorium.com,https://scriptorium-sandy.vercel.app')
  .split(',').map(function(o) { return o.trim(); }).filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..')));
app.use(pinoHttp({ logger }));

const isTest = process.env.NODE_ENV === 'test';
const globalLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 500 : 100, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many requests, slow down.' } });
const authLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 50 : 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many auth attempts. Try again later.' } });
const newsletterLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 50 : 5, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many newsletter requests.' } });
const pushLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 50 : 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many push requests.' } });

app.use(globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/reset-password', authLimiter);
app.use('/api/newsletter/subscribe', newsletterLimiter);
app.use('/api/newsletter/unsubscribe', newsletterLimiter);
app.use('/api/push/subscribe', pushLimiter);
app.use('/api/push/unsubscribe', pushLimiter);

app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/auth')) {
    res.set('Cache-Control', 'no-store');
  } else if (req.path === '/search') {
    res.set('Cache-Control', 'no-cache');
  } else {
    res.set('Cache-Control', 'public, max-age=300');
  }
  next();
});

const BIBLE_DIR = path.join(__dirname, '..', 'assets', 'data', 'bible-text');
const DOCS_DIR = path.join(__dirname, '..', 'assets', 'docs');
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) { logger.fatal('JWT_SECRET environment variable is not set.'); process.exit(1); }
const JWT_EXPIRY = '24h';

var CANON_OT = ['genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','1_samuel','2_samuel','1_kings','2_kings','1_chronicles','2_chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','song_of_solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];
var CANON_NT = ['matthew','mark','luke','john','acts','romans','1_corinthians','2_corinthians','galatians','ephesians','philippians','colossians','1_thessalonians','2_thessalonians','1_timothy','2_timothy','titus','philemon','hebrews','james','1_peter','2_peter','1_john','2_john','3_john','jude','revelation'];

function loadBookIndex() {
  const index = {};

  const testaments = { ot: [], nt: [], ethiopian: [] };
  if (!fs.existsSync(BIBLE_DIR)) return { index, testaments };
  const files = fs.readdirSync(BIBLE_DIR).filter(f => f.endsWith('.json'));
  for (let i = 0; i < files.length; i++) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(BIBLE_DIR, files[i]), 'utf8'));
      const fileId = path.basename(files[i], '.json');
      const slug = fileId.toLowerCase();
      const isCanonOT = data.version === 'NIV' && data.era === 'ot' && CANON_OT.includes(slug);
      const isCanonNT = data.version === 'NIV' && data.era === 'nt' && CANON_NT.includes(slug);
      index[slug] = { fileId, title: data.title, writer: data.writer, era: data.era, totalChapters: data.totalChapters, deuterocanonical: !isCanonOT && !isCanonNT };
      if (isCanonOT) testaments.ot.push(slug);
      if (isCanonNT) testaments.nt.push(slug);
      if (!isCanonOT && !isCanonNT) testaments.ethiopian.push(slug);
    } catch (e) {}
  }
  return { index, testaments };
}

var { index: BOOK_INDEX, testaments: TESTAMENTS } = loadBookIndex();

var bibleCache = {};
function getBookData(fileId) {
  if (bibleCache[fileId]) return bibleCache[fileId];
  var filePath = path.join(BIBLE_DIR, fileId + '.json');
  if (!fs.existsSync(filePath)) return null;
  bibleCache[fileId] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return bibleCache[fileId];
}

var ctx = {
  BIBLE_DIR, DOCS_DIR, JWT_SECRET, JWT_EXPIRY,
  BOOK_INDEX, TESTAMENTS, getBookData,
  authMiddleware, adminMiddleware, incrementStreak
};

require('./routes/bible')(app, ctx);
require('./routes/auth')(app, ctx);
require('./routes/partners')(app, ctx);
require('./routes/bookmarks')(app, ctx);
require('./routes/reading')(app, ctx);
require('./routes/newsletter')(app, ctx);
require('./routes/prayer')(app, ctx);
require('./routes/admin')(app, ctx);
require('./routes/plans')(app, ctx);
require('./routes/challenges')(app, ctx);
require('./routes/push')(app, ctx);

if (process.env.NODE_ENV === 'test') {
  app.post('/api/test/setup-admin', async (req, res) => {
    try {
      const db = require('./db');
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: 'userId required' });
      const scribe = await db.findScribeByUserId(userId);
      if (!scribe) return res.status(404).json({ error: 'Scribe not found' });
      await db.updateScribe(userId, { isAdmin: 1 });
      const token = jwt.sign({ userId: scribe.userId, name: scribe.name, rank: scribe.rank, isAdmin: 1, tradition: scribe.tradition || '' }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
      res.json({ message: 'Scribe promoted to admin', token });
    } catch(e) {
      res.status(500).json({ error: 'Error promoting to admin' });
    }
  });
}

module.exports = app;
