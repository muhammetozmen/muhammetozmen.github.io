// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('tema', () => {
  test.describe('sistem karanlık', () => {
    test.use({ colorScheme: 'dark' });
    test('kayıt yoksa sistem temasını izler', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });

  test.describe('sistem aydınlık', () => {
    test.use({ colorScheme: 'light' });

    test('buton temayı değiştirir, yenilenince korunur', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
      await page.locator('#theme-toggle').click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });

    test('kayıtlı tema JS dosyası olmadan da uygulanır', async ({ page }) => {
      await page.route('**/site.js', (r) => r.abort());
      await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });

    test('tema butonu dil butonunun solunda', async ({ page }) => {
      await page.goto('/');
      const t = await page.locator('#theme-toggle').boundingBox();
      const l = await page.locator('#lang-toggle').boundingBox();
      expect(t && l && t.x < l.x).toBeTruthy();
    });
  });
});

test.describe('tema ikonu', () => {
  test.use({ colorScheme: 'light' });

  test('açık temada ay, koyu temada güneş görünür; ikisi de SVG ve aynı boyutta', async ({ page }) => {
    await page.goto('/');
    const moon = page.locator('#theme-toggle .when-light svg');
    const sun = page.locator('#theme-toggle .when-dark svg');
    await expect(moon).toBeVisible();
    await expect(sun).toBeHidden();
    const m = await moon.boundingBox();

    await page.locator('#theme-toggle').click();
    await expect(sun).toBeVisible();
    await expect(moon).toBeHidden();
    const s = await sun.boundingBox();
    expect(m && s && Math.round(m.width) === Math.round(s.width) && Math.round(m.height) === Math.round(s.height)).toBeTruthy();
  });

  test('ikon düğmenin dikey ortasında', async ({ page }) => {
    await page.goto('/');
    const i = await page.locator('#theme-toggle svg:visible').boundingBox();
    const l = await page.locator('#lang-toggle').boundingBox();
    // dil yazısı ile ikonun merkezleri birbirine yakın (±3px)
    expect(i && l && Math.abs((i.y + i.height / 2) - (l.y + l.height / 2 - 2)) <= 3).toBeTruthy();
  });
});
