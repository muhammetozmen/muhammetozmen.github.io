// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('SEO', () => {
  test('ana sayfa: description, keywords, canonical, Open Graph', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Muhammet Özmen/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /portfolyo/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute('content', 'en_US');
  });

  test('JSON-LD geçerli JSON: ana sayfa WebSite+Person, yazı BlogPosting', async ({ page }) => {
    await page.goto('/');
    const home = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    expect(home['@graph'].map((/** @type {any} */ n) => n['@type'])).toEqual(['WebSite', 'Person']);
    await page.goto('/writing/2026/fedora-nvidia-driver/');
    const post = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    expect(post['@type']).toBe('BlogPosting');
    expect(post.datePublished).toMatch(/^2026-05-21/);
  });

  test('404 sayfası noindex, canonical yok', async ({ request }) => {
    const html = await (await request.get('/404.html')).text();
    expect(html).toMatch(/name="robots" content="noindex"/);
    expect(html).not.toMatch(/rel="canonical"/);
  });

  test('robots.txt sitemap\'i gösterir; sitemap tüm sayfaları ve yazıları içerir, 404\'ü içermez', async ({ request }) => {
    expect(await (await request.get('/robots.txt')).text()).toMatch(/Sitemap: .*\/sitemap\.xml/);
    const xml = await (await request.get('/sitemap.xml')).text();
    const n = (/** @type {string} */ d) => fs.readdirSync(path.join(__dirname, '..', d)).filter((f) => f.endsWith('.md')).length;
    expect((xml.match(/<loc>/g) || []).length).toBe(6 + n('_posts') + n('_projects')); // menü + yazı + proje + portfolyo
    expect(xml).not.toMatch(/404/);
  });

  test('llms.txt site adı, menü ve son yazıları listeler', async ({ request }) => {
    const txt = await (await request.get('/llms.txt')).text();
    expect(txt).toMatch(/^# Muhammet Özmen/);
    expect(txt).toMatch(/\/writing\//);
    expect(txt).toMatch(/NVIDIA/);
  });
});
