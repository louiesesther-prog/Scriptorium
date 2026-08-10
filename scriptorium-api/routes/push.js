const push = require('../push');
const logger = require('../logger');

module.exports = function registerPushRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware;

  app.get('/api/push/vapid-key', (req, res) => {
    var key = push.getPublicKey();
    if (!key) return res.status(500).json({ error: 'VAPID keys not configured' });
    res.json({ publicKey: key });
  });

  app.post('/api/push/subscribe', authMiddleware, (req, res) => {
    var sub = req.body;
    if (!sub || !sub.endpoint) return res.status(400).json({ ok: false, error: 'Subscription endpoint required' });
    var ok = push.subscribe(sub);
    res.status(ok ? 200 : 400).json({ ok: ok, count: push.subscriptionCount() });
  });

  app.post('/api/push/unsubscribe', authMiddleware, (req, res) => {
    var endpoint = req.body.endpoint;
    if (!endpoint) return res.status(400).json({ ok: false, error: 'endpoint required' });
    var ok = push.unsubscribe(endpoint);
    res.json({ ok: ok, count: push.subscriptionCount() });
  });

  app.post('/api/push/daily', async (req, res) => {
    var auth = req.headers['authorization'];
    if (!process.env.CRON_SECRET) { logger.error('CRON_SECRET not configured'); return res.status(500).json({ error: 'CRON_SECRET not configured' }); }
    if (auth !== 'Bearer ' + process.env.CRON_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    var verse = require('../daily-verse').getDailyVerse();
    if (!verse) return res.status(500).json({ error: 'No verse available' });
    var result = await push.sendDailyNotification('📖 Daily Verse', verse.ref + ' — ' + verse.text.substring(0, 120) + '…', '/scriptorium.html?book=' + encodeURIComponent(verse.book) + '&chapter=' + verse.chapter);
    res.json({ ok: true, sent: result.sent, failed: result.failed, subscriberCount: push.subscriptionCount() });
  });
};
