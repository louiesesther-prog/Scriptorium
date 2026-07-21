const { test, expect } = require('@playwright/test');

const PAGES = [
  { url: '/ethiopian-canon.html', title: /TEWAHEDO ARCHIVE|COMPENDIUM|SCRIPTORIUM/i },
  { url: '/covenant-map.html', title: /Covenant Map|SCRIPTORIUM/i },
  { url: '/genealogy.html', title: /Ancestral Scroll|SCRIPTORIUM/i },
  { url: '/tabernacle.html', title: /Tabernacle|SCRIPTORIUM/i },
  { url: '/typology.html', title: /Typology|SCRIPTORIUM/i },
  { url: '/onomasticon.html', title: /Onomasticon|SCRIPTORIUM/i },
  { url: '/comparison-mode.html', title: /Scriptorium|Side-by-Side/i },
  { url: '/scribes-chamber.html', title: /Scribe.s Chamber|SCRIPTORIUM/i },
  { url: '/paleo-epigraphy.html', title: /Paleo-Epigraphy|SCRIPTORIUM/i },
  { url: '/induction.html', title: /Induction|SCRIPTORIUM/i },
  { url: '/index.html', title: /SCRIPTORIUM/i },
  { url: '/reset-password.html', title: /Reset Cipher|Scriptorium/i },
  { url: '/narthex.html', title: /THE NARTHEX|SCRIPTORIUM/i },
  { url: '/sanctum-3d.html', title: /3D SANCTUM|SCRIPTORIUM/i },
  { url: '/archive.html', title: /THE ARCHIVE|SCRIPTORIUM/i },
  { url: '/prophetic-mesh.html', title: /PROPHETIC MESH|SCRIPTORIUM/i },
];

const REDIRECT_PAGES = [
  { url: '/placeholder.html', title: /THE ARCHIVE|SCRIPTORIUM|PLACEHOLDER/i },
];

for (const { url, title } of PAGES) {
  test(`${url} loads with correct title`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page).toHaveTitle(title);
  });

  test(`${url} has OG meta tags`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image/);
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toBeAttached();
  });
}

for (const { url, title } of REDIRECT_PAGES) {
  test(`${url} redirects correctly`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await expect(page).toHaveTitle(title);
  });
}
