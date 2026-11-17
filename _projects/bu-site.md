---
title: "Kişisel Web Sitesi"
title_en: "Personal Website"
date: 2026-11-01
description: "Jekyll ile üretilen, iki dilli, bakımı kolay portfolyo ve yazı sitesi. Görünümü 2003 tarihli SimpleBits sayfasından esinlendi."
description_en: "A bilingual, low-maintenance portfolio and writing site built with Jekyll. Its look is inspired by a 2003 SimpleBits page."
tags: [Jekyll, Liquid, CSS, JavaScript, Playwright, GitHub Actions]
github: "https://github.com/muhammetozmen/muhammetozmen.github.io"
---
<div lang="tr" markdown="1">

## Amaç

Portfolyomu ve yazılarımı tek yerde, bakımı en az çaba isteyen bir yapıda yayınlamak.

## Özellikler

- **Tek dosyada iki dil.** Her sayfanın Türkçe ve İngilizce metni aynı Markdown dosyasında durur. Dil düğmesi adresi değiştirmeden görünen bloğu değiştirir. Tercih tarayıcıda saklanır.
- **Açık ve koyu tema.** Sayfa çizilmeden önce uygulanır, yanlış temanın bir an görünmesi engellenir.
- **Çizim galerisi.** `assets/cizimler/<kategori>/` klasörüne konan görseller kategori olarak otomatik listelenir.
- **Çerçevesiz teknoloji.** Çerçeve ve paketleyici yok: tek CSS, tek JavaScript dosyası, yalnızca RSS eklentisi.
- **Testli yayın.** Playwright testleri GitHub Actions'ta çalışır, testler geçmeden site yayınlanmaz.

</div>
<div lang="en" markdown="1">

## Purpose

To publish my portfolio and writing in one place, in a structure that needs as little maintenance as possible.

## Features

- **Two languages in one file.** The Turkish and English text of each page live in the same Markdown file. The language button swaps the visible block without changing the address. The choice is stored in the browser.
- **Light and dark theme.** Applied before the first paint so the wrong theme never flashes.
- **Drawing gallery.** Images placed in `assets/cizimler/<category>/` are listed automatically, one section per folder.
- **No frameworks.** No framework or bundler: one CSS file, one JavaScript file, only the RSS plugin.
- **Tested deploys.** Playwright tests run in GitHub Actions, and the site is not published unless they pass.

</div>
