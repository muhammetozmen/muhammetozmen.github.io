---
layout: project
title_en: "MÜDEK – Voice-Assisted Grade Entry Application"
title_tr: "MÜDEK – Sesli Not Giriş Uygulaması"
date: 2025-08-25
year: 2025
type: [software]
status: completed
ai_translated: true
thumbnail: https://raw.githubusercontent.com/muhammetozmen/mudek/main/images/img1.png
image: https://raw.githubusercontent.com/muhammetozmen/mudek/main/images/img1.png
description_en: "A desktop application that speeds up student grade entry into MÜDEK-compliant Excel templates using voice recognition and manual input."
description_tr: "MÜDEK uyumlu Excel şablonlarına öğrenci notlarının sesli tanıma ve manuel giriş ile hızlıca girilmesini sağlayan masaüstü uygulaması."
tags: [Python, Speech-Recognition, Excel, PyQt6, AI]
github: "https://github.com/muhammetozmen/mudek"
text_en: |
  ## Purpose and Scope

  This application was developed during my internship period at **WINTON SOFTWARE** as part of İskenderun Technical University's Workplace Professional Education (İME) program. The goal was to solve a real pain point: entering student grades manually into **MÜDEK**-compliant Excel sheets is slow and error-prone. This tool makes the process fast, accurate, and hands-free.

  <p align="center">
    <img src="https://raw.githubusercontent.com/muhammetozmen/mudek/main/images/img1.png" alt="MÜDEK Grade Entry – Main Interface">
    <br>
    <em>Main application interface</em>
  </p>

  ---

  ## Features

  - **Voice-based grade entry** — speak grades out loud, the app transcribes and fills them in
  - **Manual (keyboard) entry** — as a fallback or for precision
  - **Multi-student support** — enter grades for multiple students in a single session
  - **Excel-compatible output** — writes directly into the MÜDEK-format spreadsheet
  - **AI model selection** — choose which speech recognition model to use

  ---

  ## How It Works

  On startup, you configure the exam details and table settings. The table settings let you define which Excel columns map to student names and IDs, which row the student list begins on, and which AI model handles transcription. These should only be changed if you know what you're doing.

  <p align="center">
    <img src="https://raw.githubusercontent.com/muhammetozmen/mudek/main/images/img2.png" alt="MÜDEK Grade Entry – Settings Screen">
    <br>
    <em>Table settings screen</em>
  </p>

  After configuration, select the entry mode (single student or batch), then press **Select Student**. Two pop-ups appear in sequence — one to capture the student number by voice, one to capture the grades. Speak in chunks with "ve" between segments for better recognition accuracy (e.g., "212 ve 523 ve 019"). Once all grades are entered, save the file via **File > Save**.

  ---

  ## Installation

  ```bash
  pip install -r requirements.txt
  python main.py
  ```

text_tr: |
  ## Projenin Amacı ve Kapsamı

  Bu uygulama, İskenderun Teknik Üniversitesi İME (İşyeri Mesleki Eğitim) sürecinde **WINTON YAZILIM** bünyesinde geliştirilmiştir. Temel motivasyon, **MÜDEK** uyumlu Excel şablonlarına öğrenci notlarının manuel olarak girilmesinin yavaş ve hata eğilimli olmasıdır. Bu araç süreci hızlı, doğru ve ellere gerek kalmadan gerçekleştirilebilir hale getirir.

  <p align="center">
    <img src="https://raw.githubusercontent.com/muhammetozmen/mudek/main/images/img1.png" alt="MÜDEK Not Giriş – Ana Arayüz">
    <br>
    <em>Uygulama ana arayüzü</em>
  </p>

  ---

  ## Özellikler

  - **Sesli not girişi** — notları sesli söyleyin, uygulama transkribe edip doldurur
  - **Manuel (klavye) girişi** — yedek seçenek veya hassas giriş için
  - **Çoklu öğrenci desteği** — tek oturumda birden fazla öğrencinin notu girilebilir
  - **Excel uyumlu çıktı** — MÜDEK formatındaki tabloya doğrudan yazar
  - **AI model seçimi** — hangi konuşma tanıma modelinin kullanılacağını seçin

  ---

  ## Nasıl Çalışır

  Uygulama başlatıldığında sınav bilgilerini ve tablo ayarlarını yapılandırırsınız. Tablo ayarları; öğrenci adı ve numarasının hangi Excel sütunlarına karşılık geldiğini, öğrenci listesinin hangi satırdan başladığını ve transkripsiyon için hangi AI modelinin kullanılacağını tanımlamanıza olanak tanır. Bu ayarlar yalnızca ne yaptığınızı biliyorsanız değiştirilmelidir.

  <p align="center">
    <img src="https://raw.githubusercontent.com/muhammetozmen/mudek/main/images/img2.png" alt="MÜDEK Not Giriş – Ayarlar Ekranı">
    <br>
    <em>Tablo ayarları ekranı</em>
  </p>

  Yapılandırmanın ardından giriş modunu (tekli veya toplu öğrenci) seçin, ardından **Öğrenci Seç** butonuna basın. Sırasıyla iki pop-up açılır — biri öğrenci numarasını sesli almak, diğeri notları sesli almak için. Daha iyi tanıma doğruluğu için notları parça parça ve araya "ve" koyarak söyleyin (örn. "212 ve 523 ve 019"). Tüm notlar girildikten sonra **Dosya > Dosyayı Kaydet** ile kaydı tamamlayın.

  ---

  ## Kurulum

  ```bash
  pip install -r requirements.txt
  python main.py
  ```
---
