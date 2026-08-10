const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const email = require('../email');
const db = require('../db');
const logger = require('../logger');
const { validate } = require('../validate');

module.exports = function registerAuthRoutes(app, ctx) {
  var JWT_SECRET = ctx.JWT_SECRET, JWT_EXPIRY = ctx.JWT_EXPIRY;
  var authMiddleware = ctx.authMiddleware;

  app.get('/api/auth/check-userId', async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId || !/^[a-zA-Z0-9_]{3,30}$/.test(userId)) return res.status(400).json({ error: 'Invalid User ID format.' });
      const exists = !!(await db.findScribeByUserId(userId));
      res.json({ available: !exists });
    } catch(e) {
      logger.error({ err: e.message }, 'Error checking userId');
      res.status(500).json({ error: 'Internal error.' });
    }
  });

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
      logger.error({ err: e.message }, 'Error during induction');
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
      logger.error({ err: e.message }, 'Error during authentication');
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
      logger.error({ err: e.message }, 'Error updating tradition');
      res.status(500).json({ error: 'Error updating tradition.' });
    }
  });

  app.post('/api/auth/achievements', authMiddleware, async (req, res) => {
    try {
      const { badges, xp, rank } = req.body;
      if (rank) await db.updateScribe(req.scribe.userId, { rank: String(rank).slice(0, 40) });
      res.json({ message: 'Achievements synced.' });
    } catch(e) {
      logger.error({ err: e.message }, 'Error syncing achievements');
      res.status(500).json({ error: 'Error syncing achievements.' });
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
      logger.error({ err: e.message }, 'Internal error');
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
      logger.error({ err: e.message }, 'Internal error');
      res.status(500).json({ error: 'Internal error.' });
    }
  });
};
