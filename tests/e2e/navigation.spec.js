const { test, expect } = require('@playwright/test');

test.describe('Navigation & sidebar', () => {

  const NAV_PAGES = [
    { url: '/scriptorium.html', title: /SCRIPTORIUM/, link: 'scriptorium.html' },
    { url: '/ot-gallery.html', title: /SCRIPTORIUM/, link: 'ot-gallery.html' },
    { url: '/nt-gallery.html', title: /SCRIPTORIUM/, link: 'nt-gallery.html' },
    { url: '/register.html', title: /SCRIPTORIUM/ },
    { url: '/login.html', title: /SCRIPTORIUM/ },
    { url: '/map.html', title: /MAP|SCRIPTORIUM/i },
    { url: '/plans.html', title: /PLANS|SCRIPTORIUM/i },
    { url: '/challenges.html', title: /CHALLENGES|SCRIPTORIUM/i },
    { url: '/settings.html', title: /SETTINGS|SCRIPTORIUM/i },
  ];

  for (const { url, title } of NAV_PAGES) {
    test(`${url} loads with correct title`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveTitle(title);
    });
  }

  test('sidebar has nav link to all major pages', async ({ page }) => {
    await page.goto('/scriptorium.html');
    const sidebar = page.locator('#sidebarContainer');
    await expect(sidebar).toBeAttached();
    const links = [
      'THE THRESHOLD', 'COVENANT MAP', 'GENEALOGY', 'TABERNACLE',
      'TYPOLOGY', 'ONOMASTICON', 'TEWAHEDO ARCHIVE',
      'SCRIBES CHAMBER', 'READING PLANS', 'MONTHLY CHALLENGES',
      'COMPARISON MODE', 'RESTORATION ROOM', 'SIGN IN',
    ];
    for (const title of links) {
      await expect(sidebar.locator(`a[title="${title}"]`).first()).toBeAttached();
    }
  });

  test('sidebar has search trigger', async ({ page }) => {
    await page.goto('/scriptorium.html');
    const sidebar = page.locator('#sidebarContainer');
    const searchLink = sidebar.locator('a[title="SEARCH SCRIPTURES"]');
    await expect(searchLink).toBeAttached();
  });

});
