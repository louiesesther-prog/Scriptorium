const { test, expect } = require('@playwright/test');

test.describe('OT / NT galleries', () => {

  test('OT gallery loads book list from API', async ({ page }) => {
    const resp = await page.request.get('/api/ot');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.books.length).toBeGreaterThanOrEqual(39);
    expect(body.books[0].title).toBeTruthy();
  });

  test('OT gallery serves Genesis 1', async ({ page }) => {
    const resp = await page.request.get('/api/ot/genesis/1');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.verses).toBeTruthy();
    expect(body.verses.length).toBeGreaterThan(0);
  });

  test('NT gallery loads 27 books from API', async ({ page }) => {
    const resp = await page.request.get('/api/nt');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.books.length).toBeGreaterThanOrEqual(27);
  });

  test('NT gallery serves John 3', async ({ page }) => {
    const resp = await page.request.get('/api/nt/john/3');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.verses).toBeTruthy();
    const verse16 = body.verses.find(v => v.verse === 16);
    expect(verse16).toBeTruthy();
    expect(verse16.text).toContain('world');
  });

  test('OT gallery HTML page renders', async ({ page }) => {
    await page.goto('/ot-gallery.html');
    await expect(page).toHaveTitle(/SCRIPTORIUM/);
    await expect(page.locator('#sidebarContainer')).toBeAttached();
  });

  test('NT gallery HTML page renders', async ({ page }) => {
    await page.goto('/nt-gallery.html');
    await expect(page).toHaveTitle(/SCRIPTORIUM/);
  });

});

test.describe('Search', () => {

  test('search returns results for "faith"', async ({ page }) => {
    const resp = await page.request.get('/api/search?q=faith&limit=5');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.totalResults).toBeGreaterThan(0);
  });

  test('search with short query returns empty', async ({ page }) => {
    const resp = await page.request.get('/api/search?q=a');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.totalResults).toBe(0);
  });

});

test.describe('Reading plans', () => {

  test('plans API returns plan list', async ({ page }) => {
    const resp = await page.request.get('/api/plans');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.plans.length).toBeGreaterThan(0);
  });

});

test.describe('Challenges', () => {

  test('challenges API returns challenge list', async ({ page }) => {
    const resp = await page.request.get('/api/challenges');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.challenges.length).toBeGreaterThan(0);
  });

});

test.describe('Ethiopian canon', () => {

  test('API returns ethiopian books', async ({ page }) => {
    const resp = await page.request.get('/api/ethiopian');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.books.length).toBeGreaterThan(0);
  });

});

test.describe('Traditions', () => {

  test('API returns tradition streams', async ({ page }) => {
    const resp = await page.request.get('/api/traditions');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.traditions.length).toBeGreaterThanOrEqual(7);
  });

});
