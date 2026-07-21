const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const email = require('./email');
const { PLANS, getPlan, listPlans } = require('./plans-data');
const { listChallenges, getChallenge, getCurrentChallenge } = require('./challenges-data');
const { validate } = require('./validate');
const db = require('./db');
const { getDailyVerse } = require('./daily-verse');
const { getCrossReferences } = require('./cross-references');
const { getWordStudy } = require('./word-study');
const audioBible = require('./audio-bible');
const push = require('./push');
const rateLimit = require('express-rate-limit');
const pinoHttp = require('pino-http');
const logger = require('./logger');

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'https://scriptorium-sandy.vercel.app' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..')));

// Structured request logging
app.use(pinoHttp({ logger }));

// Rate limiting
const isTest = process.env.NODE_ENV === 'test';
const globalLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 500 : 100, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many requests, slow down.' } });
const authLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 50 : 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many auth attempts. Try again later.' } });
const newsletterLimiter = rateLimit({ windowMs: 60 * 1000, max: isTest ? 50 : 5, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many newsletter requests.' } });
app.use(globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/reset-password', authLimiter);
app.use('/api/newsletter/subscribe', newsletterLimiter);

// Cache headers — Bible data caches 5min, auth never caches
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

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized. A valid token is required.' });
  try {
    const decoded = jwt.verify(header.slice(7), JWT_SECRET);
    req.scribe = decoded;
    next();
  } catch(e) {
    return res.status(401).json({ error: 'Token expired or invalid.' });
  }
}

function adminMiddleware(req, res, next) {
  if (!req.scribe || !req.scribe.isAdmin) {
    return res.status(403).json({ error: 'Forbidden. Only custodians may access this archive.' });
  }
  next();
}

// ── Auth routes ──

app.get('/api/auth/check-userId', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId || !/^[a-zA-Z0-9_]{3,30}$/.test(userId)) return res.status(400).json({ error: 'Invalid User ID format.' });
    const exists = !!(await db.findScribeByUserId(userId));
    res.json({ available: !exists });
  } catch(e) {
    res.status(500).json({ error: 'Internal error.' });
  }
});

// Expose Scripture API config to frontend (key is set server-side only)
app.get('/api/config', (req, res) => {
  const key = process.env.SCRIPTURE_API_KEY || '';
  res.json({
    SCRIPTURE_API_KEY: key,
    USE_SCRIPTURE_API: !!key,
    SCRIPTURE_BASE: 'https://api.scripture.api.bible/v1'
  });
});

app.post('/api/auth/register', validate('register'), async (req, res) => {
  try {
    const { name, userId, email, password, tradition } = req.validated;
    const { country, city, gender, knowledge } = req.body;
    if (await db.findScribeByUserId(userId)) return res.status(409).json({ error: 'A scribe with this User ID already exists.' });
    if (await db.findScribeByEmail(email)) return res.status(409).json({ error: 'A scribe with this Email already exists.' });
    const rankTitles = { '1': 'Novice of the Outer Court', '2': 'Student of the Living Word', '3': 'Witness of the Covenant', '4': 'Scribe of the High Archive' };
    const hashedPassword = await bcrypt.hash(password, 10);
    const scribe = {
      name, userId, email, password: hashedPassword,
      country: country || '', city: city || '',
      gender: gender || 'seeker',
      knowledge: knowledge || '1',
      rank: rankTitles[knowledge] || 'Seeker',
      joined: new Date().toISOString(),
      lastActive: Date.now(),
      totalCharacters: 0, versesCompleted: 0, ntVerses: 0,
      planSubscriptions: [], challengeSubscriptions: [],
      tradition: tradition || ''
    };
    await db.insertScribe(scribe);
    const token = jwt.sign({ userId: scribe.userId, name: scribe.name, rank: scribe.rank, isAdmin: scribe.isAdmin || 0, tradition: scribe.tradition }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.status(201).json({ message: 'Induction complete. Your seal is affixed.', token, scribe: { userId: scribe.userId, name: scribe.name, rank: scribe.rank, joined: scribe.joined, tradition: scribe.tradition } });
  } catch(e) {
    res.status(500).json({ error: 'Internal error during induction.' });
  }
});

app.post('/api/auth/login', validate('login'), async (req, res) => {
  try {
    const { userId, password } = req.validated;
    const scribe = await db.findScribeByUserId(userId);
    if (!scribe) return res.status(401).json({ error: 'Invalid Scribe ID or Cipher Key.' });
    const valid = await bcrypt.compare(password, scribe.password);
    if (!valid) return res.status(401).json({ error: 'Invalid Scribe ID or Cipher Key.' });
    await db.updateScribe(userId, { lastActive: Date.now() });
    const token = jwt.sign({ userId: scribe.userId, name: scribe.name, rank: scribe.rank, isAdmin: scribe.isAdmin || 0, tradition: scribe.tradition || '' }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.json({ message: 'Access granted.', token, scribe: { userId: scribe.userId, name: scribe.name, rank: scribe.rank, joined: scribe.joined, tradition: scribe.tradition || '' } });
  } catch(e) {
    res.status(500).json({ error: 'Internal error during authentication.' });
  }
});

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Seal withdrawn. Session closed.' });
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const scribe = await db.findScribeByUserId(req.scribe.userId);
  if (!scribe) return res.status(404).json({ error: 'Scribe record not found.' });
  res.json({ scribe: { userId: scribe.userId, name: scribe.name, rank: scribe.rank, knowledge: scribe.knowledge, joined: scribe.joined, country: scribe.country, city: scribe.city, gender: scribe.gender, totalCharacters: scribe.totalCharacters, versesCompleted: scribe.versesCompleted, tradition: scribe.tradition || '' } });
});

app.put('/api/auth/tradition', authMiddleware, async (req, res) => {
  try {
    const { tradition } = req.body;
    if (!tradition) return res.status(400).json({ error: 'Tradition identifier required.' });
    await db.updateScribe(req.scribe.userId, { tradition: String(tradition).slice(0, 40) });
    res.json({ message: 'Tradition updated.', tradition: String(tradition).slice(0, 40) });
  } catch(e) {
    res.status(500).json({ error: 'Error updating tradition.' });
  }
});

app.post('/api/auth/achievements', authMiddleware, async (req, res) => {
  try {
    const { badges, xp, rank } = req.body;
    if (rank) await db.updateScribe(req.scribe.userId, { rank: String(rank).slice(0, 40) });
    res.json({ message: 'Achievements synced.' });
  } catch(e) {
    res.status(500).json({ error: 'Error syncing achievements.' });
  }
});

// ── READING PARTNER ROUTES ──

app.get('/api/partners/scribes', authMiddleware, async (req, res) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    if (q.length < 2) return res.json({ scribes: [] });
    const all = await db.allScribes();
    const matched = all.filter(function(s) {
      if (!s.name) return false;
      if (s.userId === req.scribe.userId) return false;
      return s.name.toLowerCase().indexOf(q) >= 0 || s.userId.toLowerCase().indexOf(q) >= 0;
    }).slice(0, 10).map(function(s) {
      return { userId: s.userId, name: s.name, tradition: s.tradition || '', rank: s.rank || '' };
    });
    res.json({ scribes: matched });
  } catch(e) { res.status(500).json({ error: 'Search failed.' }); }
});

app.post('/api/partners/request', authMiddleware, async (req, res) => {
  try {
    const { targetId, planId } = req.body;
    if (!targetId || !planId) return res.status(400).json({ error: 'targetId and planId required.' });
    if (targetId === req.scribe.userId) return res.status(400).json({ error: 'Cannot partner with yourself.' });
    const target = await db.findScribeByUserId(targetId);
    if (!target) return res.status(404).json({ error: 'Scribe not found.' });
    const existing = await db.getPartnerShips(req.scribe.userId);
    const already = existing.some(function(s) {
      return (s.requesterId === targetId || s.targetId === targetId) && s.planId === planId;
    });
    if (already) return res.status(409).json({ error: 'Already partnered on this plan.' });
    const request = await db.requestPartner(req.scribe.userId, targetId, planId);
    if (!request) return res.status(500).json({ error: 'Could not create request.' });
    res.status(201).json({ request: { id: request.id, requesterId: request.requesterId, targetId: request.targetId, planId: request.planId, status: request.status } });
  } catch(e) { res.status(500).json({ error: 'Request failed.' }); }
});

app.post('/api/partners/respond', authMiddleware, async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ error: 'id and status required.' });
    if (status !== 'accepted' && status !== 'rejected') return res.status(400).json({ error: 'status must be accepted or rejected.' });
    const request = await db.respondToPartner(id, status);
    if (!request) return res.status(404).json({ error: 'Request not found.' });
    if (request.targetId !== req.scribe.userId) return res.status(403).json({ error: 'Not your request to respond to.' });
    res.json({ request: { id: request.id, status: request.status, respondedAt: request.respondedAt } });
  } catch(e) { res.status(500).json({ error: 'Response failed.' }); }
});

app.get('/api/partners/requests', authMiddleware, async (req, res) => {
  try {
    const requests = await db.getPartnerRequests(req.scribe.userId);
    res.json({ requests: requests.map(function(r) { return { id: r.id, requesterId: r.requesterId, planId: r.planId, status: r.status, createdAt: r.createdAt }; }) });
  } catch(e) { res.status(500).json({ error: 'Failed to fetch requests.' }); }
});

app.get('/api/partners/ships', authMiddleware, async (req, res) => {
  try {
    const ships = await db.getPartnerShips(req.scribe.userId);
    res.json({ partnerships: ships.map(function(s) { return { id: s.id, requesterId: s.requesterId, targetId: s.targetId, planId: s.planId, status: s.status, createdAt: s.createdAt }; }) });
  } catch(e) { res.status(500).json({ error: 'Failed to fetch partnerships.' }); }
});

app.get('/api/partners/progress/:userId', authMiddleware, async (req, res) => {
  try {
    const target = await db.findScribeByUserId(req.params.userId);
    if (!target) return res.status(404).json({ error: 'Scribe not found.' });
    res.json({ progress: target.readingProgress || target.planSubscriptions || [] });
  } catch(e) { res.status(500).json({ error: 'Failed to fetch progress.' }); }
});

// ── BOOKMARK ROUTES ──

app.get('/api/bookmarks', authMiddleware, async (req, res) => {
  try {
    const bookmarks = await db.getBookmarks(req.scribe.userId);
    res.json({ bookmarks });
  } catch(e) {
    res.status(500).json({ error: 'Error fetching bookmarks.' });
  }
});

app.post('/api/bookmarks', authMiddleware, async (req, res) => {
  try {
    const { bookId, bookName, chapter, verse, text, color, note } = req.body;
    if (!bookId || !chapter || !verse) return res.status(400).json({ error: 'bookId, chapter, and verse are required.' });
    const existing = await db.findBookmark(req.scribe.userId, bookId, chapter, verse);
    if (existing) return res.status(409).json({ error: 'Bookmark already exists for this verse.', bookmark: existing });
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    await db.addBookmark({ id, userId: req.scribe.userId, bookId, bookName: bookName || '', chapter, verse, text: text || '', color: color || '#d4af37', note: note || '', timestamp: Date.now() });
    res.status(201).json({ message: 'Bookmark added.', id });
  } catch(e) {
    res.status(500).json({ error: 'Error adding bookmark.' });
  }
});

app.delete('/api/bookmarks/:id', authMiddleware, async (req, res) => {
  try {
    await db.removeBookmark(req.params.id, req.scribe.userId);
    res.json({ message: 'Bookmark removed.' });
  } catch(e) {
    res.status(500).json({ error: 'Error removing bookmark.' });
  }
});

// ── READING HISTORY ROUTES ──

app.post('/api/reading/log', authMiddleware, async (req, res) => {
  try {
    const { bookId, chapter } = req.body;
    if (!bookId || !chapter) return res.status(400).json({ error: 'bookId and chapter required.' });
    const date = new Date().toISOString().split('T')[0];
    await db.logDailyReading(req.scribe.userId, date, bookId, chapter);
    const detail = await db.getStreakDetails(req.scribe.userId);
    res.json({ message: 'Reading logged.', date, streak: detail.streak, graceDays: detail.graceDays, withinGrace: detail.withinGrace });
  } catch(e) {
    res.status(500).json({ error: 'Error logging reading.' });
  }
});

app.get('/api/reading/history', authMiddleware, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 365;
    const history = await db.getReadingHistory(req.scribe.userId, days);
    const detail = await db.getStreakDetails(req.scribe.userId);
    res.json({ history, streak: detail.streak, graceDays: detail.graceDays, withinGrace: detail.withinGrace });
  } catch(e) {
    res.status(500).json({ error: 'Error fetching history.' });
  }
});

app.get('/api/reading/streak', authMiddleware, async (req, res) => {
  try {
    const detail = await db.getStreakDetails(req.scribe.userId);
    res.json({ streak: detail.streak, graceDays: detail.graceDays, withinGrace: detail.withinGrace, prevStreak: detail.prevStreak, gap: detail.gap });
  } catch(e) {
    res.status(500).json({ error: 'Error fetching streak.' });
  }
});

// ── DAILY VERSE ROUTE ──

app.get('/api/daily-verse', async (req, res) => {
  try {
    res.json(getDailyVerse());
  } catch(e) {
    res.status(500).json({ error: 'Error fetching daily verse.' });
  }
});

// ── CROSS-REFERENCE ROUTE ──

app.get('/api/cross-references/:book/:chapter', async (req, res) => {
  try {
    var book = req.params.book.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    var chapter = parseInt(req.params.chapter);
    if (!chapter || chapter < 1) return res.status(400).json({ error: 'Invalid chapter' });
    var refs = getCrossReferences(book, chapter);
    // Also check surrounding chapters
    var extraRefs = [];
    for (var i = 1; i <= 3; i++) {
      if (chapter - i >= 1) extraRefs = extraRefs.concat(getCrossReferences(book, chapter - i));
    }
    var combined = refs.concat(extraRefs);
    // Deduplicate by ref
    var seen = {};
    combined = combined.filter(function(r) { var k = r.ref; if (seen[k]) return false; seen[k] = true; return true; });
    res.json({ book: book, chapter: chapter, crossReferences: combined, total: combined.length });
  } catch(e) {
    res.status(500).json({ error: 'Error fetching cross-references.' });
  }
});

// ── WORD STUDY ROUTE ──
app.get('/api/word-study/:word', function(req, res) {
  try {
    var result = getWordStudy(req.params.word);
    if (!result) return res.status(404).json({ error: 'Word not found.' });
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: 'Error looking up word.' });
  }
});

// ── AUDIO BIBLE ROUTE ──

app.get('/api/audio/:book/:chapter', async (req, res) => {
  try {
    var book = req.params.book.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    var chapter = parseInt(req.params.chapter);
    if (!chapter || chapter < 1) return res.status(400).json({ error: 'Invalid chapter' });
    var audio = await audioBible.getAudioForChapter(book, chapter);
    res.json(audio);
  } catch(e) {
    res.status(500).json({ error: 'Error fetching audio.' });
  }
});

// ── NEWSLETTER ROUTES ──

app.post('/api/newsletter/subscribe', validate('newsletterSubscribe'), async (req, res) => {
  try {
    const emailAddr = req.validated.email.trim().toLowerCase();
    const existing = await db.findNewsletterSub(emailAddr);
    if (existing && existing.confirmed) return res.json({ message: 'Already subscribed.' });
    if (existing && !existing.confirmed) {
      const token = crypto.randomBytes(16).toString('hex');
      await db.updateNewsletterSub(emailAddr, { confirmToken: token });
      await email.sendConfirmEmail(emailAddr, token, emailAddr);
      return res.json({ message: 'Confirmation email resent.' });
    }
    const confirmToken = crypto.randomBytes(16).toString('hex');
    await db.insertNewsletterSub({ email: emailAddr, subscribedAt: new Date().toISOString(), confirmed: false, confirmToken, preferences: { weeklyDigest: true, newFeatures: true, readingTips: false }, unsubscribedAt: null });
    await email.sendConfirmEmail(emailAddr, confirmToken, emailAddr);
    res.json({ message: 'Confirmation email sent. Check your inbox.' });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.get('/api/newsletter/confirm', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).send('Missing confirmation token.');
    const subs = await db.allNewsletterSubs();
    const sub = subs.find(s => s.confirmToken === token);
    if (!sub) return res.status(404).send('Invalid or expired confirmation token.');
    await db.updateNewsletterSub(sub.email, { confirmed: true, confirmToken: null, confirmedAt: new Date().toISOString() });
    await email.sendWelcomeEmail(sub.email);
    res.send('<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Subscription Confirmed — Scriptorium</title><style>body{margin:0;padding:0;background:#050505;color:#e0e0e0;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh}div{text-align:center;max-width:400px;padding:40px}h1{font-size:1.3rem;letter-spacing:6px;color:#d4af37;font-weight:400;margin:0 0 15px}p{font-size:0.95rem;color:rgba(255,255,255,0.4);line-height:1.6;margin:0}a{display:inline-block;margin-top:24px;padding:10px 24px;border:1px solid rgba(212,175,55,0.3);color:#d4af37;text-decoration:none;font-size:0.65rem;letter-spacing:3px}</style></head><body><div><h1>CONFIRMED</h1><p>Your subscription to the Scriptorium Archive is now active. You will receive weekly digests, new text announcements, and reading plan updates.</p><a href="https://scriptorium-sandy.vercel.app">ENTER THE ARCHIVE</a></div></body></html>');
  } catch(e) {
    res.status(500).send('An error occurred.');
  }
});

app.get('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const rawEmail = req.query.email;
    if (!rawEmail) return res.status(400).json({ error: 'Email is required.' });
    const emailAddr = rawEmail.trim().toLowerCase();
    const sub = await db.findNewsletterSub(emailAddr);
    if (!sub) return res.json({ message: 'Email not found in our list.' });
    await db.updateNewsletterSub(emailAddr, { unsubscribedAt: new Date().toISOString(), confirmed: false });
    await email.sendUnsubscribeEmail(emailAddr);
    res.json({ message: 'Unsubscribed successfully.' });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/api/newsletter/subscribers', authMiddleware, adminMiddleware, async (req, res) => {
  const subs = await db.allNewsletterSubs();
  const confirmed = subs.filter(s => s.confirmed && !s.unsubscribedAt);
  res.json({ total: confirmed.length, subscribers: confirmed.map(function(s) { return { email: s.email, subscribedAt: s.subscribedAt, preferences: s.preferences }; }) });
});

// ── Prayer Wall ──
app.post('/api/prayer', validate('prayerSubmit'), async (req, res) => {
  try {
    const { text, anonymous } = req.validated;
    if (!text || typeof text !== 'string' || text.trim().length < 2) return res.status(400).json({ error: 'Prayer must be at least 2 characters.' });
    if (text.length > 500) return res.status(400).json({ error: 'Prayer too long (max 500 chars).' });
    const userId = req.scribe ? req.scribe.userId : null;
    const name = req.scribe ? req.scribe.name : '';
    const prayer = await db.addPrayer(text.trim(), !!anonymous, userId, name);
    if (!prayer) return res.status(500).json({ error: 'Could not submit prayer.' });
    res.status(201).json({ prayer: { id: prayer.id, text: prayer.text, anonymous: prayer.anonymous, prayCount: prayer.prayCount, createdAt: prayer.createdAt } });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/api/prayer/:id/pray', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid prayer ID.' });
    const userId = req.scribe ? req.scribe.userId : 'anon_' + req.ip;
    const result = await db.prayForPrayer(id, userId);
    if (!result) return res.status(404).json({ error: 'Prayer not found.' });
    res.json({ prayer: { id: result.id, prayCount: result.prayCount, alreadyPrayed: !!result.alreadyPrayed } });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/api/prayer', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const prayers = await db.getPrayers(limit);
    const userId = req.scribe ? req.scribe.userId : null;
    res.json({
      prayers: prayers.map(function(p) {
        return {
          id: p.id, text: p.text,
          name: p.anonymous ? 'Anonymous' : (p.name || 'A Scribe'),
          prayCount: p.prayCount || 0,
          prayed: userId ? ((p.prayedBy || []).indexOf(userId) >= 0) : false,
          createdAt: p.createdAt
        };
      })
    });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    var records = await db.allScribes();
    var totalScribes = records.length;
    var totalPlanSubs = 0;
    var planSubCounts = {};
    var totalChallengeSubs = 0;
    for (var i = 0; i < records.length; i++) {
      var r = records[i];
      if (r.planSubscriptions) {
        totalPlanSubs += r.planSubscriptions.length;
        for (var j = 0; j < r.planSubscriptions.length; j++) {
          var pid = r.planSubscriptions[j].planId;
          planSubCounts[pid] = (planSubCounts[pid] || 0) + 1;
        }
      }
      if (r.challengeSubscriptions) totalChallengeSubs += r.challengeSubscriptions.length;
    }
    var nlSubs = await db.allNewsletterSubs();
    var nlConfirmed = nlSubs.filter(function(s) { return s.confirmed && !s.unsubscribedAt; }).length;
    var nlTotal = nlSubs.length;
    res.json({
      scribes: totalScribes,
      newsletterConfirmed: nlConfirmed,
      newsletterTotal: nlTotal,
      planSubscriptions: totalPlanSubs,
      planBreakdown: planSubCounts,
      challengeSubscriptions: totalChallengeSubs
    });
  } catch(e) {
    res.status(500).json({ error: 'Error fetching stats.' });
  }
});

// ── READING PLAN ROUTES ──

app.get('/api/plans', (req, res) => {
  const category = req.query.category || null;
  const tradition = req.query.tradition || null;
  res.json({ plans: listPlans(category, tradition) });
});

app.get('/api/traditions', (req, res) => {
  res.json({ traditions: require('./plans-data').TRADITIONS });
});

app.get('/api/plans/:id', (req, res) => {
  const plan = getPlan(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found.' });
  res.json({ plan });
});

app.post('/api/plans/subscribe', validate('planSubscribe'), authMiddleware, async (req, res) => {
  try {
    const { planId } = req.validated;
    const plan = getPlan(planId);
    if (!plan) return res.status(404).json({ error: 'Plan not found.' });
    const scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe) return res.status(404).json({ error: 'Scribe not found.' });
    if (!scribe.planSubscriptions) scribe.planSubscriptions = [];
    if (scribe.planSubscriptions.some(p => p.planId === planId)) return res.json({ message: 'Already subscribed to this plan.' });
    scribe.planSubscriptions.push({ planId, startedAt: new Date().toISOString(), completedDays: [], currentDay: 0, completedAt: null, streak: 0, lastActiveDay: null });
    await db.updateScribe(req.scribe.userId, { planSubscriptions: scribe.planSubscriptions });
    res.json({ message: 'Subscribed to ' + plan.name + '.', subscription: scribe.planSubscriptions[scribe.planSubscriptions.length - 1] });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/api/plans/unsubscribe', validate('planUnsubscribe'), authMiddleware, async (req, res) => {
  try {
    const { planId } = req.validated;
    const scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe) return res.status(404).json({ error: 'Scribe not found.' });
    if (!scribe.planSubscriptions) scribe.planSubscriptions = [];
    scribe.planSubscriptions = scribe.planSubscriptions.filter(p => p.planId !== planId);
    await db.updateScribe(req.scribe.userId, { planSubscriptions: scribe.planSubscriptions });
    res.json({ message: 'Unsubscribed from plan.' });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/api/plans/my/progress', authMiddleware, async (req, res) => {
  try {
    const scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe) return res.status(404).json({ error: 'Scribe not found.' });
    const subs = (scribe.planSubscriptions || []).map(function(s) {
      const plan = getPlan(s.planId);
      const totalDays = plan ? plan.totalDays : 0;
      var currentReading = '';
      if (plan && s.currentDay < plan.totalDays && plan.days && plan.days[s.currentDay]) {
        currentReading = plan.days[s.currentDay];
      }
      return {
        planId: s.planId, planName: plan ? plan.name : 'Unknown', planColor: plan ? plan.color : '#666',
        totalDays: totalDays, startedAt: s.startedAt, completedDays: s.completedDays,
        currentDay: s.currentDay, completedAt: s.completedAt, streak: s.streak,
        progress: plan ? Math.round((s.completedDays.length / plan.totalDays) * 100) : 0,
        currentReading: currentReading
      };
    });
    res.json({ subscriptions: subs });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/api/plans/complete-day', validate('completeDay'), authMiddleware, async (req, res) => {
  try {
    const { planId } = req.validated;
    const scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe) return res.status(404).json({ error: 'Scribe not found.' });
    if (!scribe.planSubscriptions) return res.status(400).json({ error: 'No subscriptions.' });
    const sub = scribe.planSubscriptions.find(s => s.planId === planId);
    if (!sub) return res.status(404).json({ error: 'Subscription not found.' });
    const plan = getPlan(planId);
    if (!plan) return res.status(404).json({ error: 'Plan not found.' });
    const dayIndex = sub.currentDay;
    if (sub.completedDays.includes(dayIndex)) return res.json({ message: 'Day already completed.', subscription: sub });
    sub.completedDays.push(dayIndex);
    sub.completedDays.sort(function(a,b) { return a - b; });
    sub.currentDay = dayIndex + 1;
    const today = new Date().toDateString();
    if (sub.lastActiveDay === today) {
      sub.streak = (sub.streak || 0);
    } else if (sub.lastActiveDay && new Date(sub.lastActiveDay).toDateString() === new Date(Date.now() - 86400000).toDateString()) {
      sub.streak = (sub.streak || 0) + 1;
    } else {
      sub.streak = 1;
    }
    sub.lastActiveDay = today;
    if (sub.currentDay >= plan.totalDays) sub.completedAt = new Date().toISOString();
    scribe.totalCharacters = (scribe.totalCharacters || 0) + 50;
    scribe.versesCompleted = (scribe.versesCompleted || 0) + 1;
    await db.updateScribe(req.scribe.userId, { planSubscriptions: scribe.planSubscriptions, totalCharacters: scribe.totalCharacters, versesCompleted: scribe.versesCompleted });
    var nextReading = '';
    if (!sub.completedAt && plan.days && plan.days[sub.currentDay]) {
      nextReading = plan.days[sub.currentDay];
    }
    res.json({ message: 'Day ' + (dayIndex + 1) + ' of ' + plan.name + ' completed.', subscription: { planId: sub.planId, currentDay: sub.currentDay, completedDays: sub.completedDays, completedAt: sub.completedAt, streak: sub.streak, progress: Math.round((sub.completedDays.length / plan.totalDays) * 100), currentReading: nextReading } });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/api/challenges', (req, res) => {
  try {
    var all = listChallenges();
    res.json({ challenges: all });
  } catch(e) {
    res.status(500).json({ error: 'Error retrieving challenges.' });
  }
});

app.get('/api/challenges/current', (req, res) => {
  try {
    var c = getCurrentChallenge();
    if (!c) return res.status(404).json({ error: 'No current challenge.' });
    res.json({ challenge: c });
  } catch(e) {
    res.status(500).json({ error: 'Error retrieving current challenge.' });
  }
});

app.get('/api/challenges/:id', (req, res) => {
  try {
    var c = getChallenge(req.params.id);
    if (!c) return res.status(404).json({ error: 'Challenge not found.' });
    res.json({ challenge: c });
  } catch(e) {
    res.status(500).json({ error: 'Error retrieving challenge.' });
  }
});

app.post('/api/challenges/join', validate('challengeJoin'), authMiddleware, async (req, res) => {
  try {
    var challengeId = req.validated.challengeId;
    var challenge = getChallenge(challengeId);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found.' });
    var scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe) return res.status(404).json({ error: 'Scribe not found.' });
    if (!scribe.challengeSubscriptions) scribe.challengeSubscriptions = [];
    var existing = null;
    for (var i = 0; i < scribe.challengeSubscriptions.length; i++) {
      if (scribe.challengeSubscriptions[i].challengeId === challengeId) { existing = scribe.challengeSubscriptions[i]; break; }
    }
    if (existing) return res.json({ message: 'Already joined this challenge.', subscription: existing });
    var sub = {
      challengeId: challengeId,
      book: challenge.book,
      monthName: challenge.monthName,
      joinedAt: new Date().toISOString(),
      completedDays: [],
      currentDay: 0,
      streak: 0,
      lastActiveDay: null,
      completedAt: null,
      progress: 0
    };
    scribe.challengeSubscriptions.push(sub);
    await db.updateScribe(req.scribe.userId, { challengeSubscriptions: scribe.challengeSubscriptions });
    res.json({ message: 'Joined the ' + challenge.book + ' challenge.', subscription: sub });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/api/challenges/unjoin', validate('challengeUnjoin'), authMiddleware, async (req, res) => {
  try {
    var challengeId = req.validated.challengeId;
    var scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe || !scribe.challengeSubscriptions) return res.status(404).json({ error: 'Not joined.' });
    var before = scribe.challengeSubscriptions.length;
    scribe.challengeSubscriptions = scribe.challengeSubscriptions.filter(function(s) { return s.challengeId !== challengeId; });
    if (scribe.challengeSubscriptions.length === before) return res.status(404).json({ error: 'Not joined.' });
    await db.updateScribe(req.scribe.userId, { challengeSubscriptions: scribe.challengeSubscriptions });
    res.json({ message: 'Left the challenge.' });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

function getChallengeDayReading(challenge, dayIndex) {
  if (!challenge || dayIndex >= challenge.totalDays) return '';
  var totalCh = challenge.totalChapters;
  var totalDays = challenge.totalDays;
  var chPerDay = challenge.chaptersPerDay;
  var startCh = (dayIndex * chPerDay) + 1;
  var endCh = Math.min(startCh + chPerDay - 1, totalCh);
  if (startCh > totalCh) return '';
  if (startCh === endCh) return challenge.book + ' ' + startCh;
  return challenge.book + ' ' + startCh + '-' + endCh;
}

app.get('/api/challenges/my/progress', authMiddleware, async (req, res) => {
  try {
    var scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe || !scribe.challengeSubscriptions) return res.json({ subscriptions: [] });
    var subs = scribe.challengeSubscriptions.map(function(s) {
      var c = getChallenge(s.challengeId);
      var reading = s.completedAt ? '' : getChallengeDayReading(c, s.currentDay);
      return { challengeId: s.challengeId, book: s.book, monthName: s.monthName, joinedAt: s.joinedAt, completedDays: s.completedDays, currentDay: s.currentDay, completedAt: s.completedAt, streak: s.streak, lastActiveDay: s.lastActiveDay, progress: s.progress, currentReading: reading };
    });
    res.json({ subscriptions: subs });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/api/challenges/complete-day', validate('completeDay'), authMiddleware, async (req, res) => {
  try {
    var challengeId = req.validated.challengeId;
    var challenge = getChallenge(challengeId);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found.' });
    var scribe = await db.findScribeByUserId(req.scribe.userId);
    if (!scribe || !scribe.challengeSubscriptions) return res.status(404).json({ error: 'Not joined.' });
    var sub = null;
    for (var i = 0; i < scribe.challengeSubscriptions.length; i++) {
      if (scribe.challengeSubscriptions[i].challengeId === challengeId) { sub = scribe.challengeSubscriptions[i]; break; }
    }
    if (!sub) return res.status(404).json({ error: 'Not joined.' });
    if (sub.completedAt) return res.json({ message: 'Challenge already completed.', subscription: sub });
    var dayIndex = sub.currentDay;
    if (sub.completedDays.includes(dayIndex)) return res.json({ message: 'Day already completed.', subscription: sub });
    sub.completedDays.push(dayIndex);
    sub.completedDays.sort(function(a,b) { return a - b; });
    sub.currentDay = dayIndex + 1;
    var today = new Date().toDateString();
    if (sub.lastActiveDay === today) {
      sub.streak = (sub.streak || 0);
    } else if (sub.lastActiveDay && new Date(sub.lastActiveDay).toDateString() === new Date(Date.now() - 86400000).toDateString()) {
      sub.streak = (sub.streak || 0) + 1;
    } else {
      sub.streak = 1;
    }
    sub.lastActiveDay = today;
    if (sub.currentDay >= challenge.totalDays) sub.completedAt = new Date().toISOString();
    scribe.totalCharacters = (scribe.totalCharacters || 0) + 50;
    scribe.versesCompleted = (scribe.versesCompleted || 0) + 1;
    sub.progress = Math.round((sub.completedDays.length / challenge.totalDays) * 100);
    sub.currentReading = sub.completedAt ? '' : getChallengeDayReading(challenge, sub.currentDay);
    await db.updateScribe(req.scribe.userId, { challengeSubscriptions: scribe.challengeSubscriptions, totalCharacters: scribe.totalCharacters, versesCompleted: scribe.versesCompleted });
    res.json({ message: 'Day ' + (dayIndex + 1) + ' of the ' + challenge.book + ' challenge completed.', subscription: sub });
  } catch(e) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/api/auth/forgot-password', validate('forgotPassword'), async (req, res) => {
  try {
    const emailAddr = req.validated.email;
    const scribe = await db.findScribeByEmail(emailAddr);
    if (!scribe) return res.json({ message: 'If a matching account is found, a reset link will be sent to your email.' });
    const resetToken = jwt.sign({ userId: scribe.userId, purpose: 'reset' }, JWT_SECRET, { expiresIn: '1h' });
    const sent = await email.sendPasswordResetEmail(scribe.email, resetToken);
    if (!sent) return res.status(500).json({ error: 'Failed to send reset email. Try again later.' });
    res.json({ message: 'If a matching account is found, a reset link will be sent to your email.' });
  } catch(e) {
    res.status(500).json({ error: 'Internal error.' });
  }
});

app.post('/api/auth/reset-password', validate('resetPassword'), async (req, res) => {
  try {
    const { token: resetToken, password: newPassword } = req.validated;
    let decoded;
    try { decoded = jwt.verify(resetToken, JWT_SECRET); } catch(e) { return res.status(401).json({ error: 'Invalid or expired reset token.' }); }
    if (decoded.purpose !== 'reset') return res.status(401).json({ error: 'Invalid token purpose.' });
    const scribe = await db.findScribeByUserId(decoded.userId);
    if (!scribe) return res.status(404).json({ error: 'Scribe not found.' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.updateScribe(decoded.userId, { password: hashed });
    res.json({ message: 'Your Cipher Key has been reforged. You may now enter.' });
  } catch(e) {
    res.status(500).json({ error: 'Internal error.' });
  }
});

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

const { index: BOOK_INDEX, testaments: TESTAMENTS } = loadBookIndex();

function registerTestamentRoutes(era) {
  const label = era === 'ot' ? 'Old Testament' : 'New Testament';
  const base = `/api/${era}`;

  app.get(base, (req, res) => {
    const books = (TESTAMENTS[era] || []).map(slug => ({
      id: BOOK_INDEX[slug].fileId,
      title: BOOK_INDEX[slug].title
    }));
    res.json({ testament: label, canonCount: era === 'ot' ? 39 : 27, availableRecords: books.length, books });
  });

  app.get(`${base}/:book`, (req, res) => {
    const slug = req.params.book.toLowerCase().trim();
    const meta = BOOK_INDEX[slug];
    if (!meta) return res.status(404).json({ error: `'${req.params.book}' not found in ${label}.` });
    res.json({ bookId: meta.fileId, title: meta.title, writer: meta.writer, totalChapters: meta.totalChapters, downloadLink: `${base}/${slug}/download` });
  });

  app.get(`${base}/:book/:chapter`, (req, res) => {
    const slug = req.params.book.toLowerCase().trim();
    const chapter = parseInt(req.params.chapter);
    const meta = BOOK_INDEX[slug];
    if (!meta) return res.status(404).json({ error: `'${req.params.book}' not found.` });
    const filePath = path.join(BIBLE_DIR, `${meta.fileId}.json`);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const ch = data.chapters.find(c => parseInt(c.number) === chapter);
      if (!ch) return res.status(404).json({ error: `Chapter ${chapter} not found in ${meta.title}.` });
      res.json({ book: meta.title, chapter, verses: ch.verses.map((text, i) => ({ verse: i + 1, text })) });
    } catch (e) {
      res.status(500).json({ error: 'Failed to read chapter.' });
    }
  });

  app.get(`${base}/:book/download`, (req, res) => {
    const slug = req.params.book.toLowerCase().trim();
    const meta = BOOK_INDEX[slug];
    if (!meta) return res.status(404).json({ error: `'${req.params.book}' not found.` });
    const pdfPath = path.join(DOCS_DIR, era, `${slug}.pdf`);
    if (!fs.existsSync(pdfPath)) return res.status(404).json({ error: `PDF for ${meta.title} is unavailable.` });
    res.download(pdfPath, `${meta.fileId}_Scriptorium.pdf`);
  });
}

registerTestamentRoutes('ot');
registerTestamentRoutes('nt');

app.get('/api/ethiopian', (req, res) => {
  const books = (TESTAMENTS.ethiopian || []).map(slug => ({
    id: BOOK_INDEX[slug].fileId,
    title: BOOK_INDEX[slug].title
  }));
  res.json({ testament: 'Ethiopian Orthodox Tewahedo Canon (Unique Books)', canonCount: books.length, books });
});

app.get('/api/ethiopian/:book', (req, res) => {
  const slug = req.params.book.toLowerCase().trim();
  const meta = BOOK_INDEX[slug];
  if (!meta) return res.status(404).json({ error: `'${req.params.book}' not found in Ethiopian canon.` });
  res.json({ bookId: meta.fileId, title: meta.title, writer: meta.writer, totalChapters: meta.totalChapters, downloadLink: `/api/ethiopian/${slug}/download` });
});

app.get('/api/ethiopian/:book/:chapter', (req, res) => {
  const slug = req.params.book.toLowerCase().trim();
  const chapter = parseInt(req.params.chapter);
  const meta = BOOK_INDEX[slug];
  if (!meta) return res.status(404).json({ error: `'${req.params.book}' not found.` });
  const filePath = path.join(BIBLE_DIR, `${meta.fileId}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const ch = data.chapters.find(c => parseInt(c.number) === chapter);
    if (!ch) return res.status(404).json({ error: `Chapter ${chapter} not found in ${meta.title}.` });
    res.json({ book: meta.title, chapter, verses: ch.verses.map((text, i) => ({ verse: i + 1, text })) });
  } catch (e) {
    res.status(500).json({ error: 'Failed to read chapter.' });
  }
});

app.get('/api/ethiopian/:book/download', (req, res) => {
  const slug = req.params.book.toLowerCase().trim();
  const meta = BOOK_INDEX[slug];
  if (!meta) return res.status(404).json({ error: `'${req.params.book}' not found.` });
  const pdfPath = path.join(DOCS_DIR, 'ethiopian', `${slug}.pdf`);
  if (!fs.existsSync(pdfPath)) return res.status(404).json({ error: `PDF for ${meta.title} is unavailable.` });
  res.download(pdfPath, `${meta.fileId}_Scriptorium.pdf`);
});

// ── Verse lookup endpoint (for quick-look panel) ──
app.get('/api/verse/:bookId/:chapter/:verse', (req, res) => {
  const slug = req.params.bookId.toLowerCase().trim();
  const chapter = parseInt(req.params.chapter);
  const verse = parseInt(req.params.verse);
  const meta = BOOK_INDEX[slug];
  if (!meta) return res.status(404).json({ error: `'${req.params.bookId}' not found.` });
  const filePath = path.join(BIBLE_DIR, `${meta.fileId}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const ch = data.chapters.find(c => parseInt(c.number) === chapter);
    if (!ch) return res.status(404).json({ error: `Chapter ${chapter} not found in ${meta.title}.` });
    const v = ch.verses[verse - 1];
    if (!v) return res.status(404).json({ error: `Verse ${verse} not found in ${meta.title} ${chapter}.` });
    res.json({ book: meta.title, bookId: meta.fileId, chapter, verse, text: v, writer: meta.writer, era: meta.era });
  } catch (e) {
    res.status(500).json({ error: 'Failed to read verse.' });
  }
});

// ── In-memory search cache (built eagerly at startup) ──
let searchCache = [];
(function buildSearchCache() {
  const cache = [];
  try {
    const files = fs.readdirSync(BIBLE_DIR).filter(f => f.endsWith('.json'));
    for (let fi = 0; fi < files.length; fi++) {
      const fileId = path.basename(files[fi], '.json');
      const slug = fileId.toLowerCase();
      const meta = BOOK_INDEX[slug];
      if (!meta) continue;
      try {
        const data = JSON.parse(fs.readFileSync(path.join(BIBLE_DIR, files[fi]), 'utf8'));
        for (let c = 0; c < (data.chapters || []).length; c++) {
          const ch = data.chapters[c];
          for (let v = 0; v < (ch.verses || []).length; v++) {
            cache.push({
              bookId: fileId, book: meta.title, chapter: parseInt(ch.number), verse: v + 1,
              text: ch.verses[v], era: meta.era, deuterocanonical: meta.deuterocanonical
            });
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
  searchCache = cache;
})();

app.get('/api/search', (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase().trim();
    if (!q || q.length < 2) return res.json({ query: q, totalResults: 0, results: [] });
    const limit = Math.max(1, Math.min(parseInt(req.query.limit) || 50, 200));
    const testament = (req.query.testament || '').toLowerCase();
    const cache = searchCache;
    const results = [];
    for (let i = 0; i < cache.length && results.length < limit; i++) {
      const entry = cache[i];
      if (testament === 'ot' && entry.era !== 'ot') continue;
      if (testament === 'nt' && entry.era !== 'nt') continue;
      if (testament === 'ethiopian' && !entry.deuterocanonical) continue;
      if (entry.text.toLowerCase().includes(q)) {
        results.push({ book: entry.book, bookId: entry.bookId, chapter: entry.chapter, verse: entry.verse, text: entry.text.substring(0, 300), era: entry.era });
      }
    }
    res.json({ query: q, totalResults: results.length, testament: testament || 'all', results });
  } catch(e) {
    res.status(500).json({ error: 'Search failed.' });
  }
});

// ── Web Push endpoints ──
app.get('/api/push/vapid-key', (req, res) => {
  var key = push.getPublicKey();
  if (!key) return res.status(500).json({ error: 'VAPID keys not configured' });
  res.json({ publicKey: key });
});

app.post('/api/push/subscribe', (req, res) => {
  var sub = req.body;
  var ok = push.subscribe(sub);
  res.status(ok ? 200 : 400).json({ ok: ok, count: push.subscriptionCount() });
});

app.post('/api/push/unsubscribe', (req, res) => {
  var endpoint = req.body.endpoint;
  if (!endpoint) return res.status(400).json({ ok: false, error: 'endpoint required' });
  var ok = push.unsubscribe(endpoint);
  res.json({ ok: ok, count: push.subscriptionCount() });
});

// ── Cron: daily devotional push ──
app.post('/api/push/daily', async (req, res) => {
  var auth = req.headers['authorization'];
  if (auth !== 'Bearer ' + (process.env.CRON_SECRET || 'local-cron-secret')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  var verse = require('./daily-verse').getDailyVerse();
  if (!verse) return res.status(500).json({ error: 'No verse available' });
  var result = await push.sendDailyNotification('📖 Daily Verse', verse.ref + ' — ' + verse.text.substring(0, 120) + '…', '/scriptorium.html?book=' + encodeURIComponent(verse.book) + '&chapter=' + verse.chapter);
  res.json({ ok: true, sent: result.sent, failed: result.failed, subscriberCount: push.subscriptionCount() });
});

// ── Test-only admin seeding endpoint ──
if (process.env.NODE_ENV === 'test') {
  app.post('/api/test/setup-admin', async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: 'userId required' });
      const scribe = await db.findScribeByUserId(userId);
      if (!scribe) return res.status(404).json({ error: 'Scribe not found' });
      scribe.isAdmin = 1;
      await db.updateScribe(userId, { isAdmin: 1 });
      const token = jwt.sign({ userId: scribe.userId, name: scribe.name, rank: scribe.rank, isAdmin: 1, tradition: scribe.tradition || '' }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
      res.json({ message: 'Scribe promoted to admin', token });
    } catch(e) {
      res.status(500).json({ error: 'Error promoting to admin' });
    }
  });
}

module.exports = app;
