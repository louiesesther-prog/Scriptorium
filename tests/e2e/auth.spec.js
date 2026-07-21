const { test, expect } = require('@playwright/test');
const crypto = require('crypto');

test.describe('Registration flow', () => {

  test('register page loads with form fields', async ({ page }) => {
    const uid = `e2e_ui_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    await page.goto('/register.html');
    await expect(page.locator('input#regUserId')).toBeVisible();
    await expect(page.locator('input#regPassword')).toBeVisible();
  });

  test('register via API creates a scribe', async ({ page }) => {
    const uid = `e2e_reg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const resp = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'E2E Scribe', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    expect(resp.status()).toBe(201);
    const body = await resp.json();
    expect(body.token).toBeTruthy();
  });

  test('duplicate registration returns 409', async ({ page }) => {
    const uid = `e2e_dup_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const payload = { userId: uid, name: 'E2E Scribe', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` };
    const r1 = await page.request.post('/api/auth/register', { data: payload });
    expect(r1.status()).toBe(201);
    const r2 = await page.request.post('/api/auth/register', { data: payload });
    expect(r2.status()).toBe(409);
  });

});

test.describe('Login flow', () => {

  test('login page loads with form', async ({ page }) => {
    await page.goto('/login.html');
    await expect(page.locator('input#loginId')).toBeVisible();
    await expect(page.locator('input#loginPass')).toBeVisible();
  });

  test('successful login via API', async ({ page }) => {
    const uid = `e2e_log_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'E2E Scribe', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const resp = await page.request.post('/api/auth/login', {
      data: { userId: uid, password: 'Str0ng!Pass' },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.token).toBeTruthy();
  });

  test('login with wrong password returns 401', async ({ page }) => {
    const uid = `e2e_wp_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'E2E Scribe', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const resp = await page.request.post('/api/auth/login', {
      data: { userId: uid, password: 'WrongPass1!' },
    });
    expect(resp.status()).toBe(401);
  });

  test('/api/auth/me returns user data with valid token', async ({ page }) => {
    const uid = `e2e_me1_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'E2E Scribe', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const login = await page.request.post('/api/auth/login', {
      data: { userId: uid, password: 'Str0ng!Pass' },
    });
    const { token } = await login.json();
    const me = await page.request.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(me.status()).toBe(200);
    const body = await me.json();
    expect(body.scribe.name).toBe('E2E Scribe');
  });

  test('/api/auth/me returns 401 without token', async ({ page }) => {
    const resp = await page.request.get('/api/auth/me');
    expect(resp.status()).toBe(401);
  });

});
