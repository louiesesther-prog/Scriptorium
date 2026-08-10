const db = require('../db');
const logger = require('../logger');
const { validate } = require('../validate');

module.exports = function registerReadingRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware;

  app.post('/api/reading/log', authMiddleware, validate('logReading'), async (req, res) => {
    try {
      const { bookId, chapter } = req.validated;
      const date = new Date().toISOString().split('T')[0];
      await db.logDailyReading(req.scribe.userId, date, bookId, chapter);
      const detail = await db.getStreakDetails(req.scribe.userId);
      res.json({ message: 'Reading logged.', date, streak: detail.streak, graceDays: detail.graceDays, withinGrace: detail.withinGrace });
    } catch(e) {
      logger.error({ err: e.message }, 'Error logging reading');
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
      logger.error({ err: e.message }, 'Error fetching history');
      res.status(500).json({ error: 'Error fetching history.' });
    }
  });

  app.get('/api/reading/streak', authMiddleware, async (req, res) => {
    try {
      const detail = await db.getStreakDetails(req.scribe.userId);
      res.json({ streak: detail.streak, graceDays: detail.graceDays, withinGrace: detail.withinGrace, prevStreak: detail.prevStreak, gap: detail.gap });
    } catch(e) {
      logger.error({ err: e.message }, 'Error fetching streak');
      res.status(500).json({ error: 'Error fetching streak.' });
    }
  });
};
