const db = require('../db');
const { listChallenges, getChallenge, getCurrentChallenge } = require('../challenges-data');
const logger = require('../logger');
const { validate } = require('../validate');

function getChallengeDayReading(challenge, dayIndex) {
  if (!challenge || dayIndex >= challenge.totalDays) return '';
  var startCh = (dayIndex * challenge.chaptersPerDay) + 1;
  var endCh = Math.min(startCh + challenge.chaptersPerDay - 1, challenge.totalChapters);
  if (startCh > challenge.totalChapters) return '';
  if (startCh === endCh) return challenge.book + ' ' + startCh;
  return challenge.book + ' ' + startCh + '-' + endCh;
}

module.exports = function registerChallengeRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware, incrementStreak = ctx.incrementStreak;

  app.get('/api/challenges', (req, res) => {
    try {
      var all = listChallenges();
      res.json({ challenges: all });
    } catch(e) {
      logger.error({ err: e.message }, 'Error retrieving challenges');
      res.status(500).json({ error: 'Error retrieving challenges.' });
    }
  });

  app.get('/api/challenges/current', (req, res) => {
    try {
      var c = getCurrentChallenge();
      if (!c) return res.status(404).json({ error: 'No current challenge.' });
      res.json({ challenge: c });
    } catch(e) {
      logger.error({ err: e.message }, 'Error retrieving current challenge');
      res.status(500).json({ error: 'Error retrieving current challenge.' });
    }
  });

  app.get('/api/challenges/:id', (req, res) => {
    try {
      var c = getChallenge(req.params.id);
      if (!c) return res.status(404).json({ error: 'Challenge not found.' });
      res.json({ challenge: c });
    } catch(e) {
      logger.error({ err: e.message }, 'Error retrieving challenge');
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
        challengeId: challengeId, book: challenge.book, monthName: challenge.monthName,
        joinedAt: new Date().toISOString(), completedDays: [], currentDay: 0,
        streak: 0, lastActiveDay: null, completedAt: null, progress: 0
      };
      scribe.challengeSubscriptions.push(sub);
      await db.updateScribe(req.scribe.userId, { challengeSubscriptions: scribe.challengeSubscriptions });
      res.json({ message: 'Joined the ' + challenge.book + ' challenge.', subscription: sub });
    } catch(e) {
      logger.error({ err: e.message }, 'An error occurred');
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
      logger.error({ err: e.message }, 'An error occurred');
      res.status(500).json({ error: 'An error occurred.' });
    }
  });

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
      logger.error({ err: e.message }, 'An error occurred');
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
      incrementStreak(sub);
      if (sub.currentDay >= challenge.totalDays) sub.completedAt = new Date().toISOString();
      scribe.totalCharacters = (scribe.totalCharacters || 0) + 50;
      scribe.versesCompleted = (scribe.versesCompleted || 0) + 1;
      sub.progress = Math.round((sub.completedDays.length / challenge.totalDays) * 100);
      sub.currentReading = sub.completedAt ? '' : getChallengeDayReading(challenge, sub.currentDay);
      await db.updateScribe(req.scribe.userId, { challengeSubscriptions: scribe.challengeSubscriptions, totalCharacters: scribe.totalCharacters, versesCompleted: scribe.versesCompleted });
      res.json({ message: 'Day ' + (dayIndex + 1) + ' of the ' + challenge.book + ' challenge completed.', subscription: sub });
    } catch(e) {
      logger.error({ err: e.message }, 'An error occurred');
      res.status(500).json({ error: 'An error occurred.' });
    }
  });
};
