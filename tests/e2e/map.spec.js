const { test, expect } = require('@playwright/test');

test.describe('MAP page', () => {

  test('map.html loads with correct title and OG meta', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Scriptorium|Biblical Navigator/i);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image/);
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toBeAttached();
  });

  test('MAP page has journey select dropdown', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const select = page.locator('#journey-select, select[id*="journey"], .journey-select');
    await expect(select).toBeAttached();
  });

  test('map-data.js defines JOURNEYS with 20+ entries', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const count = await page.evaluate(() => {
      if (typeof JOURNEYS !== 'undefined') return Object.keys(JOURNEYS).length;
      return 0;
    });
    expect(count).toBeGreaterThanOrEqual(20);
  });

  test('map-data.js defines PLACES with 25+ entries', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const count = await page.evaluate(() => {
      if (typeof PLACES !== 'undefined') return PLACES.length;
      return 0;
    });
    expect(count).toBeGreaterThanOrEqual(25);
  });

  test('map-data.js defines ARCHAEOLOGY_VAULT with artifacts', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const count = await page.evaluate(() => {
      if (typeof ARCHAEOLOGY_VAULT !== 'undefined') return Object.keys(ARCHAEOLOGY_VAULT).length;
      return 0;
    });
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('map-data.js defines calcDistance function', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(() => {
      if (typeof calcDistance !== 'function') return null;
      const d = calcDistance(31.768, 35.214, 32.585, 35.185);
      return typeof d === 'number' && d > 0;
    });
    expect(result).toBe(true);
  });

  test('map-data.js defines getPeopleWhoLived helper', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(() => {
      if (typeof getPeopleWhoLived !== 'function') return null;
      return getPeopleWhoLived('Jerusalem');
    });
    expect(result).toBeTruthy();
  });

  test('map-data.js defines JOURNEYS with Abraham path', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const stops = await page.evaluate(() => {
      if (typeof JOURNEYS === 'undefined' || !JOURNEYS.abraham) return null;
      return JOURNEYS.abraham.path.map(s => s.name);
    });
    expect(stops).toContain('Ur');
    expect(stops).toContain('Haran');
  });

  test('MAP page has leaflet markers container', async ({ page }) => {
    await page.goto('/map.html', { waitUntil: 'domcontentloaded' });
    const map = page.locator('#map, .leaflet-container, [class*="map"]');
    await expect(map.first()).toBeAttached({ timeout: 10000 });
  });

});
