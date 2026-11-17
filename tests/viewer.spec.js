// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('resim görüntüleyici', () => {
  test('görsele tık: açılır, kapatma düğmesi sağ üstte; düğme, Esc ve arka plan kapatır', async ({ page }) => {
    await page.goto('/portfolyom/');
    const open = async () => {
      await page.locator('#left .groupbody .pics img:visible').first().click();
      await expect(page.locator('.viewer')).toBeVisible();
    };
    await open();
    const img = page.locator('.viewer img');
    await expect.poll(() => img.evaluate((i) => /** @type {HTMLImageElement} */ (i).naturalWidth)).toBeGreaterThan(0);
    const vp = /** @type {{width:number}} */ (page.viewportSize());
    const btn = /** @type {{x:number,y:number,width:number}} */ (await page.locator('.viewer-close').boundingBox());
    expect(btn.x + btn.width).toBeGreaterThan(vp.width - 40);
    expect(btn.y).toBeLessThan(40);

    await page.locator('.viewer-close').click();
    await expect(page.locator('.viewer')).toHaveCount(0);
    await open(); await page.keyboard.press('Escape');
    await expect(page.locator('.viewer')).toHaveCount(0);
    await open(); await page.mouse.click(5, 300);
    await expect(page.locator('.viewer')).toHaveCount(0);
  });

  test('çizim galerisi: resim dosyasına giden bağlantı sayfadan çıkarmadan görüntüleyicide açılır', async ({ page }) => {
    await page.goto('/cizimlerim/');
    await page.locator('#left .gallery a').first().click();
    await expect(page.locator('.viewer')).toBeVisible();
    expect(new URL(page.url()).pathname).toBe('/cizimlerim/');
  });

  test('liste küçük resimleri ve sertifikalar görüntüleyiciyi açmaz', async ({ page }) => {
    await page.goto('/portfolyom/');
    await page.locator('#left .certs a:visible').first().evaluate((a) => a.addEventListener('click', (e) => e.preventDefault()));
    await page.locator('#left .certs a:visible img').first().click();
    await expect(page.locator('.viewer')).toHaveCount(0);
  });
});

test('sertifika önizlemeleri yatay ve sınırlı: en/boy ≥ 1.4 (dikey belge de üstten kırpılır)', async ({ page }) => {
  await page.goto('/portfolyom/');
  for (const b of await page.locator('#left .certs a:visible img').evaluateAll((is) => is.map((i) => { const r = i.getBoundingClientRect(); return [r.width, r.height]; }))) {
    expect(b[0] / b[1]).toBeGreaterThanOrEqual(1.4);
  }
});
