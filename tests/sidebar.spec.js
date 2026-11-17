// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('sağ bar', () => {
  test('Son Paylaşımlar: en yeni en çok 5 yazı (yeniden eskiye) + More bağlantısı', async ({ page }) => {
    const slugs = fs.readdirSync(path.join(__dirname, '..', '_posts')).filter((f) => f.endsWith('.md')).sort().reverse()
      .map((f) => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''));
    await page.goto('/');
    const posts = page.locator('#right #recent li:not(.more) a');
    await expect(posts).toHaveCount(Math.min(5, slugs.length));
    const hrefs = await posts.evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.every((h) => h?.startsWith('/yazilarim/'))).toBeTruthy();
    hrefs.forEach((h, i) => expect(h).toContain(slugs[i]));
    await expect(page.locator('#right #recent li.more a')).toHaveAttribute('href', '/yazilarim/');
  });

  test('Bağlantılar ve RSS blokları var', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('#right #links li a').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('#right a[href="/feed.xml"]')).toHaveCount(1);
  });

  test('sağ bar başlıkları dile göre değişir', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.reload();
    await expect(page.locator('#right h3').first()).toHaveText('Recent Posts', { useInnerText: true });
  });
});

test('/feed.xml geçerli XML ve yazıları içerir', async ({ request }) => {
  const res = await request.get('/feed.xml');
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toMatch(/^<\?xml/);
  expect(xml).toContain('<feed');
  expect(xml).toContain('fedora-nvidia-surucusu');
});
