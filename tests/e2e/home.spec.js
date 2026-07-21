const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {

  test('loads with correct title and OG meta', async ({ page }) => {
    await page.goto('/scriptorium.html');
    await expect(page).toHaveTitle(/SCRIPTORIUM/);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image\.svg/);
  });

  test('sidebar is rendered with navigation links', async ({ page }) => {
    await page.goto('/scriptorium.html');
    const sidebar = page.locator('#sidebarContainer');
    await expect(sidebar).toBeAttached();
    await expect(sidebar.locator('a[title="THE THRESHOLD"]')).toBeAttached();
    await expect(sidebar.locator('a[title="COVENANT MAP"]')).toBeAttached();
    await expect(sidebar.locator('a[title="SIGN IN"]')).toBeAttached();
  });

  test('transition curtain exists in DOM', async ({ page }) => {
    await page.goto('/scriptorium.html');
    const curtain = page.locator('#narthex-transition-curtain');
    await expect(curtain).toBeAttached();
  });

  test('daily pericope section is present', async ({ page }) => {
    await page.goto('/scriptorium.html');
    await expect(page.locator('#dailyPericope')).toBeAttached();
  });

  test('OG meta tags exist for major pages', async ({ page }) => {
    test.setTimeout(60000);
    const pages = ['/ot-gallery.html', '/nt-gallery.html', '/map.html', '/register.html', '/login.html'];
    for (const url of pages) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute('content', /og-image\.svg/);
    }
  });

});
