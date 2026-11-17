// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('mobil (375px)', () => {
  test.use({ viewport: { width: 375, height: 700 } });

  test('yatay kaydırma yok', async ({ page }) => {
    await page.goto('/');
    const [scroll, client] = await page.evaluate(() => [
      document.documentElement.scrollWidth,
      document.documentElement.clientWidth,
    ]);
    expect(scroll).toBeLessThanOrEqual(client);
  });

  test('sağ bar içeriğin altına iner', async ({ page }) => {
    await page.goto('/');
    const main = await page.locator('#left').boundingBox();
    const side = await page.locator('#right').boundingBox();
    expect(main && side && side.y >= main.y + main.height - 1).toBeTruthy();
  });
});

test.describe('masaüstü', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  // Sitenin tamamı %125 büyütülmüş (main.css --zoom)
const ZOOM = 1.25;

test('sağ bar içeriğin yanında, 750px çerçeve', async ({ page }) => {
    await page.goto('/');
    const main = await page.locator('#left').boundingBox();
    const side = await page.locator('#right').boundingBox();
    expect(main && side && side.x >= main.x + main.width - 1).toBeTruthy();
    expect(side && Math.round(side.width)).toBe(Math.round(243 * ZOOM));
  });
});

// Telefon değil, dar pencere (640px): düzen bozulmamalı
test.describe('dar pencere (640px)', () => {
  test.use({ viewport: { width: 640, height: 700 } });

  test('sağ bar yanda kalır, tema/dil düğmeleri sağda kalır', async ({ page }) => {
    await page.goto('/');
    const main = await page.locator('#left').boundingBox();
    const side = await page.locator('#right').boundingBox();
    expect(main && side && side.x >= main.x + main.width - 1).toBeTruthy();
    const lang = await page.locator('#lang-toggle').boundingBox();
    const wrap = await page.locator('#nav').boundingBox();
    expect(lang && wrap && lang.x > wrap.x + wrap.width / 2).toBeTruthy();
  });
});

test.describe('başlık yazısı', () => {
  for (const width of [1280, 640, 375]) {
    test(`${width}px: site adı görünür ve başlığa sığar`, async ({ page }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.goto('/');
      const t = page.locator('.logo-text');
      await expect(t.locator('span:visible')).toHaveText(/^Muhammet ÖZMEN.*(in Websitesi|'s Website)$/);
      const a = await t.boundingBox();
      const w = await page.locator('#logo').boundingBox();
      expect(a && w && a.x + a.width <= w.x + w.width).toBeTruthy();
      expect(a && w && a.y >= w.y && a.y + a.height <= w.y + w.height).toBeTruthy();
    });
  }
});

test.describe('çerçeve kenarında çizgili solma', () => {
  for (const width of [900, 960, 981, 1000, 1280]) {
    test(`${width}px: yatay kaydırma yaratmaz`, async ({ page }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.goto('/');
      const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(scroll).toBeLessThanOrEqual(client);
    });
  }

  const fadeDisplay = (/** @type {import('@playwright/test').Page} */ page) =>
    page.evaluate(() => getComputedStyle(/** @type {Element} */ (document.getElementById('wrap')), '::before').display);

  test('geniş ekranda şeritler var, pencere dar olunca gizlenir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto('/');
    expect(await fadeDisplay(page)).toBe('block');
    await page.setViewportSize({ width: 900, height: 700 });
    expect(await fadeDisplay(page)).toBe('none');
  });
});

// Regresyon: çizgi periyodu zoom'a bölünmezse (1px/zoom) çizgiler ekranda düzensiz yuvarlanır (bir 1px, bir 2px)
test('solma çizgileri zoom\'a göre ölçeklenmiş (0.8px)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 700 });
  await page.goto('/');
  const mask = await page.evaluate(() => {
    const cs = getComputedStyle(/** @type {Element} */ (document.getElementById('wrap')), '::before');
    return cs.maskImage || cs.webkitMaskImage;
  });
  expect(mask).toContain('0.8px');
});

test('375px: sitemap\'teki hiçbir sayfada yatay kaydırma ya da kırık görsel yok', async ({ page, request }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  const xml = await (await request.get('/sitemap.xml')).text();
  const paths = [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
  expect(paths.length).toBeGreaterThan(6);
  for (const p of paths) {
    await page.goto(p);
    const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(scroll, `${p} yatay kaydırma`).toBeLessThanOrEqual(client);
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    expect(broken, `${p} kırık görsel`).toEqual([]);
  }
});
