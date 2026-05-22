# Muhammet Özmen — Kişisel Portfolyo Sitesi

**[muhammetozmen.org](https://muhammetozmen.org)** adresinde yayında olan bu site; gömülü sistemler ve bilgisayar mühendisliği alanında çalışan Muhammet Özmen'in kişisel portfolyo, blog ve özgeçmiş sitesidir.

## Site Hakkında

Bu site [Jekyll](https://jekyllrb.com/) ile oluşturulmuş, **GitHub Pages** üzerinde barındırılan statik bir web sitesidir. İki dilli (Türkçe / İngilizce), karanlık temalı ve tamamen özel CSS ile tasarlanmıştır.

### Sitede Neler Var?

| Bölüm | Açıklama |
|---|---|
| **Ana Sayfa** | Kısa tanıtım, son yazılar ve son projeler |
| **Özgeçmiş** | Eğitim, deneyim, beceriler ve zaman tüneli |
| **Projeler** | Portfolyo niteliğindeki teknik projeler |
| **Devlog** | Gömülü sistemler ve donanım geliştirme günlükleri |
| **Blog** | Gündelik yazılar ve teknik makaleler |
| **Sertifikalar** | Alınan kurslar ve sertifikalar |

## Yerel Geliştirme

### Gereksinimler

- Ruby 3.x
- Bundler

### Kurulum (Arch / CachyOS)

```bash
# 1. Ruby ve derleme araçlarını yükle
sudo pacman -S ruby base-devel

# 2. Bundler'ı yükle
gem install bundler
export PATH=$PATH:$(ruby -e 'puts Gem.user_dir')/bin

# 3. Bağımlılıkları yükle
bundle config set --local path 'vendor/bundle'
bundle install

# 4. Geliştirme sunucusunu başlat
bundle exec jekyll serve
```

Ardından tarayıcında `http://localhost:4000` adresini aç.

## İçerik Ekleme

Detaylı rehber için `DOCUMENTATION.md` dosyasına bakın.

## Yayınlama

`main` branch'e push edildiğinde GitHub Actions otomatik olarak siteyi derleyip yayına alır.

---

**İletişim:** [ozmen.muhammet@outlook.com](mailto:ozmen.muhammet@outlook.com)  
**LinkedIn:** [linkedin.com/in/muhammetozmen](https://linkedin.com/in/muhammetozmen/)  
**GitHub:** [github.com/muhammetozmen](https://github.com/muhammetozmen)  
**YouTube:** [youtube.com/@ozmen-muhammet](https://www.youtube.com/@ozmen-muhammet)
