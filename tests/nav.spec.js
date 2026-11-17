// @ts-check
const { test, expect } = require('@playwright/test');

test('menüde tam olarak bir aktif öğe var: Ana Sayfa', async ({ page }) => {
  await page.goto('/');
  const active = page.locator('#nav a.active');
  await expect(active).toHaveCount(1);
  await expect(active).toHaveAttribute('href', '/');
});

test('her menü öğesinde görünür metin var', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('#nav li a');
  expect(await links.count()).toBe(6);
  for (const a of await links.all()) {
    await expect(a).not.toHaveText('', { useInnerText: true });
  }
});
