const db = require('../db');
const logger = require('../logger');
const { validate } = require('../validate');

module.exports = function registerPartnerRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware;

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
    } catch(e) { logger.error({ err: e.message }, 'Search failed'); res.status(500).json({ error: 'Search failed.' }); }
  });

  app.post('/api/partners/request', authMiddleware, validate('partnerRequest'), async (req, res) => {
    try {
      const { targetId, planId } = req.validated;
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
    } catch(e) { logger.error({ err: e.message }, 'Request failed'); res.status(500).json({ error: 'Request failed.' }); }
  });

  app.post('/api/partners/respond', authMiddleware, validate('partnerRespond'), async (req, res) => {
    try {
      const { id, status } = req.validated;
      const request = await db.respondToPartner(id, status);
      if (!request) return res.status(404).json({ error: 'Request not found.' });
      if (request.targetId !== req.scribe.userId) return res.status(403).json({ error: 'Not your request to respond to.' });
      res.json({ request: { id: request.id, status: request.status, respondedAt: request.respondedAt } });
    } catch(e) { logger.error({ err: e.message }, 'Response failed'); res.status(500).json({ error: 'Response failed.' }); }
  });

  app.get('/api/partners/requests', authMiddleware, async (req, res) => {
    try {
      const requests = await db.getPartnerRequests(req.scribe.userId);
      res.json({ requests: requests.map(function(r) { return { id: r.id, requesterId: r.requesterId, planId: r.planId, status: r.status, createdAt: r.createdAt }; }) });
    } catch(e) { logger.error({ err: e.message }, 'Failed to fetch requests'); res.status(500).json({ error: 'Failed to fetch requests.' }); }
  });

  app.get('/api/partners/ships', authMiddleware, async (req, res) => {
    try {
      const ships = await db.getPartnerShips(req.scribe.userId);
      res.json({ partnerships: ships.map(function(s) { return { id: s.id, requesterId: s.requesterId, targetId: s.targetId, planId: s.planId, status: s.status, createdAt: s.createdAt }; }) });
    } catch(e) { logger.error({ err: e.message }, 'Failed to fetch partnerships'); res.status(500).json({ error: 'Failed to fetch partnerships.' }); }
  });

  app.get('/api/partners/progress/:userId', authMiddleware, async (req, res) => {
    try {
      const target = await db.findScribeByUserId(req.params.userId);
      if (!target) return res.status(404).json({ error: 'Scribe not found.' });
      res.json({ progress: target.readingProgress || target.planSubscriptions || [] });
    } catch(e) { logger.error({ err: e.message }, 'Failed to fetch progress'); res.status(500).json({ error: 'Failed to fetch progress.' }); }
  });
};
