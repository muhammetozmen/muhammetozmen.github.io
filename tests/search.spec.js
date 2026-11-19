// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('yazılar: kategoriler ve arama', () => {
  test('yazısı olan kategori görünür, boş kategori gizlenir', async ({ page }) => {
    await page.goto('/writing/');
    await expect(page.locator('#left .postcat')).toHaveCount(1);
    await expect(page.locator('#left .postcat h3 span:visible')).toHaveText(['Technical Posts']);
    await expect(page.locator('#left .postcat .entry')).toHaveCount(1);
    expect(await page.locator('#left').innerText()).not.toMatch(/by year|yıllara göre/i);
  });

  test('anahtar kelime, başlık ve metin eşleşir; Türkçe karakter ve harf boyutu fark etmez', async ({ page }) => {
    await page.goto('/writing/');
    const entries = page.locator('#left .entry:visible');
    for (const q of ['NVIDIA', 'surucu', 'SÜRÜCÜ', 'rawhide', 'fedora driver']) { // anahtar, anahtar, anahtar, yalnızca metin, çok sözcük
      await page.fill('#post-search', q);
      await expect(entries, q).toHaveCount(1);
    }
    await page.fill('#post-search', 'bulunmayanbirkelime');
    await expect(entries).toHaveCount(0);
    await expect(page.locator('#no-results:visible')).toHaveCount(1);
    await page.fill('#post-search', '');
    await expect(entries).toHaveCount(1);
    await expect(page.locator('#no-results')).toBeHidden();
  });

  test('sıralama: anahtar kelime eşleşmesi, başlık ve metin eşleşmesinin önünde', async ({ page }) => {
    await page.goto('/writing/');
    // Tek gerçek yazı var; kopyalayıp sahte dizinle üç yazılık bir senaryo kur (dizin ilk aramada okunur).
    await page.evaluate(() => {
      const list = /** @type {HTMLElement} */ (document.querySelector('.postcat'));
      const proto = /** @type {HTMLElement} */ (list.querySelector('.entry'));
      for (const u of ['/a/', '/b/', '/c/']) { const c = /** @type {HTMLElement} */ (proto.cloneNode(true)); c.dataset.url = u; c.dataset.order = u === '/a/' ? '1' : u === '/b/' ? '2' : '3'; list.append(c); }
      proto.remove();
      const mk = (/** @type {string} */ url, /** @type {string} */ kw, /** @type {string} */ title, /** @type {string} */ body) => ({ url, title, title_en: title, tr_keyword: kw, en_keyword: '', tr: body, en: '' });
      /** @type {HTMLElement} */ (document.getElementById('post-index')).textContent = JSON.stringify([
        mk('/a/', '', 'Başka', 'metinde lehim geçer'),          // yalnızca metin
        mk('/b/', '', 'Lehim rehberi', 'içerik'),                 // başlık
        mk('/c/', 'lehim, devre', 'Başka', 'içerik'),             // anahtar kelime
      ]);
    });
    await page.fill('#post-search', 'LEHİM');
    const order = await page.locator('.postcat').first().locator('.entry:visible').evaluateAll((es) => es.map((e) => /** @type {HTMLElement} */ (e).dataset.url));
    expect(order).toEqual(['/c/', '/b/', '/a/']);
  });
});
