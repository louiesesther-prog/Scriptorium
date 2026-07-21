const { test, expect } = require('@playwright/test');
const crypto = require('crypto');

test.describe('Plans & challenges', () => {

  test('plans page loads', async ({ page }) => {
    await page.goto('/plans.html', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/PLANS|SCRIPTORIUM/i);
  });

  test('challenges page loads', async ({ page }) => {
    await page.goto('/challenges.html', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/CHALLENGES|SCRIPTORIUM/i);
  });

  test('subscribe to a plan via API', async ({ page }) => {
    const uid = `e2e_pl_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Plan Tester', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    const resp = await page.request.post('/api/plans/subscribe', {
      data: { planId: 'genesis-30' },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.message).toContain('Subscribed');
  });

  test('complete a plan day via API', async ({ page }) => {
    const uid = `e2e_pd_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Plan Day', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    await page.request.post('/api/plans/subscribe', {
      data: { planId: 'genesis-30' },
      headers: { Authorization: `Bearer ${token}` },
    });

    const resp = await page.request.post('/api/plans/complete-day', {
      data: { planId: 'genesis-30' },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.message).toContain('completed');
    expect(body.subscription).toBeTruthy();
  });

  test('join a challenge via API', async ({ page }) => {
    const uid = `e2e_cj_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Challenge Tester', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    const challenges = await page.request.get('/api/challenges');
    const { challenges: list } = await challenges.json();
    if (!list || list.length === 0) {
      test.skip();
      return;
    }

    const resp = await page.request.post('/api/challenges/join', {
      data: { challengeId: list[0].id },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.message).toContain('Joined');
  });

  test('get plan progress via API', async ({ page }) => {
    const uid = `e2e_pp_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Progress', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    const resp = await page.request.get('/api/plans/my/progress', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(Array.isArray(body.subscriptions)).toBe(true);
  });

});
