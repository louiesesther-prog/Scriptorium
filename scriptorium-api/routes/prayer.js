const db = require('../db');
const logger = require('../logger');
const { validate } = require('../validate');

module.exports = function registerPrayerRoutes(app, ctx) {
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
      logger.error({ err: e.message }, 'An error occurred');
      res.status(500).json({ error: 'An error occurred.' });
    }
  });

  app.post('/api/prayer/:id/pray', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id < 1) return res.status(400).json({ error: 'Invalid prayer ID.' });
      const userId = req.scribe ? req.scribe.userId : 'anon_' + req.ip;
      const result = await db.prayForPrayer(id, userId);
      if (!result) return res.status(404).json({ error: 'Prayer not found.' });
      res.json({ prayer: { id: result.id, prayCount: result.prayCount, alreadyPrayed: !!result.alreadyPrayed } });
    } catch(e) {
      logger.error({ err: e.message }, 'An error occurred');
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
      logger.error({ err: e.message }, 'An error occurred');
      res.status(500).json({ error: 'An error occurred.' });
    }
  });
};
