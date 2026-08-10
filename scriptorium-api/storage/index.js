let backend = null;
let usePg = false;
let useKv = false;
let useJsonFallback = false;

(async function init() {
  if (process.env.VERCEL) {
    try {
      const pg = require('./postgres');
      if (await pg.init()) { backend = pg; usePg = true; return; }
    } catch (e) {}
    try {
      const kv = require('./kv');
      if (kv.init()) { backend = kv; useKv = true; return; }
    } catch (e) {}
    useJsonFallback = true;
    backend = require('./kv');
    backend.init();
  } else {
    try {
      const sqlite = require('./sqlite');
      useJsonFallback = !sqlite.init();
      backend = sqlite;
    } catch (e) {
      useJsonFallback = true;
      backend = require('./kv');
    }
  }
})();

function proxy(method) {
  return function(...args) {
    if (!backend) throw new Error('Storage backend not initialized');
    return backend[method](...args);
  };
}

const METHODS = [
  'allScribes', 'countScribes', 'scribesWithPlanSubs', 'scribesWithChallengeSubs',
  'findScribeByUserId', 'findScribeByEmail', 'insertScribe', 'updateScribe',
  'countNewsletterSubs', 'countConfirmedNewsletterSubs',
  'allNewsletterSubs', 'findNewsletterSub', 'findNewsletterSubByConfirmToken', 'insertNewsletterSub', 'updateNewsletterSub', 'deleteNewsletterSub',
  'getBookmarks', 'addBookmark', 'removeBookmark', 'findBookmark',
  'logDailyReading', 'getReadingHistory', 'getStreak', 'getStreakDetails',
  'addPrayer', 'getPrayers', 'prayForPrayer',
  'addPlanComment', 'getPlanComments',
  'requestPartner', 'respondToPartner', 'getPartnerRequests', 'getPartnerShips'
];

const exported = {};
for (const m of METHODS) {
  exported[m] = proxy(m);
}

Object.defineProperty(exported, 'usePg', { get: () => usePg });
Object.defineProperty(exported, 'useKv', { get: () => useKv });
Object.defineProperty(exported, 'useJsonFallback', { get: () => useJsonFallback });

module.exports = exported;
