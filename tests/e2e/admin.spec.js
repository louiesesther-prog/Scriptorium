const { test, expect } = require('@playwright/test');
const crypto = require('crypto');

const uid = `e2e_admin_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

test.describe('Admin dashboard', () => {

  test('admin page loads with title and OG meta', async ({ page }) => {
    await page.goto('/admin.html', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Admin/i);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image\.svg/);
  });

  test('admin page has sidebar container', async ({ page }) => {
    await page.goto('/admin.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#sidebarContainer')).toBeAttached();
    await expect(page.locator('#statsArea')).toBeAttached();
  });

  test('/api/admin/stats returns 401 without token', async ({ page }) => {
    const resp = await page.request.get('/api/admin/stats');
    expect(resp.status()).toBe(401);
  });

  test('/api/admin/stats returns 403 for non-admin token', async ({ page }) => {
    const userUid = `e2e_na_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: userUid, name: 'Non Admin', password: 'Str0ng!Pass', email: `${userUid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();
    const resp = await page.request.get('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(403);
  });

  test('/api/admin/stats works for admin user', async ({ page }) => {
    const adminUid = `e2e_adm_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: adminUid, name: 'Test Admin', password: 'Str0ng!Pass', email: `${adminUid}@test.scriptorium.test` },
    });
    const { token: userToken } = await reg.json();

    const promote = await page.request.post('/api/test/setup-admin', {
      data: { userId: adminUid },
    });
    expect(promote.status()).toBe(200);
    const { token: adminToken } = await promote.json();

    const resp = await page.request.get('/api/admin/stats', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(typeof body.scribes).toBe('number');
    expect(typeof body.planSubscriptions).toBe('number');
  });

  test('/api/newsletter/subscribers returns subscribers for admin', async ({ page }) => {
    const adminUid = `e2e_nl_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: adminUid, name: 'NL Admin', password: 'Str0ng!Pass', email: `${adminUid}@test.scriptorium.test` },
    });
    const { token: userToken } = await reg.json();
    const promote = await page.request.post('/api/test/setup-admin', { data: { userId: adminUid } });
    const { token: adminToken } = await promote.json();

    const resp = await page.request.get('/api/newsletter/subscribers', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(Array.isArray(body.subscribers)).toBe(true);
    expect(typeof body.total).toBe('number');
  });

});
