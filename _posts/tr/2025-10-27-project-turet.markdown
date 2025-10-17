---
layout: post
title: "Tehdit Değerlendiren Otonom Araç Entegresi – Bitirme Projesi"
lang: tr
date: 17-10-2025
description: "YOLOv8 tabanlı yakın-mesafe tehdit değerlendirme, hareketli kamera takibi ve Arduino kontrollü lazer/LED ile otonom araç entegrasyonu"
categories: [proje]
connection: https://muhammetozmen.github.io/assets/post_images/turet/212523019_muhammet_ozmen_final.pdf
---

## Projenin Amacı ve Kapsam
Proje benim İskenderun Teknik Üniversite'sinde Lisans 4. sınıf 1. dönem 2025 bitirme tezimdir. Tezim kabul aldı ve başarıyla geçtim.

Çok daha detaylı ve kapsamlı olan bitirme tezinin kendisine 
<a href="/assets/post_images/turet/212523019_muhammet_ozmen_final.pdf" target="_blank">
şuradan ulaşabilirsiniz
</a>.

Şehir içi güvenlik odaklı otonom/yarı-otonom sistemlere takılabilecek, **lokal çalışan** bir tehdit değerlendirme modülü geliştirildi. Kamera görüntüsünden **silahlı-silahsız kişi** durumunu anlık belirleyip ana bilgisayara durum ve koordinat bilgisini iletir; aynı anda iki eksenli turret ile hedefi takip eder. Sistem, drone veya kara robotlarına hafif gimbal yapısı ile entegre edilebilecek şekilde tasarlandı. 

---

## Genel Çalışma Prensibi

* **Algılama (Model):** Webcam görüntüsü **YOLOv8** ile işlenir; kişi/silah nesneleri ve merkez koordinatlar çıkarılır.
* **Karar:** Durum 3 sınıftan biri olarak belirlenir: `A=Silahsız İnsan`, `B=Silahlı İnsan`, `C=Hiç Kimse/Yok`. Silah/görünürlük gizlenmelerine karşı zaman toleransları uygulanır.
* **Eylem (Turret):** Koordinat hatasına göre yatay/dikey servo hareket eder; **laser** ve **RGB LED** durum göstergesi olarak kullanılır. 

<p align="center">
  <img src="/assets/post_images/turet/turet-1.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin ön görünümü</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-2.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin sol ve önden görünümü</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-3.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin üstten görünümü</em>
</p>

---

## Donanım Mimarisi

* **Mikrodenetleyici:** Arduino UNO (pin zenginliği, yeterli işlemci gücü ve seri haberleşme).
* **Servo:** 2× **MG90S** (çelik dişli, ~1.5 kg.cm tork sınıfı).
* **Göstergeler:** 5V **lazer** modülü ve **RGB LED** modülü.
* **Besleme:** Stabil çalışması için servo beslemesi harici **5V/1.5A adaptörden**, diğer modüller Arduino’dan.
* **Görüntü:** USB **2 MP webcam** (PC’den güç/veri).
* **Mekanik:** Gimbal/turret parçaları 3B baskı (**ABS** – dayanım, **PLA** – hafiflik); kaide/iskelet parçalarda ahşap. 

<p align="center">
  <img src="/assets/post_images/turet/turet-4.png" alt="Turret Görseli">
  <br>
  <em>Devre Görseli – Prototipin devre şematiği</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-5.png" alt="Turret Görseli">
  <br>
  <em>Devre Görseli – Prototipin devre şematiği Tinkercad</em>
</p>

---

## Yazılım Yapısı

### 1) Uygulama (PC tarafı)

* **Dil/Kütüphaneler:** Python, **YOLOv8**, OpenCV, **PySide6** (GUI).
* **İş Akışı:** Kameradan kare → YOLOv8 ile kişi/silah algılama → sınıf ve koordinat çıkarımı → zaman toleransları → **seri mesaj** oluşturma → Arduino’ya gönderim.
* **Zaman Toleransları:** `GUN_WAIT=10s`, `MAN_WAIT=1s` (silah/insan kısa süre gizlense de istikrar korunur).
* **Seri Protokol:**

  ```
  {center_x:03}{center_y:03}{C3}{C4}\n
  C3 ∈ {A,B,C}   # durum
  C4 ∈ {Y,N}     # lazer açık/kapalı
  ```
* **Sınıf Başına Nesne Sınırı:** Örn. `{0:1, 1:1}` (insan=0, silah=1). 

<p align="center">
  <img src="/assets/post_images/turet/turet-6.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin Application yazılımı akış şeması</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-7.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin Turet yazılımı akış şeması</em>
</p>

### 2) Turret (Arduino tarafı)

* **Pinler:** RGB LED (2–4), Yatay servo (5), Dikey servo (6), Lazer (7), Serial 9600.
* **Durum Yönetimi:**

  * `A` (silahsız): LED=yeşil, hedef takibi aktif
  * `B` (silahlı): LED=kırmızı, hedef takibi + opsiyonel lazer
  * `C` (yok): LED=mavi, **tarama modu** (sağ-sol süpürme)
* **Hareket:** Ekran merkezi `(320,240)` referans; fark > tolerans ise eksen bazlı artış/azalış; dikey açı 0–90°, yatay 0–180° sınırlandırma. 

<p align="center">
  <img src="/assets/post_images/turet/turet-8.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin SİLAHSIZ insan tespitinde tepkisi</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-9.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin SİLAHLI insan tespitinde tepkisi</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-10.png" alt="Turret Görseli">
  <br>
  <em>Turret Görseli – Prototipin BOŞTA tepkisi</em>
</p>

---

## Model (YOLOv8) Eğitimi ve Test

* **Taban model:** `yolov8l.pt` üzerine yakın çekim verilerle ince ayar.
* **Örnek hiperparametreler:** `epochs=64`, `batch=8`; kısa mesafe/irtifa senaryolarına odaklı veri düzeni.
* **Çıktılar:** Etiket/prediction örnekleri ve saha video kareleriyle doğrulama. 

<p align="center">
  <img src="/assets/post_images/turet/turet-11.png" alt="Turret Görseli">
  <br>
  <em>Uygulama Görseli – Uygulamanın silahsız insan görünce kutulaması</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-12.png" alt="Turret Görseli">
  <br>
  <em>Uygulama Görseli – Uygulamanın SİLAHLI insan görünce kutulaması</em>
</p>

---

## Diğer Çözümlerden Farklar

* **Tamamen Lokal İşleme:** Bulut yok; gizlilik ve offline çalışma avantajı.
* **Taşınabilir Entegre Tasarım:** Farklı mobil platformlara (drone/UGV) eklenebilir.
* **Takipli Kamera:** 2 eksen servo ile aktif hedef takibi (güvenlik kameralarından farklı).
* **Amaç:** Sabit yapı güvenliğinden ziyade **araç/robot durumsal farkındalığı**.
  Karşılaştırma yapılan örnekler: **SafePointe, Xtract One** gibi ticari sistemler. 

---

## Karşılaşılan Problemler ve Çözümler

* **Servo akımı yetersizdi →** Harici **5V/1.5A** adaptör eklendi, veri hatları ayrıldı, parazit azaltıldı.
* **Görüş açısı dardı →** Harici kamera + dönebilen turret ile genişletildi.
* **Hareket algoritması uyumsuzdu →** Koordinat-temelli yerine **uzaklık tabanlı** modele geçildi.
* **Görüntü kalitesi/model tutarlılığı →** Zaman toleransları (10 sn) ile **geçici kayıplar** dengelendi. 

---

## Kaynakça

* Ultralytics YOLO (Raspberry Pi rehberi ve sonuçların çoğaltılması)
* SoundThinking – Stealth Weapons Detection
* Xtract One – AI Powered Weapon Detection System 

---

## Sonuç

Projede, **algılama–karar–eylem** zinciri bir arada çalıştırıldı: YOLOv8 ile yerel tehdit algılama, seri protokolle turret’e aktarım, servo tabanlı hedef takibi ve görsel durum göstergeleri tek modülde toplandı. Entegrasyon odaklı tasarım, gerçek sistemlere (drone, UGV) **hızlı tak-çalıştır** esnekliği sağlıyor. 
