const jwt = require('jsonwebtoken');
const logger = require('../logger');
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized. A valid token is required.' });
  try {
    const decoded = jwt.verify(header.slice(7), JWT_SECRET);
    req.scribe = decoded;
    next();
  } catch(e) {
    logger.error({ err: e.message }, 'Token verification failed');
    return res.status(401).json({ error: 'Token expired or invalid.' });
  }
}

function adminMiddleware(req, res, next) {
  if (!req.scribe || !req.scribe.isAdmin) {
    return res.status(403).json({ error: 'Forbidden. Only custodians may access this archive.' });
  }
  next();
}

function incrementStreak(sub) {
  var today = new Date().toDateString();
  if (sub.lastActiveDay === today) {
    sub.streak = (sub.streak || 0);
  } else if (sub.lastActiveDay && new Date(sub.lastActiveDay).toDateString() === new Date(Date.now() - 86400000).toDateString()) {
    sub.streak = (sub.streak || 0) + 1;
  } else {
    sub.streak = 1;
  }
  sub.lastActiveDay = today;
}

module.exports = { authMiddleware, adminMiddleware, incrementStreak };
