// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const MENU = ['/', '/projelerim/', '/yazilarim/', '/cizimlerim/', '/portfolyom/', '/hakkimda/'];

for (const url of MENU) {
  test(`${url}: 200, tek h1, doğru aktif menü, konsol hatası yok`, async ({ page }) => {
    /** @type {string[]} */
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));

    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#nav a.active')).toHaveCount(1);
    await expect(page.locator('#nav a.active')).toHaveAttribute('href', url);
    expect(errors).toEqual([]);
  });
}

// Liste sayfaları: öğe sayısı ve her bağlantının açılması
const count = (/** @type {string} */ d) => fs.readdirSync(path.join(__dirname, '..', d)).filter((f) => f.endsWith('.md')).length;
const LISTS = [
  ['/projelerim/', count('_projects')],
  ['/yazilarim/', count('_posts')],
];
for (const [url, count] of LISTS) {
  test(`${url}: ${count} öğe, hepsi açılır, detay sayfasında tek h1 ve menü aktif`, async ({ page, request }) => {
    await page.goto(String(url));
    const links = page.locator('#left .entry h2 a');
    await expect(links).toHaveCount(Number(count));
    for (const href of await links.evaluateAll((as) => as.map((a) => /** @type {HTMLAnchorElement} */ (a).getAttribute('href')))) {
      expect((await request.get(String(href))).status()).toBe(200);
    }
    await links.first().click();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#nav a.active')).toHaveAttribute('href', String(url));
  });
}

test('Portfolyom: tüm öğeler sayfada açık (tıklama gerekmez), bölümlü, görselli', async ({ page }) => {
  await page.goto('/portfolyom/');
  await expect(page.locator('#left .groupbody')).toHaveCount(count('_portfolio'));
  await expect(page.locator('#left a[href^="/portfolyom/"][href$="/"]')).toHaveCount(0); // ayrı detay sayfası yok
  expect(await page.locator('#left h3.group:visible').count()).toBeGreaterThanOrEqual(3);
  await expect(page.locator('#left .groupbody .pics img:visible').first()).toBeVisible();
  expect(await page.locator('#left .certs a:visible').count()).toBe(4);
  await expect(page.locator('h1')).toHaveCount(1);
  expect((await page.locator('h1').boundingBox())?.width).toBeLessThanOrEqual(2); // (zoom 1.25 ile 1px → 1.25) menü adını tekrarlayan başlık yalnızca ekran okuyucuya
});

test('Ana Sayfa son yazıları listeler', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('#left .entry').count()).toBeGreaterThan(0);
});

test('yazı sayfasında tarih gg.aa.yyyy biçiminde', async ({ page }) => {
  await page.goto('/yazilarim/');
  await page.locator('#left .entry h2 a').first().click();
  await expect(page.locator('#left .posted')).toHaveText(/^\d{2}\.\d{2}\.\d{4}$/);
});

test('olmayan adres: 404 durum kodu ve siteye uygun, iki dilli hata sayfası', async ({ page }) => {
  const res = await page.goto('/yok-boyle-bir-sayfa/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#nav')).toBeVisible();          // site iskeleti korunur
  await expect(page.locator('#left a[href="/"]:visible')).toHaveCount(1); // seçili dildeki ana sayfa bağlantısı
});
