const db = require('../db');
const logger = require('../logger');

module.exports = function registerAdminRoutes(app, ctx) {
  var authMiddleware = ctx.authMiddleware, adminMiddleware = ctx.adminMiddleware;

  app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      var totalScribes = await db.countScribes();
      var scribesWithPlans = await db.scribesWithPlanSubs();
      var totalPlanSubs = 0;
      var planSubCounts = {};
      for (var i = 0; i < scribesWithPlans.length; i++) {
        var subs = scribesWithPlans[i].planSubscriptions || [];
        totalPlanSubs += subs.length;
        for (var j = 0; j < subs.length; j++) {
          var pid = subs[j].planId;
          planSubCounts[pid] = (planSubCounts[pid] || 0) + 1;
        }
      }
      var scribesWithChallenges = await db.scribesWithChallengeSubs();
      var totalChallengeSubs = 0;
      for (var k = 0; k < scribesWithChallenges.length; k++) {
        totalChallengeSubs += (scribesWithChallenges[k].challengeSubscriptions || []).length;
      }
      var nlConfirmed = await db.countConfirmedNewsletterSubs();
      var nlTotal = await db.countNewsletterSubs();
      res.json({
        scribes: totalScribes,
        newsletterConfirmed: nlConfirmed,
        newsletterTotal: nlTotal,
        planSubscriptions: totalPlanSubs,
        planBreakdown: planSubCounts,
        challengeSubscriptions: totalChallengeSubs
      });
    } catch(e) {
      logger.error({ err: e.message }, 'Error fetching stats');
      res.status(500).json({ error: 'Error fetching stats.' });
    }
  });
};
