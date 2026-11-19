// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Beklenen değer klasörden okunur: yeni klasör/görsel eklenince test de güncel kalır.
const root = path.join(__dirname, '..', 'assets', 'drawings');
const dirs = fs.existsSync(root) ? fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()) : [];
const images = dirs.flatMap((d) =>
  fs.readdirSync(path.join(root, d.name)).filter((f) => /\.(png|jpe?g|gif|webp|svg)$/.test(f)));

// Çizim yokken sayfa yayında değil (_config.yml exclude); çizim eklenince exclude satırı da silinmeli, yoksa bu testler düşer.
test.skip(images.length === 0, 'henüz çizim yok');

test('galeri: kategori sayısı klasör, görsel sayısı dosya sayısına eşit', async ({ page }) => {
  await page.goto('/drawings/');
  await expect(page.locator('#left h3.cat')).toHaveCount(dirs.length);
  await expect(page.locator('#left .gallery img')).toHaveCount(images.length);
});

test('kategori adı klasör adından gelir (- boşluğa dönüşür)', async ({ page }) => {
  await page.goto('/drawings/');
  for (const d of dirs) {
    await expect(page.locator('#left h3.cat', { hasText: d.name.replace(/-/g, ' ') })).toHaveCount(1);
  }
});

test('görseller yüklenir ve tıklanınca dosyanın kendisi açılır', async ({ page, request }) => {
  await page.goto('/drawings/');
  for (const img of await page.locator('#left .gallery img').all()) {
    await img.scrollIntoViewIfNeeded();
    // loading="lazy": kaydırınca yüklenmesi zaman alır, yüklenene kadar yokla
    await expect.poll(() => img.evaluate((i) => /** @type {HTMLImageElement} */ (i).naturalWidth)).toBeGreaterThan(0);
  }
  for (const href of await page.locator('#left .gallery a').evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
    expect((await request.get(String(href))).status()).toBe(200);
  }
});

test('ızgara birden fazla sütunlu', async ({ page }) => {
  await page.goto('/drawings/');
  const [a, b] = await page.locator('#left .gallery a').evaluateAll((as) => as.slice(0, 2).map((x) => x.getBoundingClientRect().top));
  expect(a).toBe(b);
});
