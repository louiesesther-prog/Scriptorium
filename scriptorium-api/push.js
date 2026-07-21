const webpush = require('web-push');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

var SUBSCRIPTIONS_PATH = path.join(__dirname, '..', 'data', 'push-subscriptions.json');
var subscriptions = [];

// VAPID keys — generate on first run, store for reuse
var VAPID_KEYS = null;
var KEYS_PATH = path.join(__dirname, '..', 'data', 'vapid-keys.json');

function loadOrGenerateKeys() {
  try {
    if (fs.existsSync(KEYS_PATH)) {
      VAPID_KEYS = JSON.parse(fs.readFileSync(KEYS_PATH, 'utf8'));
    }
  } catch(e) {}
  if (!VAPID_KEYS || !VAPID_KEYS.publicKey || !VAPID_KEYS.privateKey) {
    VAPID_KEYS = webpush.generateVAPIDKeys();
    try {
      ensureDir(); fs.writeFileSync(KEYS_PATH, JSON.stringify(VAPID_KEYS, null, 2));
    } catch(e) {}
  }
  return VAPID_KEYS;
}

function ensureDir() {
  var dir = path.dirname(SUBSCRIPTIONS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadSubscriptions() {
  try {
    if (fs.existsSync(SUBSCRIPTIONS_PATH)) {
      subscriptions = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_PATH, 'utf8'));
    }
  } catch(e) { subscriptions = []; }
}

function saveSubscriptions() {
  try {
    ensureDir();
    fs.writeFileSync(SUBSCRIPTIONS_PATH, JSON.stringify(subscriptions, null, 2));
  } catch(e) {}
}

var keys = loadOrGenerateKeys();
webpush.setVapidDetails(
  'mailto:scriptorium@scriptorium.app',
  keys.publicKey,
  keys.privateKey
);
loadSubscriptions();

function subscribe(sub) {
  if (!sub || !sub.endpoint) return false;
  var exists = subscriptions.some(function(s) { return s.endpoint === sub.endpoint; });
  if (!exists) { subscriptions.push(sub); saveSubscriptions(); }
  return true;
}

function unsubscribe(endpoint) {
  var len = subscriptions.length;
  subscriptions = subscriptions.filter(function(s) { return s.endpoint !== endpoint; });
  if (subscriptions.length !== len) saveSubscriptions();
  return subscriptions.length !== len;
}

async function sendDailyNotification(title, body, url) {
  var results = { sent: 0, failed: 0, errors: [] };
  var payload = JSON.stringify({ title: title, body: body, url: url || '/' });
  var valid = [];
  for (var i = 0; i < subscriptions.length; i++) {
    try {
      await webpush.sendNotification(subscriptions[i], payload);
      results.sent++;
      valid.push(subscriptions[i]);
    } catch (e) {
      if (e.statusCode === 410 || e.statusCode === 404) {
        // Subscription expired or gone — skip it
      } else {
        results.errors.push(e.message);
        valid.push(subscriptions[i]);
      }
    }
  }
  subscriptions = valid;
  saveSubscriptions();
  return results;
}

module.exports = {
  getPublicKey: function() { return VAPID_KEYS ? VAPID_KEYS.publicKey : null; },
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  sendDailyNotification: sendDailyNotification,
  subscriptionCount: function() { return subscriptions.length; }
};
