# Muhammet ÖZMEN'in Websitesi

Kişisel portfolyo ve yazı sitesi. [Jekyll](https://jekyllrb.com/) ile üretilir, GitHub Pages'te yayınlanır. Her sayfa tek adreste Türkçe ve İngilizce.

## Yerelde çalıştırma

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
npm ci && npm test         # Playwright testleri (kendi sunucusunu 4001'de açar)
```

## İçerik ekleme

- **Yazı:** `_posts/YYYY-MM-DD-slug.md` (`category: teknik|genel`, `tr_keyword`, `en_keyword`)
- **Proje:** `_projects/slug.md`
- **Portfolyo:** `_portfolio/` altındaki dört dosyadan ilgilisine yeni bir `##` kaydı
- **Çizim:** `assets/cizimler/<kategori>/dosya.svg|png|jpg|webp`

Ayrıntılı kurallar: [`.claude/CLAUDE.md`](.claude/CLAUDE.md).
