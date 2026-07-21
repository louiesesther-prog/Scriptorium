const { test, expect } = require('@playwright/test');
const crypto = require('crypto');

test.describe('Features & API', () => {

  test('daily verse endpoint returns data', async ({ page }) => {
    const resp = await page.request.get('/api/daily-verse');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.verse || body.text || body.reference).toBeTruthy();
  });

  test('cross-references endpoint returns data', async ({ page }) => {
    const resp = await page.request.get('/api/cross-references/Genesis/1');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.book).toBe('Genesis');
    expect(typeof body.total).toBe('number');
  });

  test('bookmarks CRUD works with auth', async ({ page }) => {
    const uid = `e2e_bm_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'BM Tester', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    // Create
    const create = await page.request.post('/api/bookmarks', {
      data: { bookId: 'GENESIS', bookName: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning...' },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(create.status()).toBe(201);
    const { id } = await create.json();

    // List
    const list = await page.request.get('/api/bookmarks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(list.status()).toBe(200);
    const listBody = await list.json();
    expect(listBody.bookmarks.length).toBeGreaterThan(0);

    // Delete
    if (id) {
      const del = await page.request.delete(`/api/bookmarks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(del.status()).toBe(200);
    }
  });

  test('traditions API has at least 7 streams', async ({ page }) => {
    const resp = await page.request.get('/api/traditions');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.traditions.length).toBeGreaterThanOrEqual(7);
  });

  test('update tradition without auth returns 401', async ({ page }) => {
    const resp = await page.request.put('/api/auth/tradition', {
      data: { tradition: 'reformed' },
    });
    expect(resp.status()).toBe(401);
  });

  test('update tradition with auth works', async ({ page }) => {
    const uid = `e2e_tr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Trad Tester', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    const resp = await page.request.put('/api/auth/tradition', {
      data: { tradition: 'reformed' },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.tradition).toBe('reformed');
  });

  test('reading streak endpoints work with auth', async ({ page }) => {
    const uid = `e2e_rs_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const reg = await page.request.post('/api/auth/register', {
      data: { userId: uid, name: 'Streak Tester', password: 'Str0ng!Pass', email: `${uid}@test.scriptorium.test` },
    });
    const { token } = await reg.json();

    const log = await page.request.post('/api/reading/log', {
      data: { bookId: 'GENESIS', chapter: 1 },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(log.status()).toBe(200);

    const streak = await page.request.get('/api/reading/streak', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(streak.status()).toBe(200);
    const body = await streak.json();
    expect(typeof body.streak).toBe('number');
  });

  test('prayer wall endpoints work', async ({ page }) => {
    const submit = await page.request.post('/api/prayer', {
      data: { text: 'Test prayer for E2E', anonymous: false },
    });
    expect(submit.status()).toBe(201);

    const list = await page.request.get('/api/prayer?limit=5');
    expect(list.status()).toBe(200);
    const body = await list.json();
    expect(Array.isArray(body.prayers)).toBe(true);
  });

});
