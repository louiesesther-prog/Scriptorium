const { test, expect } = require('@playwright/test');
const crypto = require('crypto');

test.describe('API edge cases', () => {

  test('GET /api/ot/nonexistent returns 404', async ({ page }) => {
    const resp = await page.request.get('/api/ot/nonexistentbook');
    expect(resp.status()).toBe(404);
  });

  test('GET /api/ot/psalms/23 returns shepherds', async ({ page }) => {
    const resp = await page.request.get('/api/ot/psalms/23');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    const allText = JSON.stringify(body).toLowerCase();
    expect(allText).toContain('shepherd');
  });

  test('GET /api/nt/matthew/5 contains beatitudes', async ({ page }) => {
    const resp = await page.request.get('/api/nt/matthew/5');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    const allText = JSON.stringify(body).toLowerCase();
    expect(allText).toContain('blessed');
  });

  test('search with testament=ot filters correctly', async ({ page }) => {
    const resp = await page.request.get('/api/search?q=Moses&testament=ot');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.totalResults).toBeGreaterThan(0);
  });

  test('search with testament=nt filters correctly', async ({ page }) => {
    const resp = await page.request.get('/api/search?q=Jesus&testament=nt');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.totalResults).toBeGreaterThan(0);
  });

  test('GET /api/ethiopian/enoch returns metadata', async ({ page }) => {
    const resp = await page.request.get('/api/ethiopian/enoch');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.bookId || body.title || body.name).toBeTruthy();
  });

  test('register with missing fields returns 400', async ({ page }) => {
    const resp = await page.request.post('/api/auth/register', {
      data: { userId: '' },
    });
    expect(resp.status()).toBe(400);
  });

  test('GET /api/reading/streak returns 401 without token', async ({ page }) => {
    const resp = await page.request.get('/api/reading/streak');
    expect(resp.status()).toBe(401);
  });

  test('GET /api/plans/my/progress returns 401 without token', async ({ page }) => {
    const resp = await page.request.get('/api/plans/my/progress');
    expect(resp.status()).toBe(401);
  });

  test('GET /api/challenges/my/progress returns 401 without token', async ({ page }) => {
    const resp = await page.request.get('/api/challenges/my/progress');
    expect(resp.status()).toBe(401);
  });

  test('newsletter POST accepts email', async ({ page }) => {
    const resp = await page.request.post('/api/newsletter/subscribe', {
      data: { email: `e2e_${Date.now()}@test.scriptorium.test` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.message || body.subscribed).toBeTruthy();
  });

  test('POST /api/newsletter/subscribe returns 400 for bad email', async ({ page }) => {
    const resp = await page.request.post('/api/newsletter/subscribe', {
      data: { email: 'not-an-email' },
    });
    expect(resp.status()).toBe(400);
  });

  test('invalid token returns 401 for /api/auth/me', async ({ page }) => {
    const resp = await page.request.get('/api/auth/me', {
      headers: { Authorization: 'Bearer invalidtoken123' },
    });
    expect(resp.status()).toBe(401);
  });

  test('login returns isAdmin field', async ({ page }) => {
    const uid = `e2e_adm_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Admin Tester', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const login = await page.request.post('/api/auth/login', {
      data: { userId: uid, password: 'Str0ng!Pass' },
    });
    expect(login.status()).toBe(200);
    const body = await login.json();
    expect(body.token).toBeTruthy();
    const payload = JSON.parse(atob(body.token.split('.')[1]));
    expect(typeof payload.isAdmin).toBe('number');
  });

});
