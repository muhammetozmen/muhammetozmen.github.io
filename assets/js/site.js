// @ts-check
// Dil ve tema düğmeleri. İlk değerler <head> içindeki script tarafından zaten ayarlandı;
// burada yalnızca değişiklik ve kalıcılık (localStorage) yönetilir.

const root = document.documentElement;

/** localStorage gizli pencerede fırlatabilir; tercih kaydedilemese de site çalışmalı. */
const save = (/** @type {string} */ key, /** @type {string} */ value) => {
  try { localStorage.setItem(key, value); } catch { /* yoksay */ }
};

const toggleLang = () => {
  const next = root.dataset.lang === 'tr' ? 'en' : 'tr';
  root.dataset.lang = next;
  root.lang = next;
  const title = document.querySelector('title');
  if (title?.dataset[next]) document.title = title.dataset[next];
  save('lang', next);
};

const toggleTheme = () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  save('theme', next);
};

document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

// Resim görüntüleyici: içerikteki görsele tıklayınca büyük açılır. Kapat: sağ üst düğme, Esc ya da arka plana tık.
// Liste küçük resimleri (.thumb) ve sertifika önizlemeleri (PDF'e gider) hariç. Görsel bir bağlantı içindeyse
// yalnızca bağlantı bir resim dosyasına gidiyorsa devralınır (YouTube gibi dış bağlantılara dokunulmaz).
const IMAGE_FILE = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;
/** @type {HTMLElement | null} */
let viewer = null;
/** @type {Element | null} */
let opener = null;

const closeViewer = () => {
  viewer?.remove();
  viewer = null;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onViewerKey);
  if (opener instanceof HTMLElement) opener.focus();
};

// Tek odaklanabilir öğe kapatma düğmesi olduğundan Tab odağı orada tutmak yeter.
const onViewerKey = (/** @type {KeyboardEvent} */ e) => {
  if (e.key === 'Escape') closeViewer();
  else if (e.key === 'Tab') { e.preventDefault(); viewer?.querySelector('button')?.focus(); }
};

const openViewer = (/** @type {string} */ src, /** @type {string} */ alt) => {
  closeViewer();
  opener = document.activeElement;
  viewer = document.createElement('div');
  viewer.className = 'viewer';
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-label', alt || 'Image');
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'viewer-close';
  close.setAttribute('aria-label', 'Kapat / Close');
  close.textContent = '×';
  close.addEventListener('click', closeViewer);
  viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
  viewer.append(img, close);
  document.body.append(viewer);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onViewerKey);
  close.focus();
};

document.getElementById('left')?.addEventListener('click', (e) => {
  const img = e.target instanceof HTMLImageElement ? e.target : null;
  if (!img || img.classList.contains('thumb') || img.closest('.certs')) return;
  const link = img.closest('a');
  if (link && !IMAGE_FILE.test(link.getAttribute('href') || '')) return;
  e.preventDefault();
  openViewer(link?.href || img.currentSrc || img.src, img.alt);
});

// Yazılar sayfası araması: yazdıkça filtreler. Sıralama: önce anahtar kelime (100), sonra başlık (50), sonra metin (1).
// Büyük/küçük harf ve Türkçe karakter ayrımı yok (ı/i, ö/o, ş/s...). Birden çok sözcük: hepsi bir yerde geçmeli.
const searchInput = /** @type {HTMLInputElement | null} */ (document.getElementById('post-search'));
if (searchInput) {
  const fold = (/** @type {string} */ s) => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
  const asText = (/** @type {unknown} */ v) => (Array.isArray(v) ? v.join(' ') : String(v ?? ''));
  const decode = (/** @type {string} */ html) => new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
  /** @type {Map<string, {kw: string, title: string, body: string}> | null} */
  let index = null;
  // Dizin ilk aramada kurulur (sayfa açılışını yavaşlatmaz); metindeki HTML kaçışları çözülür.
  const load = () => (index ??= new Map(JSON.parse(document.getElementById('post-index')?.textContent || '[]').map(
    (/** @type {any} */ p) => [p.url, {
      kw: fold(`${asText(p.tr_keyword)} ${asText(p.en_keyword)}`),
      title: fold(`${p.title ?? ''} ${p.title_en ?? ''}`),
      body: fold(decode(`${p.tr ?? ''} ${p.en ?? ''}`)),
    }])));
  const score = (/** @type {{kw: string, title: string, body: string}} */ p, /** @type {string[]} */ terms) => {
    let total = 0;
    for (const t of terms) {
      const s = (p.kw.includes(t) ? 100 : 0) + (p.title.includes(t) ? 50 : 0) + (p.body.includes(t) ? 1 : 0);
      if (!s) return 0;
      total += s;
    }
    return total;
  };
  const sections = [...document.querySelectorAll('.postcat')];
  sections.forEach((sec) => sec.querySelectorAll('.entry').forEach((e, i) => { /** @type {HTMLElement} */ (e).dataset.order = String(i); }));

  searchInput.addEventListener('input', () => {
    const terms = fold(searchInput.value).split(/\s+/).filter(Boolean);
    const posts = terms.length ? load() : null;
    let visible = 0;
    for (const sec of sections) {
      const entries = /** @type {HTMLElement[]} */ ([...sec.querySelectorAll('.entry')]);
      const scored = entries.map((e) => ({ e, s: posts ? score(posts.get(e.dataset.url ?? '') ?? { kw: '', title: '', body: '' }, terms) : 1 }));
      scored.sort((a, b) => b.s - a.s || Number(a.e.dataset.order) - Number(b.e.dataset.order));
      let shown = 0;
      for (const { e, s } of scored) { e.hidden = s === 0; if (s) shown++; sec.append(e); }
      sec.querySelector('.empty')?.toggleAttribute('hidden', terms.length > 0);
      sec.hidden = terms.length > 0 && shown === 0;
      visible += shown;
    }
    document.getElementById('no-results')?.toggleAttribute('hidden', !terms.length || visible > 0);
  });
}
