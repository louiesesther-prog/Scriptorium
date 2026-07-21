const logger = require('./logger');
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'log';
const RESEND_KEY = process.env.RESEND_API_KEY || '';
const FROM_ADDRESS = process.env.EMAIL_FROM || 'scriptorium@updates.scriptorium.app';

async function send(to, subject, html) {
  if (EMAIL_PROVIDER === 'resend' && RESEND_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + RESEND_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html })
      });
      return res.ok;
    } catch(e) { logger.error({ err: e.message }, 'Resend API error'); return false; }
  }
  logger.info({ to, subject }, 'Email logged (dev mode)');
  return true;
}

async function sendConfirmEmail(to, token, email) {
  const base = process.env.VERCEL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:5000';
  const link = base + '/api/newsletter/confirm?token=' + token;
  const unsubLink = base + '/api/newsletter/unsubscribe?email=' + encodeURIComponent(email);
  return send(to, 'Confirm your Scriptorium subscription',
    '<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e0e0e0;border:1px solid rgba(212,175,55,0.2)">' +
    '<h1 style="font-size:1.2rem;letter-spacing:4px;color:#d4af37;text-align:center;font-weight:400">SCRIPTORIUM</h1>' +
    '<p style="font-size:0.95rem;line-height:1.6;margin:20px 0">You have been enrolled as a subscriber to the Scriptorium Archive. To confirm your subscription and receive updates on new texts, discoveries, and reading plans, click the seal below.</p>' +
    '<div style="text-align:center;margin:30px 0"><a href="' + link + '" style="display:inline-block;padding:12px 28px;border:1px solid #d4af37;color:#d4af37;text-decoration:none;font-size:0.7rem;letter-spacing:3px">CONFIRM SUBSCRIPTION</a></div>' +
    '<p style="font-size:0.8rem;color:rgba(255,255,255,0.3);text-align:center">If you did not request this, no action is needed.</p>' +
    '<p style="font-size:0.7rem;color:rgba(255,255,255,0.1);text-align:center;margin-top:16px"><a href="' + unsubLink + '" style="color:rgba(255,255,255,0.1);text-decoration:none;">Unsubscribe</a></p>' +
    '<p style="font-size:0.75rem;color:rgba(255,255,255,0.15);text-align:center;margin-top:20px">Scriptorium &mdash; The Eternal Record of the Word</p></div>');
}

async function sendWelcomeEmail(to) {
  const base = process.env.VERCEL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:5000';
  const unsubLink = base + '/api/newsletter/unsubscribe?email=' + encodeURIComponent(to);
  return send(to, 'Welcome to the Scriptorium Archive',
    '<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e0e0e0;border:1px solid rgba(212,175,55,0.2)">' +
    '<h1 style="font-size:1.2rem;letter-spacing:4px;color:#d4af37;text-align:center;font-weight:400">SCRIPTORIUM</h1>' +
    '<p style="font-size:0.95rem;line-height:1.6;margin:20px 0">Your subscription is confirmed. You will now receive weekly digests, new text announcements, and reading plan reminders from the Scriptorium.</p>' +
    '<p style="font-size:0.85rem;color:rgba(255,255,255,0.4);line-height:1.5;margin:20px 0">To unsubscribe at any time, click the link below.</p>' +
    '<p style="text-align:center;margin:20px 0"><a href="' + unsubLink + '" style="color:rgba(255,255,255,0.15);text-decoration:none;font-size:0.7rem;letter-spacing:1px">UNSUBSCRIBE</a></p>' +
    '<p style="font-size:0.75rem;color:rgba(212,175,55,0.3);text-align:center;margin-top:30px">&ldquo;Let the wise hear and increase in learning.&rdquo; &mdash; Proverbs 1:5</p></div>');
}

async function sendUnsubscribeEmail(to) {
  return send(to, 'You have been unsubscribed from Scriptorium',
    '<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e0e0e0;border:1px solid rgba(212,175,55,0.2)">' +
    '<p style="font-size:0.95rem;line-height:1.6;margin:20px 0">You have been removed from the Scriptorium mailing list. No further emails will be sent.</p>' +
    '<p style="font-size:0.85rem;color:rgba(255,255,255,0.4);margin:20px 0">If this was a mistake, you can resubscribe at any time from the Scriptorium.</p></div>');
}

async function sendPasswordResetEmail(to, resetToken) {
  const base = process.env.VERCEL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:5000';
  const link = base + '/reset-password.html?token=' + resetToken;
  return send(to, 'Reset your Scriptorium Cipher Key',
    '<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e0e0e0;border:1px solid rgba(212,175,55,0.2)">' +
    '<h1 style="font-size:1.2rem;letter-spacing:4px;color:#d4af37;text-align:center;font-weight:400">SCRIPTORIUM</h1>' +
    '<p style="font-size:0.95rem;line-height:1.6;margin:20px 0">A request was made to forge a new Cipher Key for your Scriptorium account. Click the seal below to proceed.</p>' +
    '<div style="text-align:center;margin:30px 0"><a href="' + link + '" style="display:inline-block;padding:12px 28px;border:1px solid #d4af37;color:#d4af37;text-decoration:none;font-size:0.7rem;letter-spacing:3px">FORGE NEW CIPHER KEY</a></div>' +
    '<p style="font-size:0.8rem;color:rgba(255,255,255,0.3);text-align:center">This link expires in 1 hour. If you did not request this, ignore this email.</p>' +
    '<p style="font-size:0.75rem;color:rgba(212,175,55,0.3);text-align:center;margin-top:30px">Scriptorium &mdash; The Eternal Record of the Word</p></div>');
}

module.exports = { send, sendConfirmEmail, sendWelcomeEmail, sendUnsubscribeEmail, sendPasswordResetEmail };
