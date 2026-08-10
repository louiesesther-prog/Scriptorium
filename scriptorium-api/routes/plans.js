const db = require('../db');
const { getPlan, listPlans } = require('../plans-data');
const logger = require('../logger');
const { validate } = require('../validate');

module.exports = function registerPlanRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware, incrementStreak = ctx.incrementStreak;

  app.get('/api/plans', (req, res) => {
    const category = req.query.category || null;
    const tradition = req.query.tradition || null;
    res.json({ plans: listPlans(category, tradition) });
  });

  app.get('/api/traditions', (req, res) => {
    res.json({ traditions: require('../plans-data').TRADITIONS });
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
      logger.error({ err: e.message }, 'An error occurred');
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
      logger.error({ err: e.message }, 'An error occurred');
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
      logger.error({ err: e.message }, 'An error occurred');
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
      incrementStreak(sub);
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
      logger.error({ err: e.message }, 'An error occurred');
      res.status(500).json({ error: 'An error occurred.' });
    }
  });
};
