const { z } = require('zod');

const schemas = {
  register: z.object({
    email: z.string().email('Invalid email'),
    userId: z.string().min(3, 'userId must be 3+ characters').max(30).regex(/^[a-zA-Z0-9_-]+$/, 'userId must be alphanumeric'),
    name: z.string().min(1, 'Name is required').max(60),
    password: z.string().min(8, 'Password must be 8+ characters').max(128),
    tradition: z.string().max(40).optional().default('')
  }),

  login: z.object({
    userId: z.string().min(1, 'Scribe ID required'),
    password: z.string().min(1, 'Password required')
  }),

  forgotPassword: z.object({
    email: z.string().email('Invalid email')
  }),

  resetPassword: z.object({
    token: z.string().min(1, 'Token required'),
    password: z.string().min(8, 'Password must be 8+ characters').max(128)
  }),

  newsletterSubscribe: z.object({
    email: z.string().email('Invalid email'),
    name: z.string().max(100).optional().default('')
  }),

  planSubscribe: z.object({
    planId: z.string().min(1, 'planId required')
  }),

  planUnsubscribe: z.object({
    planId: z.string().min(1, 'planId required')
  }),

  challengeJoin: z.object({
    challengeId: z.string().min(1, 'challengeId required')
  }),

  challengeUnjoin: z.object({
    challengeId: z.string().min(1, 'challengeId required')
  }),

  completeDay: z.object({
    planId: z.string().optional(),
    challengeId: z.string().optional()
  }).refine(d => d.planId || d.challengeId, { message: 'planId or challengeId required' }),

  prayerSubmit: z.object({
    text: z.string().min(2, 'Prayer must be at least 2 characters').max(500, 'Prayer too long'),
    anonymous: z.boolean().optional().default(false)
  })
};

function validate(schemaName) {
  const schema = schemas[schemaName];
  if (!schema) throw new Error('Unknown schema: ' + schemaName);
  return function(req, res, next) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const msgs = (result.error.issues || result.error.errors || []).map(e => e.message).join('; ');
      return res.status(400).json({ error: msgs });
    }
    req.validated = result.data;
    next();
  };
}

module.exports = { validate, schemas };
