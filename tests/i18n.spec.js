// @ts-check
const { test, expect } = require('@playwright/test');

const firstNav = (/** @type {import('@playwright/test').Page} */ page) =>
  page.locator('#nav li:first-child a');

test.describe('dil: tarayıcı varsayılanı', () => {
  test.describe('tr-TR', () => {
    test.use({ locale: 'tr-TR' });
    test('Türkçe açılır', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-lang', 'tr');
      await expect(firstNav(page)).toHaveText(/^ana sayfa$/i, { useInnerText: true });
    });
  });

  test.describe('en-US', () => {
    test.use({ locale: 'en-US' });
    test('İngilizce açılır', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-lang', 'en');
      await expect(firstNav(page)).toHaveText(/^home$/i, { useInnerText: true });
    });
  });
});

test.describe('dil: buton ve kalıcılık', () => {
  test.use({ locale: 'tr-TR' });

  test('buton dili değiştirir, yenilenince korunur', async ({ page }) => {
    await page.goto('/');
    await page.locator('#lang-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-lang', 'en');
    await expect(firstNav(page)).toHaveText(/^home$/i, { useInnerText: true });
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-lang', 'en');
    await page.locator('#lang-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-lang', 'tr');
  });

  test('buton geçerli dilin kodunu gösterir', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#lang-toggle')).toHaveText(/^tr$/i, { useInnerText: true });
    await page.locator('#lang-toggle').click();
    await expect(page.locator('#lang-toggle')).toHaveText(/^en$/i, { useInnerText: true });
  });

  test('belge başlığı dile göre değişir', async ({ page }) => {
    await page.goto('/');
    const tr = await page.title();
    await page.locator('#lang-toggle').click();
    expect(await page.title()).not.toBe(tr);
  });

  // Flash önleme: dil, site.js yüklenmeden <head> içindeki script ile ayarlanmalı.
  test('kayıtlı dil JS dosyası olmadan da uygulanır', async ({ page }) => {
    await page.route('**/site.js', (r) => r.abort());
    await page.addInitScript(() => localStorage.setItem('lang', 'en'));
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-lang', 'en');
  });
});
