const crypto = require('crypto');
const email = require('../email');
const db = require('../db');
const logger = require('../logger');
const { validate } = require('../validate');
const { appBase } = require('../email');

module.exports = function registerNewsletterRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware, adminMiddleware = ctx.adminMiddleware;

  app.post('/api/newsletter/subscribe', validate('newsletterSubscribe'), async (req, res) => {
    try {
      const emailAddr = req.validated.email.trim().toLowerCase();
      const existing = await db.findNewsletterSub(emailAddr);
      if (existing && existing.confirmed && !existing.unsubscribedAt) {
        return res.json({ message: 'You are already inscribed in the archive.' });
      }
      if (existing) {
        await db.updateNewsletterSub(emailAddr, { confirmed: true, confirmToken: null, unsubscribedAt: null, subscribedAt: existing.subscribedAt || new Date().toISOString() });
        await email.sendWelcomeEmail(emailAddr);
        return res.json({ message: 'Welcome back. Your place in the archive is secured.' });
      }
      await db.insertNewsletterSub({ email: emailAddr, subscribedAt: new Date().toISOString(), confirmed: true, confirmToken: null, preferences: { weeklyDigest: true, newFeatures: true, readingTips: false }, unsubscribedAt: null });
      await email.sendWelcomeEmail(emailAddr);
      res.json({ message: 'Inscribed. Watch for the gates to open.' });
    } catch(e) {
      logger.error({ err: e.message }, 'Subscribe error');
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });

  app.get('/api/newsletter/confirm', async (req, res) => {
    try {
      const token = req.query.token;
      if (!token) return res.redirect(302, appBase());
      const sub = await db.findNewsletterSubByConfirmToken(token);
      if (!sub) return res.redirect(302, appBase());
      await db.updateNewsletterSub(sub.email, { confirmed: true, confirmToken: null, confirmedAt: new Date().toISOString() });
      await email.sendWelcomeEmail(sub.email);
      res.send('<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Subscription Confirmed — Holy Scriptorium</title><style>body{margin:0;padding:0;background:#050505;color:#e0e0e0;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh}div{text-align:center;max-width:400px;padding:40px}h1{font-size:1.3rem;letter-spacing:6px;color:#d4af37;font-weight:400;margin:0 0 15px}p{font-size:0.95rem;color:rgba(255,255,255,0.4);line-height:1.6;margin:0}a{display:inline-block;margin-top:24px;padding:10px 24px;border:1px solid rgba(212,175,55,0.3);color:#d4af37;text-decoration:none;font-size:0.65rem;letter-spacing:3px}</style></head><body><div><h1>CONFIRMED</h1><p>Your subscription to the Holy Scriptorium Archive is now active. You will receive weekly digests, new text announcements, and reading plan updates.</p><a href="https://holyscriptorium.com">ENTER THE ARCHIVE</a></div></body></html>');
    } catch(e) {
      logger.error({ err: e.message }, 'Confirm error');
      res.status(500).send('An error occurred.');
    }
  });

  app.get('/api/newsletter/unsubscribe', async (req, res) => {
    try {
      const token = req.query.token;
      if (!token) return res.status(400).json({ error: 'Unsubscribe token is required.' });
      const sub = await db.findNewsletterSubByConfirmToken(token);
      if (!sub) return res.status(404).json({ error: 'Invalid unsubscribe token.' });
      await db.updateNewsletterSub(sub.email, { unsubscribedAt: new Date().toISOString(), confirmed: false });
      await email.sendUnsubscribeEmail(sub.email);
      res.json({ message: 'Unsubscribed successfully.' });
    } catch(e) {
      logger.error({ err: e.message }, 'Unsubscribe error');
      res.status(500).json({ error: 'An error occurred.' });
    }
  });

  app.get('/api/newsletter/subscribers', authMiddleware, adminMiddleware, async (req, res) => {
    const subs = await db.allNewsletterSubs();
    const confirmed = subs.filter(s => s.confirmed && !s.unsubscribedAt);
    res.json({ total: confirmed.length, subscribers: confirmed.map(function(s) { return { email: s.email, subscribedAt: s.subscribedAt, preferences: s.preferences }; }) });
  });
};
