const db = require('../db');
const logger = require('../logger');
const { validate } = require('../validate');

module.exports = function registerBookmarkRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware;

  app.get('/api/bookmarks', authMiddleware, async (req, res) => {
    try {
      const bookmarks = await db.getBookmarks(req.scribe.userId);
      res.json({ bookmarks });
    } catch(e) {
      logger.error({ err: e.message }, 'Error fetching bookmarks');
      res.status(500).json({ error: 'Error fetching bookmarks.' });
    }
  });

  app.post('/api/bookmarks', authMiddleware, validate('addBookmark'), async (req, res) => {
    try {
      const { bookId, bookName, chapter, verse, text, color, note } = req.validated;
      const existing = await db.findBookmark(req.scribe.userId, bookId, chapter, verse);
      if (existing) return res.status(409).json({ error: 'Bookmark already exists for this verse.', bookmark: existing });
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
      await db.addBookmark({ id, userId: req.scribe.userId, bookId, bookName: bookName || '', chapter, verse, text: text || '', color: color || '#d4af37', note: note || '', timestamp: Date.now() });
      res.status(201).json({ message: 'Bookmark added.', id });
    } catch(e) {
      logger.error({ err: e.message }, 'Error adding bookmark');
      res.status(500).json({ error: 'Error adding bookmark.' });
    }
  });

  app.delete('/api/bookmarks/:id', authMiddleware, async (req, res) => {
    try {
      await db.removeBookmark(req.params.id, req.scribe.userId);
      res.json({ message: 'Bookmark removed.' });
    } catch(e) {
      logger.error({ err: e.message }, 'Error removing bookmark');
      res.status(500).json({ error: 'Error removing bookmark.' });
    }
  });
};
