# Muhammet Özmen — Kişisel Site · Agent Rehberi

Bu dosya, bu repoda çalışan her agent için tek doğru kaynaktır. Kararlar burada verildi; uygulamada bunları izle. Bir karar eksikse ya da çelişiyorsa §9'daki onay kurallarına göre kullanıcıya sor.

## 1. Rol ve çalışma biçimi

- Kıdemli bir Full-Stack / DevOps mühendisi gibi çalış. Hedef; modüler, test edilmiş ve bakımı kolay bir site.
- Kullanıcıyla kısa, net ve Türkçe konuş. Rutin kararlarda inisiyatif al. §9'daki maddelerde mutlaka sor.
- Siteyi aşama aşama kur (§8). Her aşamada sıra şöyle: kısa plan → test (red) → kod → test (green) → tarayıcıda kontrol → commit.
- Bir komut ya da test hata verirse logu kendin oku, kök nedeni bul ve alternatif yolları dene. Kullanıcıya yalnızca gerçekten onun kararı gereken durumda git.

## 2. Araçlar ve skill'ler

| Ne zaman | Ne kullan |
|---|---|
| Paket, gem veya Action eklerken ya da sürüm seçerken | **Context7** MCP (yoksa resmi dokümantasyon/WebSearch). En son kararlı sürümü doğrula, deprecated API yazma. Ezbere sürüm numarası yazma. |
| Bir arayüz parçası bittiğinde | **Playwright MCP** ile sayfayı aç, tıkla, ekran görüntüsü al. Ardından `npm test` çalıştır. |
| Kod yazarken | Matt Pocock ilkeleri: JS'de `// @ts-check` + JSDoc tipleri, `localStorage` gibi tarayıcı API'lerinde try/catch, ES2020+, modern CSS (custom properties, grid). |
| Bir aşama bittiğinde, commit'ten önce | `/ponytail-review` ile değişikliği gözden geçir. Gereksiz satırları sil, kodu kısa ve okunur tut. |
| Web sayfası okurken | Önce Lightpanda; çalışmazsa kullanıcıya sor. |

## 3. Mimari (değişmez kararlar)

- **Jekyll 4.x + GitHub Actions** ile build ve deploy (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, `ruby/setup-ruby`). GitHub'ın klasik "branch'ten yayın" yöntemi kullanılmaz.
  - Neden: CI'da önce Playwright testleri koşmalı, ayrıca Jekyll sürümü kontrolümüzde olmalı.
- Gemfile: `jekyll ~> 4.4`, `jekyll-feed`, `webrick` (Ruby 3+ için `jekyll serve`), `erb` (yeni Ruby'de varsayılan gem değil, Jekyll istiyor). Gem'ler `vendor/bundle` altına kurulur (`bundle config set --local path vendor/bundle`).
- Eklenti olarak yalnızca `jekyll-feed` (RSS) var. Başka eklenti eklemek §9 onayı gerektirir.
- Markdown işleyici kramdown (Jekyll varsayılanı). `markdown="1"` özelliği buna dayanıyor.
- JS framework'ü, CSS framework'ü ya da bundler yok. Tek bir `assets/css/main.css` ve tek bir `assets/js/site.js` var.
- Kalıcılık: dil ve tema tercihi `localStorage` içinde (`lang`, `theme` anahtarları). Site statik olduğu için veritabanı yok. İçeriğin kalıcı kaynağı repodaki markdown dosyaları.
- Yayın adresi: `https://<kullanici>.github.io`, `baseurl: ""`. Domain geçişi için §10'a bak.
- Tüm iç linkler `relative_url` filtresinden geçer. Neden: domain ya da baseurl değiştiğinde hiçbir link kırılmasın.

## 4. Klasör yapısı

```
/
├── _config.yml              # site adı, url, koleksiyonlar, permalink, exclude
├── Gemfile                  # jekyll ~> 4.x, jekyll-feed
├── package.json             # yalnızca Playwright (devDependency) + "test" scripti
├── playwright.config.js     # webServer: bundle exec jekyll serve --port 4001
├── .gitignore               # _site, .jekyll-cache, node_modules, test-results, _reference
├── .github/workflows/pages.yml
├── _data/
│   ├── i18n.yml             # arayüz metinleri: anahtar → {tr, en}
│   ├── nav.yml              # menü: [{key, url}] (sıra burada)
│   └── links.yml            # sağ bar bağlantıları + JSON-LD sameAs (gerçek URL'ler)
├── _includes/
│   ├── t.html               # {% include t.html key="..." %} → arayüz metni, iki dilli span (i18n.yml'den)
│   ├── bi.html              # {% include bi.html tr=... en=... %} → iki dilli düz metin (başlık, açıklama)
│   ├── entry-list.html      # başlık + tarih + açıklama + küçük görsel listesi
│   ├── theme-icons.html     # piksel-sanat ay/güneş SVG (tema düğmesi)
│   ├── head.html            # meta, css, tema/dil ön-yükleme scripti
│   ├── header.html          # #logo + #nav + tema/dil butonları
│   ├── sidebar.html         # #right: Son Paylaşımlar, Bağlantılar, RSS
│   └── footer.html
├── _layouts/
│   ├── default.html         # iskelet (#wrap > header, nav, main#left, aside#right, footer)
│   ├── page.html            # h1 + içerik
│   ├── post.html            # h1 + tarih + içerik
│   └── item.html            # proje/portfolyo öğesi (h1 + etiketler/GitHub + içerik)
├── _posts/                  # YYYY-MM-DD-slug.md
├── _projects/               # slug.md
├── _portfolio/              # slug.md
├── pages/                   # projelerim.md, yazilarim.md, cizimlerim.md, portfolyom.md, hakkimda.md, 404.md
├── index.md                 # Ana Sayfa
├── assets/
│   ├── css/main.css
│   ├── js/site.js
│   ├── img/                 # proje/portfolyo görselleri
│   └── cizimler/<kategori>/ # çizimler; klasör adı = kategori
├── tests/                   # *.spec.js (Playwright)
└── _reference/              # GİTIGNORE: orijinal SimpleBits GIF'leri, yalnızca yerel referans
```

Yeni bir içerik türü eklemek istenirse yeni klasör açmadan önce kullanıcıya sor.

## 5. Çok dillilik (TR / EN)

**Kural:** Her sayfanın iki dili de aynı `.md` dosyasında durur. Dil değişince URL değişmez; yalnızca görünen blok değişir.

İçerik dosyası şablonu (tüm türler için aynı):

```markdown
---
layout: page
title: Hakkımda          # TR başlık (feed ve SEO bunu kullanır)
title_en: About
description: "Placeholder: Kısa TR özet."      # listelerde kullanılır
description_en: "Placeholder: Short EN summary."
permalink: /hakkimda/
---
<div lang="tr" markdown="1">

Placeholder: Burası hakkımda kısmı, benim hakkımda birçok şeyi buradan öğrenebilirsiniz.

</div>
<div lang="en" markdown="1">

Placeholder: This is the about section, you can learn many things about me here.

</div>
```

- `title` ve `description` düz metin (string) olarak kalır, `_en` alanları ayrı tutulur. Neden: `jekyll-feed` ve `<title>` etiketi düz metin bekler; iç içe yapı (hash) buralarda bozulur.
- Listelerde ve sağ barda `post.excerpt` kullanılmaz, `description` / `description_en` kullanılır. Neden: excerpt iki dil bloğunu kesip karıştırır.
- `markdown="1"` olan div'lerin içinde, açılış etiketinden sonra ve kapanıştan önce **boş satır bırak**. Bırakılmazsa kramdown markdown'ı işlemez.
- Arayüz metinleri (menü, "More", "Son Paylaşımlar", buton etiketleri) `_data/i18n.yml` içinde durur ve `t.html` ile basılır. Çıktısı: `<span lang="tr">…</span><span lang="en">…</span>`.
- Gösterme/gizleme CSS ile yapılır:
  ```css
  html:not([data-lang="en"]) body [lang="en"],
  html[data-lang="en"] body [lang="tr"] { display: none; }
  ```
  Seçicide `body` olmalı. Yoksa `<html lang="en">` elemanının kendisi de eşleşir ve sayfanın tamamı gizlenir. JS kapalıysa TR görünür.
- `<head>` içindeki küçük inline script, sayfa çizilmeden önce şunları yapar: `localStorage.lang` → yoksa `navigator.language` `tr` ile başlıyorsa `tr`, değilse `en`. Sonucu `<html data-lang>` ve `<html lang>` özelliklerine yazar. Neden: sayfa açılırken yanlış dilin bir an görünmesini (flash) önlemek.
- `<title>` için `data-tr` ve `data-en` özellikleri basılır. `site.js` dil değişince `document.title` değerini günceller.
- Tarih biçimi iki dilde de `%d.%m.%Y` (ay adı çevirisi gerekmesin diye).
- Çizim kategori adları (klasör adları) çevrilmez, `-` karakteri boşluğa çevrilip gösterilir. `shortcut:` yorumu ile işaretle.

## 6. Tasarım (referans: `_reference/website-look.png` (yerel, gitignore'da: üçüncü kişinin sayfasının ekran görüntüsü, yayınlanmaz))

**%125 büyütülmüş:** Tüm site `html { zoom: var(--zoom) }` ile 1.25 kat büyük görünür (`:root { --zoom: 1.25 }`). Ölçüler (px) %100'e göre yazılıdır; çerçeve ekranda ≈940px olur. Zoom'u değiştirirken yalnızca `--zoom` değerine dokun. `vh`/`vw` ve piksel hizalaması gereken şeyler (çizgili solma, tema ikonu) `/ var(--zoom)` ile telafi edilir. Tarayıcının kendi zoom'u bununla çarpılır, %100'de test et.

Tasarım, 2003 tarihli simplebits.com/about sayfasının birebir CSS uyarlaması. Değerler orijinal `simple.css` dosyasından ve ekran görüntüsünden ölçüldü. Bunları kullan, kendin renk icat etme. Animasyon yok; yalnızca hover renk değişimi var.

### 6.1 İskelet (orijinal id'ler korunur)
```html
<div id="wrap">
  <header id="logo">…site adı…</header>
  <nav id="nav"><ul>…menü…</ul><div class="toggles">[tema][dil]</div></nav>
  <div id="cols">
    <main id="left">…</main>
    <aside id="right">…</aside>     <!-- grid-row: 1 / span 2 → zemini footer yanında da uzar -->
    <footer id="footer">…</footer>  <!-- grid-column: 1, sol sütunun altında -->
  </div>
</div>
```
- `#wrap`: `width: min(752px, 100%)` (750 + iki yanda 1px `#000` çerçeve), ortada, `background:#fff`, `position:relative`. Dışarıya doğru **çizgili solma** için §6.6.
- `#cols`: `display:grid; grid-template-columns: 1fr 243px` (sağ bar 242 + 1px sol kenarlık). Sağ sütun `#right` tam yükseklik boyunca uzar. Footer, grid içinde sol sütuna yerleşir. Sağ barın zemini footer'ın yanında da devam etmeli (orijinaldeki gibi).

### 6.2 Renk ve tipografi (açık tema = varsayılan)
| Token | Değer | Nerede |
|---|---|---|
| `--page-bg` | `#ccc` | body zemini |
| `--content-bg` | `#fff` | #left |
| `--side-bg` | `#f7f1df` | #right |
| `--side-border` | `#ddd0b9` | #right sol kenarı (1px), h3 alt çizgisi (1px dotted) |
| `--header-bg` | `#fc6` | #logo, 62px yükseklik |
| `--header-edge` | `#d9953c` | #logo üstünde 4px, altında 2px şerit |
| `--header-light` | `#ffe8b7` | logonun sağ yarısındaki açık renk çapraz şekiller (CSS gradient) |
| `--nav-stripe` | `#000` / `#333` | #nav: 30px yükseklik, `repeating-linear-gradient(#000 0 1px, #333 1px 2px)` |
| `--nav-text` | `#fff` | menü linkleri: 10px, bold, line-height 20px, margin 4px 10px 0, alt boşluk 2px, küçük harf |
| `--nav-active` | `#fc6` | aktif/hover link rengi + `border-bottom: 4px solid #fff` |
| `--text` | `#333` | gövde metni |
| `--heading` | `#c63` | h1/h2 ve sağ bar h3 |
| `--heading-hover` | `#930` | başlık linki hover |
| `--link` | `#5b80b2` | a:link (altı çizili) |
| `--link-visited` | `#969` | a:visited |
| `--link-hover` | `#036` | a:hover |
| `--side-text` | `#963` | sağ bar metni |
| `--muted` | `#999` | tarih, footer, `.note` |
| `--rule` | `#ddd` | içerik h3 alt çizgisi, footer üst çizgisi (2px) |
| `--thumb-border` | `#ccc` | görsel çerçeveleri (1px + 5px iç boşluk) |

- Gövde: `font: 12px/1.5em verdana, sans-serif`. `#left`: `padding: 18px 20px 20px`, `text-align: justify`.
- h1: `"lucida grande", verdana, sans-serif`, %115, bold, `#c63`. h2: %110, `#c63`. İçerik h3: %100, bold, `#333`, `border-bottom: 1px solid #ddd`.
- `#right`: %88 font, `padding: 15px`, `line-height: 1.4em`. h3'lerde solda turuncu kutucuk (`h3::before`, 8px, `#f93`, 1px `#c63` kenar), `padding-left: 19px`.
- `#left ul li`: madde işareti yok, yerine küçük ok/kutu ikonu (CSS ile çiz). `dl dt` bold, `dd` `margin:0; padding-bottom:1em`.
- `#footer`: %88, `#999`, `border-top: 2px solid #ddd`.
- Header'daki ad: `span.logo-text`, metin `_data/i18n.yml` `logo_text` (TR: "Muhammet ÖZMEN'in Websitesi", EN: "Muhammet ÖZMEN's Website"; `<title>`/SEO adı yine `site.title`), gövdeyle aynı yazı ailesi (`lucida grande, verdana`), 700, `letter-spacing:-.01em`, beyaz + `1px 1px 0 #c63` ince koyu turuncu kenar (açık turuncuda silik kalmasın; parlama yok). `left:24px`, dikeyde ortalı; boyut `min(28px, (100vw/zoom − 48px)/19)`. Web yazı tipi, simge ve animasyon yok. Eski görseller `_reference/` altında. Yazıyı değiştirmek için `_config.yml` `title`.
- Tema ve dil butonları `#nav` içinde en sağda, tema butonu dil butonunun **solunda**. Menü linkleriyle aynı stilde (`<button>`, 10px bold beyaz). Tema butonu piksel-sanat SVG gösterir (açık temada hilal, koyu temada güneş; `_includes/theme-icons.html`, 13×13 hücre, boyut `calc(13px / var(--zoom))`, `currentColor`), dil butonu geçerli dilin kodunu (`tr`/`en`) gösterir. İkisinde de `aria-label` olmalı. Unicode ay/güneş karakteri kullanma: yazı tipine göre boyut ve ağırlığı değişir.

### 6.3 Karanlık tema (`html[data-theme="dark"]`)
Header turuncusu ve nav şeridi aynı kalır. Değişen değerler:
`--page-bg:#1a1a1a; --content-bg:#222; --side-bg:#2b2620; --side-border:#4a4035; --text:#ddd; --heading:#e8915a; --heading-hover:#f0b080; --link:#8fb0dd; --link-visited:#b99bc9; --link-hover:#c5d8f0; --side-text:#d2b48c; --muted:#888; --rule:#444; --thumb-border:#555`.
Tema seçimi: `localStorage.theme` → yoksa `prefers-color-scheme`. Head'deki aynı inline script `data-theme` özelliğini sayfa çizilmeden önce ayarlar.

### 6.4 Dar ekran
- `#wrap` zaten esnektir (`min(752px, 100%)`). Menü her genişlikte satır atlayabilir (`flex-wrap`), tema/dil düğmeleri `margin-left:auto` ile **her zaman sağda** kalır.
- Sağ bar yalnızca telefon genişliğinde alta iner: `@media (max-width: 560px)` (ekran pikseli, zoom'dan bağımsız). Bu eşiği büyütme: orta boy pencerede sağ bar yanda kalmalı.
- Yatay kaydırma (horizontal scroll) hiçbir genişlikte olmamalı (`tests/responsive.spec.js`).

### 6.5 Orijinal görseller
Orijinal GIF'ler yerel referans için `_reference/simplebits/` klasörüne indirilir. Bu klasör hem `.gitignore` hem `_config.yml exclude` listesinde olur, **yayınlanmaz**. Liste:
`logo_corn.gif`, `bg_corn.gif`, `bg_birch_800.gif`, `stripe.gif`, `cube_birch.gif`, `li_bull.gif`, `box.gif`.
Adres kalıbı: `https://web.archive.org/web/2003id_/http://www.simplebits.com/images/<ad>`. Kullanıcı bunlara bakarak kendi görsellerini çizecek. Başlık yazısı, sağ bar kutucukları, nav şeridi ve header deseni CSS ile çizilir.

### 6.6 Çerçeve kenarında çizgili solma
Orijinal `bg_birch_800.gif` (772×6) ölçüldü: her 2 satırın ilkinde kenardan dışa ~8px'lik degrade (`#6c6c6c` → `#c4c4c4`), ikinci satır düz `#ccc`. `#wrap::before`/`::after` ile yapılır: `width:10px; z-index:-1` (ilk piksel çerçevenin altında kalır, boşluk bırakmaz), renk `linear-gradient(var(--fade-near), var(--page-bg))`, çizgiler `mask-image: repeating-linear-gradient(…)`.
- Maske periyodu **`var(--px) = 1px / var(--zoom)`** ile yazılır. Düz `1px/2px` yazılırsa zoom 1.25'te periyot 2.5 ekran pikseli olur, çizgiler düzensiz (1px, 2px karışık) görünür. Test: `responsive.spec.js` maskede `0.8px` arar.
- `--fade-near`: açık `#626262` (orijinal `#6c6c6c`, ilk px çerçevenin altında kaldığı için biraz koyu), koyu tema `#3a3a3a`.
- `@media (max-width: 980px)` altında gizlenir: şeritler sığmaz ve yatay kaydırma yaratır.

## 7. Sayfalar ve içerik

Menü (`_data/nav.yml`, sırası sabit):

| key | TR | EN | URL | Kaynak |
|---|---|---|---|---|
| home | Ana Sayfa | Home | `/` | `index.md` |
| projects | Projelerim | Projects | `/projelerim/` | `pages/projelerim.md`, `_projects` listesi |
| writing | Yazılarım | Writing | `/yazilarim/` | `pages/yazilarim.md`, yıllara göre gruplanmış `_posts` |
| drawings | Çizimlerim | Drawings | `/cizimlerim/` | `pages/cizimlerim.md`, galeri |
| portfolio | Portfolyom | Portfolio | `/portfolyom/` | `pages/portfolyom.md`, `_portfolio` listesi |
| about | Hakkımda | About | `/hakkimda/` | `pages/hakkimda.md` (orijinaldeki gibi `dl` yapısında) |

- Aktif menü öğesi, `page.url` ilgili URL ile başlıyorsa `class="active"` alır. Ana Sayfa için tam eşleşme gerekir.
- Permalink'ler: yazılar `/yazilarim/:year/:title/`, projeler `/projelerim/:name/`, portfolyo öğelerinin ayrı adresi yok (§7).
- Ana Sayfa: iki dilli kısa tanıtım placeholder'ı + son 5 yazı (başlık, tarih, description).
- Liste sayfalarında her öğe şunları gösterir: başlık (link), tarih (yazılarda), description. Front matter'da `image` varsa sağa yaslı `img.thumb` da gösterilir.
- **Sağ bar** (`sidebar.html`), sırasıyla:
  1. **Son Paylaşımlar / Recent Posts**: `site.posts | slice: 0, 5`, ardından **More ››** linki `/yazilarim/` adresine gider (orijinaldeki gibi `<strong>` içinde).
  2. **Bağlantılar / Links**: `_data/links.yml` içinden (GitHub, LinkedIn, YouTube, E-posta).
  3. **RSS**: `{{ '/feed.xml' | relative_url }}` linki.
- **Çizimlerim galerisi:** Agent `.md` dosyası oluşturmaz. Yapılış:
  ```liquid
  {% assign imgs = site.static_files | where_exp: "f", "f.path contains '/assets/cizimler/'" %}
  {% assign groups = imgs | group_by_exp: "f", "f.path | remove_first: '/assets/cizimler/' | split: '/' | first" %}
  ```
  Her grup için bir `h3` (kategori adı) ve bir ızgara (`display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr))`) basılır. Her öğe 1px `#ccc` çerçeveli, 5px iç boşluklu `<a href=dosya><img loading="lazy" alt="dosya adı"></a>`. Yalnızca `.png .jpg .jpeg .gif .webp .svg` uzantıları alınır. Başlangıç verisi: 2 kategori (`eskizler`, `dijital`), her birinde 2–3 küçük placeholder SVG.
- **Başlık kuralı:** Menü sayfalarında (Ana Sayfa, Projelerim, Yazılarım, Çizimlerim, Portfolyom, Hakkımda) `hide_title: true` kullanılır: `h1` yalnızca ekran okuyucu/SEO için var (`.sr-only`), menüdeki adı sayfada tekrar yazmaz. Yazı ve proje detaylarında `h1` görünür.
- **Yazılar:** `pages/yazilarim.md` iki kategoriye böler (`_data/post_categories.yml`: `teknik` = Teknik Yazılar, `genel` = Genel Yazılar; yazıda `category: teknik|genel` zorunlu). Yazı front matter'ı ayrıca `tr_keyword` ve `en_keyword` alır (virgüllü metin ya da liste); `<meta keywords>`, JSON-LD ve arama bunları kullanır. Sayfanın üstündeki arama kutusu (`#post-search`, mantık `site.js`'te) yazdıkça filtreler: önce anahtar kelime (100 puan), sonra başlık (50), sonra metin (1) eşleşmesi; ı/i, ö/o gibi Türkçe karakter farkı ve harf boyutu yok sayılır, birden çok sözcüğün hepsi geçmeli. Arama dizini sayfaya `#post-index` JSON'u olarak gömülür (TR bloğu `<div lang="en"` öncesi, EN sonrası). Testler: `tests/search.spec.js`.
- **Hakkımda fotoğrafı:** `assets/img/ben-acik.png` ve `ben-koyu.png` (eski siteden, tema zeminine uyan iki sürüm); `img.portrait.when-light/.when-dark` ile temaya göre biri görünür. Fotoğrafı değiştirirken iki dosyayı da yenile.
- **Resim görüntüleyici:** `site.js`, `#left` içindeki görsele tıklayınca tam ekran görüntüleyici açar (sağ üstte × düğmesi, Esc, arka plana tık). Hariç: liste küçük resimleri (`.thumb`), `.certs` (PDF'e gider), resim dosyası olmayan bağlantı içindeki görseller (YouTube vb.). Sertifika önizlemesi 16:10 sabit kutu, `object-position: top` (dikey belgelerde yalnızca üst kısım görünür). Testler: `tests/viewer.spec.js`.
- **Portfolyom:** Dört markdown dosyası, dört bölüm: `_portfolio/deneyim.md`, `yarismalar-ve-girisim.md`, `topluluk-ve-liderlik.md`, `belgeler.md` (front matter: `title`, `title_en`, `order`). `output: false`: ayrı sayfaları yok; `pages/portfolyom.md` `order`a göre hepsini sayfada açık basar (`h3.group` + `.groupbody`). Dosya içi yazım: her kayıt `## Başlık` + `<p class="when">dönem · kurum</p>` + isteğe bağlı `<div class="pics"><img …></div>` + metin; TR ve EN blokları ayrı `<div lang markdown="1">` içinde. Yeni bölüm = yeni `.md` dosyası. HTML bloklarında satır başı girintisi bırakma (markdown kod bloğu sayar).
- **Gerçek içerik (Kasım 2026):** Kaynaklar: eski site deposu ve kullanıcının yerel iş evrakları (güncel CV'ler, kişisel profil notu). Projeler = `_projects` (BrowserAPI, MÜDEK, Vishand, Taret, bu site). Portfolyom = `_portfolio` (deneyim, yarışmalar/girişim, topluluk, belgeler). Yazılar = `_posts` (Fedora NVIDIA rehberi). Hakkımda = biyografi, yetenekler, eğitim, CV bağlantıları. Yeni içerikte iki dilli bloklar ve `description(_en)` zorunlu; İngilizcesi yapay zekâ çevirisiyse front matter'a `ai_translated: true` (EN notu otomatik çıkar).
- **Yayınlanmayan veriler:** Kullanıcının yerel profil ve iş-bulma notları kişisel strateji/özel bilgi içerir (yaş, doğum yeri, not dökümü, resmî kayıtlar, kişisel durum bilgileri vb.). Siteye, commit'e ya da testlere alınmaz. Üçüncü kişilerin adları (takım arkadaşları) yazılmaz. Fotoğraflarda çocukların yüzü bulanıklaştırılır (`assets/img/portfolio/t3-egitim.jpg` örneği); yüzü seçilebilen çocuk fotoğrafı bulanıklaştırılmadan yayınlanmaz. CV PDF'leri kullanıcının onayıyla telefon dahil yayınlanır (`assets/belgeler/`).

### 7.1 SEO ve yapay zeka görünürlüğü
- `head.html` her sayfada basar: `description`, `keywords` (`_config.yml` `keywords`, sayfada `keywords:` ile ezilir), `canonical`, Open Graph, Twitter card ve JSON-LD (ana sayfa `WebSite`+`Person`, yazılar `BlogPosting`). 404 `noindex` alır. Ana sayfanın `description`'ı `site.description`'dır (front matter'a yazma).
- `robots.txt`, `sitemap.xml` (Liquid, eklenti yok; noktalı adresler ve `sitemap: false` hariç) ve `llms.txt` (yapay zeka tarayıcıları için site özeti) kökten yayınlanır. Yeni içerik türü eklenirse `sitemap.xml`'deki `all` listesine koleksiyonu ekle.
- Bilinçli sınırlar: gizli metin, anahtar kelime doldurma ve sahte yapılandırılmış veri yok (arama motorları cezalandırır). JSON-LD'ye yalnızca sayfada gerçekten olan bilgi girer. `jekyll-seo-tag`/`jekyll-sitemap` eklentisi eklenmedi (§9). İki dil tek adreste olduğundan `hreflang` yok; arama motoru TR metni görür.
- `url` placeholder iken canonical/sitemap yanlış adresi gösterir; gerçek `url` girilmeden yayınlama.

## 8. Uygulama aşamaları

> **Durum:** Aşama 0–6 tamamlandı (bkz. §12). Bu bölüm, siteyi sıfırdan yeniden kurmak ya da bir aşamayı yeniden doğrulamak için referanstır. Yeni iş için §12'ye bak.

Her aşama ayrı bir branch'te yapılır (`feat/<aşama-adı>`). Aşama sonunda `/ponytail-review` çalıştırılır, ardından o branch'e commit atılır. `main`'e merge ve `git push` için kullanıcıdan onay alınır. Bir aşama, **Bitti** ölçütündeki her madde doğrulanmadan bitmiş sayılmaz.

**Aşama 0 — Kurulum**
`git init` (branch adı `main`), `.gitignore`, `Gemfile`, `_config.yml`, `package.json`, `playwright.config.js`. Sürümleri Context7 ile doğrula. Ruby, Bundler ve Node yoksa kurmadan önce kullanıcıya sor (§9).
*Bitti:* `bundle exec jekyll build` hatasız tamamlanıyor, `npx playwright test` boş test paketinde yeşil.

**Aşama 1 — İskelet, dil ve tema mekanizması**
`default.html`, `head.html`, `header.html`, `footer.html`, `t.html`, `i18n.yml`, `nav.yml`, `site.js`. Önce şu testleri yaz: dil değiştirme ve kalıcılığı, tarayıcı diline göre varsayılan dil (`locale: 'en-US'` / `'tr-TR'`), tema değiştirme ve kalıcılığı.
*Bitti:* Bu testler yeşil. Sayfa yenilenince tercih korunuyor. Yüklenirken yanlış dil ya da tema bir an bile görünmüyor.

**Aşama 2 — Görsel tasarım**
`main.css`: §6'nın tamamı (açık tema, karanlık tema, mobil). Orijinal GIF'leri `_reference/` klasörüne indir.
*Bitti:* 1895×991 boyutunda alınan Playwright ekran görüntüsü `_reference/website-look.png` (yerel, gitignore'da: üçüncü kişinin sayfasının ekran görüntüsü, yayınlanmaz) ile yan yana karşılaştırılıyor; header, nav şeridi, sütun genişlikleri ve renkler eşleşiyor (fark varsa düzelt). Karanlık temanın ve 375px genişliğin ekran görüntüleri de alınmış.

**Aşama 3 — İçerik türleri ve sayfalar**
Koleksiyonlar, `page/post/item` layout'ları, 5 menü sayfası, Ana Sayfa, placeholder içerikler.
*Bitti:* Menüdeki her link 200 dönüyor, her sayfada bir `h1` var ve aktif menü öğesi doğru. Testler yeşil.

**Aşama 4 — Sağ bar ve RSS**
`sidebar.html`, `links.yml`, `jekyll-feed`.
*Bitti:* Test, sağ barda en fazla 5 yazı ve `/yazilarim/` adresine giden More linki olduğunu doğruluyor. `/feed.xml` geçerli XML.

**Aşama 5 — Çizimler galerisi**
*Bitti:* Bir test, kategori `h3` sayısının klasör sayısına, görsel sayısının dosya sayısına eşit olduğunu doğruluyor. Yeni bir klasör ve görsel eklenip tekrar build alınınca galeride görünüyor.

**Aşama 6 — CI/CD**
`.github/workflows/pages.yml` iki job içerir: (1) build + Playwright testleri, (2) deploy (yalnızca `main` için, testler geçerse çalışır).
*Bitti:* Workflow YAML'ı geçerli. Kullanıcıya şu adımı yazılı olarak ilet: *Settings → Pages → Source: GitHub Actions*.

### Her aşamada değişmeyen test listesi (`tests/`)
`i18n.spec.js`, `theme.spec.js`, `nav.spec.js`, `content.spec.js` (sayfalar, listeler, 404), `sidebar.spec.js`, `drawings.spec.js`, `seo.spec.js`, `search.spec.js`, `viewer.spec.js`, `responsive.spec.js` (375px'de `scrollWidth <= clientWidth` ve sağ bar ana içeriğin altında). Her sayfada konsol hatası olmadığını da doğrula.

## 9. Kullanıcı onayı gerektiren eylemler (Y/N sor)
1. Büyük çaplı dosya veya klasör silme.
2. Çok veri indiren ya da sistem ayarını değiştiren komutlar (Ruby, Node, Playwright tarayıcılarının kurulumu dahil).
3. Temel mimariyi değiştiren kararlar: framework, build yöntemi, §5'teki dil sistemi, yeni bir Jekyll eklentisi, yeni bir içerik türü.
4. `main`'e merge, `git push`, GitHub repo ayarları, DNS.

## 10. Domain geçişi (kullanıcı istediğinde yapılır)
Repo köküne içinde `mozmen.dev` yazan bir `CNAME` dosyası eklenir, `_config.yml` içinde `url: https://mozmen.dev` yapılır. Kullanıcıya iletilecek adımlar: DNS'te apex alan adı için GitHub Pages A/AAAA kayıtları, `www` için CNAME kaydı; ardından Pages ayarlarında "Enforce HTTPS". Güncel IP'leri GitHub dokümantasyonundan doğrula.

## 11. Kod standartları
- Karmaşık fonksiyonlarda yorum satırı, kodun *ne* yaptığını değil *neden* öyle yaptığını açıklar.
- Bilinçli kısayollara `// shortcut: <sınır>, <ne zaman yükseltilmeli>` yorumu eklenir.
- Erişilebilirlik: semantik etiketler, her görselde `alt`, butonlarda `aria-label`, odak (focus) halkası görünür.
- Bir aşama ancak build temiz, testler yeşil ve tarayıcı kontrolü yapılmışsa "tamamlandı" olarak raporlanır.

## 12. Mevcut durum ve bakım

**Durum:** Site çalışıyor, `npm test` ile 61 Playwright testi geçiyor. Branch'ler üst üste dizili (`feat/kurulum` → … → son branch); `main` henüz boş. `main`'e alma, `git push` ve GitHub ayarları kullanıcı onayı bekler (§9). Uzak repo tanımlı değil.

**Çalıştırma:**
```
export GEM_HOME=$HOME/.local/share/gem/ruby/3.4.0 PATH=$GEM_HOME/bin:$PATH
bundle exec jekyll serve      # http://127.0.0.1:4000
npm test                      # kendi sunucusunu 4001'de açar, 4000'e dokunmaz
```
Playwright sistem Chromium'unu kullanır (`/usr/bin/chromium`, `CHROMIUM_PATH` ile değişir). Yoksa ya da CI'daysa kendi tarayıcısını kullanır.

**Kullanıcının yapması gerekenler (agent yapmaz):**
- Alan adı: `muhammetozmen.org` süresi doldu. Site `mozmen.dev` için hazırlandı (`CNAME`, `url: https://mozmen.dev`); alan adı satın alınınca kullanıcı DNS'i (§10) ve GitHub Settings → Pages → Custom domain'i ayarlar, ardından "Enforce HTTPS". Bu ayarlar yapılana dek canonical/sitemap yanlış (henüz çözülmeyen) adresi gösterir. Yayındaki CV PDF'lerinde hâlâ ölü `muhammetozmen.org` adresi yazıyor: CV'yi güncel adresle yeniden dışa aktar.
- GitHub deposu `muhammetozmen/muhammetozmen.github.io`: bu site eski içeriğin yerine geçecekse `main`'e alma ve push için onay gerekir (§9).
- GitHub'da Settings → Pages → Source: **GitHub Actions** seçmek. Workflow henüz hiç koşmadı, yalnızca YAML'ı doğrulandı.

**İçerik ekleme (kod değişmez):**
- Yazı: `_posts/YYYY-MM-DD-slug.md` (§5 şablonu + `category`, `tr_keyword`, `en_keyword`). Gelecek tarihli yazı yayınlanmaz.
- Proje: `_projects/slug.md` (`image:` listede küçük görsel). Portfolyo: ilgili bölüm dosyasına yeni `##` kaydı ekle (§7).
- Çizim: `assets/cizimler/<kategori>/dosya.(png|jpg|jpeg|gif|webp|svg)`. Klasör adı kategori olur. Uzantılar küçük harf olmalı. Dosya adında boşluk ve Türkçe karakter sorun çıkarmaz (Jekyll yolu yüzde-kodlar, `Çizgi örneği.svg` ile test edilir).

**Bilinen sınırlar (karar verildi, hata değil):**
- RSS içeriği iki dili birden taşır (RSS okuyucu CSS çalıştırmaz); `summary` yalnızca TR `description`.
- Çizim galerisinde doğrudan `assets/cizimler/` altına konan dosya kategori sayılır (klasör zorunlu değil).
- Çizgili kenar solması 980px altında gizlenir (§6.6). Tarayıcı zoom'u %100 değilse çizgiler düzensizleşebilir.
- Testler içerik sayılarını dosya sistemindeki `.md` dosyalarından okur (sidebar, listeler, sitemap); içerik eklemek testleri bozmaz. Yazı sayısı 5'ten azken "en çok 5" sınırı fiilen sınanmaz.
- RSS içindeki görsel yolları göreli (`/assets/...`); RSS okuyucularda görsel görünmeyebilir.
- Çizim galerisindeki örnek SVG'ler (`eskizler`, `dijital`) kullanıcının kendi çizimleriyle değiştirilecek placeholder'dır.

**Test yazarken:** Menü `text-transform: lowercase` kullanır, `innerText` küçük harf döner; metin eşleştirmelerini harf duyarsız (`/^ana sayfa$/i`) yaz. Görseller `loading="lazy"`: `naturalWidth`'i `expect.poll` ile bekle. Sayfada TR ve EN için çift bağlantı olabilir: `:visible` ile filtrele.
