// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Ana Sayfa: CV ve profil butonları, öne çıkan projeler', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.locator('#left .actions a:visible').evaluateAll((as) => as.map((a) => /** @type {HTMLAnchorElement} */ (a).getAttribute('href')));
  expect(hrefs).toEqual(expect.arrayContaining(['/assets/documents/cv-tr.pdf', '/assets/documents/cv-en.pdf']));
  expect(hrefs.some((h) => h?.includes('github.com'))).toBe(true);
  const dir = path.join(__dirname, '..', '_projects');
  const featured = fs.readdirSync(dir).filter((f) => /^featured: true$/m.test(fs.readFileSync(path.join(dir, f), 'utf8'))).length;
  await expect(page.locator('#left .entry:visible').filter({ has: page.locator('a[href^="/projects/"]') })).toHaveCount(featured);
});

test('sağ bar: e-posta etiketi dile göre çevrilir', async ({ browser }) => {
  for (const [locale, label] of [['tr-TR', 'E-posta'], ['en-US', 'Email']]) {
    const ctx = await browser.newContext({ locale });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('#links a[href^="mailto:"] span:visible')).toHaveText(label);
    await ctx.close();
  }
});

test('Çizimlerim henüz yayında değil: menüde, sitemap\'te yok, adres 404', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('#nav a[href="/drawings/"]')).toHaveCount(0);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/drawings/');
  expect((await request.get('/drawings/')).status()).toBe(404);
});

test('Ana Sayfa: başlıkta rol var, paylaşım görseli ve büyük kart etiketi basılır', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Gömülü Sistemler|Embedded Systems/);
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(og).toMatch(/\/assets\/img\/og-card\.png$/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  expect((await request.get('/assets/img/og-card.png')).status()).toBe(200);
});

test('"İçeriğe geç" bağlantısı odakta görünür ve içeriğe gider', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('a.skip');
  await expect(skip).toBeFocused();
  expect((await skip.boundingBox())?.y).toBeGreaterThanOrEqual(0);
  await skip.press('Enter');
  expect(new URL(page.url()).hash).toBe('#left');
});

test('Hakkımda: yalnızca temaya uyan fotoğraf indirilir', async ({ page }) => {
  /** @type {string[]} */
  const got = [];
  page.on('response', (r) => { if (/me-(light|dark)\.png/.test(r.url())) got.push(r.url()); });
  await page.goto('/about/');
  await page.waitForLoadState('networkidle');
  expect(got).toHaveLength(1);
});

test('Ana Sayfa: "açığım" kutusu _data/profile.yml open_to_work değerini izler', async ({ page }) => {
  const on = /^open_to_work:\s*true\s*$/m.test(fs.readFileSync(path.join(__dirname, '..', '_data', 'profile.yml'), 'utf8'));
  await page.goto('/');
  await expect(page.locator('#left .opennow')).toHaveCount(on ? 1 : 0);
  if (on) await expect(page.locator('#left .opennow a[href^="mailto:"]:visible')).toHaveCount(1);
});
