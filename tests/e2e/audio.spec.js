const { test, expect } = require('@playwright/test');

test.describe('Audio pipeline', () => {

  test('/api/audio/genesis/1 returns JSON', async ({ page }) => {
    const resp = await page.request.get('/api/audio/genesis/1');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(typeof body.available).toBe('boolean');
  });

  test('/api/audio/philemon/1 returns available false or valid', async ({ page }) => {
    const resp = await page.request.get('/api/audio/philemon/1');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(typeof body.available).toBe('boolean');
    if (body.available && body.url) {
      expect(typeof body.url).toBe('string');
    }
  });

  test('invalid chapter returns JSON', async ({ page }) => {
    const resp = await page.request.get('/api/audio/genesis/0');
    expect(resp.status()).toBe(400);
    const body = await resp.json();
    expect(body.error).toBeTruthy();
  });

  test('unknown book returns available false', async ({ page }) => {
    const resp = await page.request.get('/api/audio/nonexistent/1');
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.available).toBe(false);
  });

  test('scriptorium-audio.js defines core API', async ({ page }) => {
    await page.goto('/scriptorium.html');
    const hasAudio = await page.evaluate(() => {
      return typeof window.ScriptoriumAudio !== 'undefined'
        && typeof window.ScriptoriumAudio.init === 'function'
        && typeof window.ScriptoriumAudio.transitionTo === 'function'
        && typeof window.ScriptoriumAudio.playQuillScratch === 'function';
    });
    expect(hasAudio).toBe(true);
  });

  test('ot-gallery has narration button', async ({ page }) => {
    await page.goto('/ot-gallery.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#audioTrigger')).toBeAttached();
  });

  test('nt-gallery has narration button', async ({ page }) => {
    await page.goto('/nt-gallery.html', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#audioTrigger')).toBeAttached();
  });

});
