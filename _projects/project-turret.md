---
layout: project
title_en: "Autonomous Vehicle Threat Assessment Integration – Graduation Project"
title_tr: "Otonom Araç Tehdit Değerlendirme Entegrasyonu – Bitirme Projesi"
date: 2025-10-17
year: 2025
type: [hardware, firmware, software]
status: completed
ai_translated: true
thumbnail: /assets/images/projects/project-turret/turet-1.png
image: /assets/images/projects/project-turret/turet-1.png
description_en: "A locally-running threat assessment module built for my senior capstone — detects armed/unarmed persons with YOLOv8 and tracks them with a two-axis servo turret."
description_tr: "Bitirme projem için geliştirilen yerel çalışan bir tehdit değerlendirme modülü — YOLOv8 ile silahlı/silahsız kişiyi tespit eder ve iki eksenli servo türetle takip eder."
tags: [YOLOv8, Python, Arduino, OpenCV, PySide6, Servo, Embedded]
github: "https://github.com/muhammetozmen"
text_en: |
  ## Project Purpose and Scope

  This project is my senior capstone (Undergraduate, 4th year, Fall 2025) completed at İskenderun Technical University. The thesis was accepted and successfully defended. Because of that, some words in images or diagrams are in Turkish.

  You can access the full, more detailed thesis <a href="/assets/images/projects/project-turret/212523019_muhammet_ozmen_final.pdf" target="_blank">here</a>.

  A **locally running** threat-assessment module was developed to be mounted on urban-security-oriented autonomous/semi-autonomous systems. From the camera stream, it determines in real time whether a **person is armed or unarmed**, reports status and coordinates to the host PC, and simultaneously tracks the target with a two-axis turret. The system is designed to be integrated into drones or ground robots via a lightweight gimbal structure.

  ---

  ## General Operating Principle

  - **Perception (Model):** Webcam frames are processed with **YOLOv8**; person/weapon objects and center coordinates are extracted.
  - **Decision:** The state is classified into three categories: `A = Unarmed Person`, `B = Armed Person`, `C = None`. Time tolerances are applied to handle brief occlusions of the weapon/person.
  - **Action (Turret):** Horizontal/vertical servos move according to coordinate error; a **laser** and an **RGB LED** are used as status indicators.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-1.png" alt="Prototype – Front view">
    <br>
    <em>Prototype – Front view</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-2.png" alt="Prototype – Left and front views">
    <br>
    <em>Prototype – Left and front views</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-3.png" alt="Prototype – Top view">
    <br>
    <em>Prototype – Top view</em>
  </p>

  ---

  ## Hardware Architecture

  - **Microcontroller:** Arduino UNO (ample I/O, sufficient processing power, serial communication).
  - **Servos:** 2× **MG90S** (metal gears, ~1.5 kg·cm torque class).
  - **Indicators:** 5V **laser** module and **RGB LED** module.
  - **Power:** Servos powered from a dedicated **5V/1.5A adapter** for stability; other modules from the Arduino.
  - **Imaging:** USB **2 MP webcam** (power and data via PC).
  - **Mechanics:** Gimbal/turret parts 3D-printed in **ABS** (strength) and **PLA** (light weight); wood used for base/frame parts.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-4.png" alt="Circuit schematic">
    <br>
    <em>Circuit – Schematic of the prototype</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-5.png" alt="Tinkercad schematic">
    <br>
    <em>Circuit – Prototype schematic in Tinkercad</em>
  </p>

  ---

  ## Software Structure

  ### 1) PC Application

  - **Language / Libraries:** Python, **YOLOv8**, OpenCV, **PySide6** (GUI).
  - **Workflow:** Capture frame → detect person/weapon with YOLOv8 → extract class and coordinates → apply time tolerances → compose **serial message** → send to Arduino.
  - **Time Tolerances:** `GUN_WAIT = 10 s`, `MAN_WAIT = 1 s` (maintains stability even if the weapon/person is briefly occluded).
  - **Serial Protocol:**

  ```
  {center_x:03}{center_y:03}{C3}{C4}\n
  C3 ∈ {A, B, C}   # state
  C4 ∈ {Y, N}      # laser on/off
  ```

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-6.png" alt="Application flowchart">
    <br>
    <em>Application software flowchart</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-7.png" alt="Turret firmware flowchart">
    <br>
    <em>Turret (firmware) software flowchart</em>
  </p>

  ### 2) Turret (Arduino Firmware)

  - **Pins:** RGB LED (2–4), Horizontal servo (5), Vertical servo (6), Laser (7), Serial 9600 baud.
  - **State Management:**
    - `A` (unarmed): LED = green, target tracking active
    - `B` (armed): LED = red, target tracking + optional laser
    - `C` (none): LED = blue, **scan mode** (sweep left–right)
  - **Motion:** Screen center `(320, 240)` as reference; if error > tolerance, increment/decrement per axis; clamp vertical 0–90°, horizontal 0–180°.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-8.png" alt="Unarmed person response">
    <br>
    <em>Prototype response when an UNARMED person is detected</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-9.png" alt="Armed person response">
    <br>
    <em>Prototype response when an ARMED person is detected</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-10.png" alt="Idle response">
    <br>
    <em>Prototype response when IDLE (scan mode)</em>
  </p>

  ---

  ## Model (YOLOv8) Training

  - **Base model:** Fine-tuned `yolov8l.pt` with close-range data.
  - **Hyperparameters:** `epochs = 64`, `batch = 8`; dataset focused on short-distance/altitude scenarios.
  - **Outputs:** Label/prediction samples and validation with field video frames.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-11.png" alt="Unarmed detection bounding box">
    <br>
    <em>Application – Bounding box when an unarmed person is detected</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-12.png" alt="Armed detection bounding box">
    <br>
    <em>Application – Bounding box when an ARMED person is detected</em>
  </p>

  ---

  ## Differences from Other Solutions

  - **Fully Local Processing:** No cloud dependency — privacy and offline operation advantages.
  - **Portable Integrated Design:** Easily added to various mobile platforms (drone / UGV).
  - **Active Tracking Camera:** 2-axis servo tracking unlike static security cameras.
  - **Objective:** **Vehicle/robot situational awareness** rather than fixed-infrastructure security.

  Comparison examples: commercial systems such as **SafePointe** and **Xtract One**.

  ---

  ## Challenges and Solutions

  - **Insufficient servo current →** Added a dedicated **5V/1.5A** adapter, separated data lines, reduced noise.
  - **Narrow field of view →** Extended with an external camera + rotatable turret.
  - **Incompatible motion algorithm →** Switched from coordinate-based to **distance-based** control.
  - **Image quality / model stability →** Balanced temporary losses using time tolerances (10 s).

  ---

  ## Conclusion

  The **perception–decision–action** chain was implemented end-to-end: local threat detection with YOLOv8, transfer to the turret via a serial protocol, servo-based target tracking, and visual status indicators — all combined in a single module. The integration-oriented design provides **plug-and-play** flexibility for real-world platforms (drone, UGV).

text_tr: |
  ## Projenin Amacı ve Kapsamı

  Bu proje, İskenderun Teknik Üniversitesi'nde tamamladığım lisans bitirme tezimdir (4. sınıf, Güz 2025). Tez kabul edilmiş ve başarıyla savunulmuştur.

  Tezin tamamına <a href="/assets/images/projects/project-turret/212523019_muhammet_ozmen_final.pdf" target="_blank">buradan</a> ulaşabilirsiniz.

  Kent güvenliğine yönelik otonom/yarı otonom sistemlere entegre edilmek üzere **yerel çalışan** bir tehdit değerlendirme modülü geliştirilmiştir. Sistem, kamera görüntüsünden bir **kişinin silahlı mı yoksa silahsız mı** olduğunu gerçek zamanlı olarak belirler, durum ve koordinat bilgisini ana bilgisayara iletir ve eş zamanlı olarak hedefi iki eksenli bir türetle takip eder. Tasarım, hafif bir gimbal yapısı aracılığıyla insansız hava araçlarına veya kara araçlarına entegre edilebilecek şekilde kurgulanmıştır.

  ---

  ## Genel Çalışma Prensibi

  - **Algılama (Model):** Web kamerası görüntüleri **YOLOv8** ile işlenir; kişi/silah nesneleri ve merkez koordinatları çıkarılır.
  - **Karar:** Durum üç kategoriye ayrılır: `A = Silahsız Kişi`, `B = Silahlı Kişi`, `C = Yok`. Silah/kişinin kısa süreli gizlenmesi durumlarına karşı zaman toleransları uygulanır.
  - **Eylem (Türet):** Yatay/dikey servolar koordinat hatasına göre hareket eder; durum göstergesi olarak **lazer** ve **RGB LED** kullanılır.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-1.png" alt="Prototip – Ön görünüm">
    <br>
    <em>Prototip – Ön görünüm</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-2.png" alt="Prototip – Sol ve ön görünüm">
    <br>
    <em>Prototip – Sol ve ön görünüm</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-3.png" alt="Prototip – Üst görünüm">
    <br>
    <em>Prototip – Üst görünüm</em>
  </p>

  ---

  ## Donanım Mimarisi

  - **Mikrodenetleyici:** Arduino UNO (yeterli pin sayısı, seri haberleşme).
  - **Servolar:** 2× **MG90S** (metal dişli, ~1,5 kg·cm tork sınıfı).
  - **Göstergeler:** 5V **lazer** modülü ve **RGB LED** modülü.
  - **Güç:** Stabilite için servolar ayrı bir **5V/1,5A adaptör**den beslenir; diğer modüller Arduino'dan beslenir.
  - **Görüntüleme:** USB **2 MP web kamerası** (güç ve veri PC üzerinden).
  - **Mekanik:** Gimbal/türet parçaları **ABS** (dayanıklılık) ve **PLA** (hafiflik) ile 3D baskı; taban/çerçeve parçaları için ahşap kullanılmıştır.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-4.png" alt="Devre şeması">
    <br>
    <em>Devre – Prototip şeması</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-5.png" alt="Tinkercad şeması">
    <br>
    <em>Devre – Tinkercad'de prototip şeması</em>
  </p>

  ---

  ## Yazılım Yapısı

  ### 1) PC Uygulaması

  - **Dil / Kütüphaneler:** Python, **YOLOv8**, OpenCV, **PySide6** (GUI).
  - **Akış:** Kare yakala → YOLOv8 ile kişi/silah tespit et → sınıf ve koordinatları çıkar → zaman toleranslarını uygula → **seri mesaj** oluştur → Arduino'ya gönder.
  - **Zaman Toleransları:** `GUN_WAIT = 10 s`, `MAN_WAIT = 1 s` (silah/kişi kısa süreliğine gizlendiğinde bile kararlılığı korur).
  - **Seri Protokol:**

  ```
  {center_x:03}{center_y:03}{C3}{C4}\n
  C3 ∈ {A, B, C}   # durum
  C4 ∈ {Y, N}      # lazer açık/kapalı
  ```

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-6.png" alt="Uygulama akış şeması">
    <br>
    <em>Uygulama yazılımı akış şeması</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-7.png" alt="Türet firmware akış şeması">
    <br>
    <em>Türet (firmware) yazılımı akış şeması</em>
  </p>

  ### 2) Türet (Arduino Firmware)

  - **Pinler:** RGB LED (2–4), Yatay servo (5), Dikey servo (6), Lazer (7), Seri 9600 baud.
  - **Durum Yönetimi:**
    - `A` (silahsız): LED = yeşil, hedef takibi aktif
    - `B` (silahlı): LED = kırmızı, hedef takibi + isteğe bağlı lazer
    - `C` (yok): LED = mavi, **tarama modu** (sola–sağa tarama)
  - **Hareket:** Ekran merkezi `(320, 240)` referans; hata > tolerans ise her eksende artır/azalt; dikey 0–90°, yatay 0–180° ile sınırlandırılır.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-8.png" alt="Silahsız kişi tespiti">
    <br>
    <em>SİLAHSIZ kişi tespit edildiğinde prototip tepkisi</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-9.png" alt="Silahlı kişi tespiti">
    <br>
    <em>SİLAHLI kişi tespit edildiğinde prototip tepkisi</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-10.png" alt="Boşta modu">
    <br>
    <em>BOŞ durumda prototip tepkisi (tarama modu)</em>
  </p>

  ---

  ## Model (YOLOv8) Eğitimi

  - **Temel model:** Yakın mesafe verileriyle ince ayar yapılmış `yolov8l.pt`.
  - **Hiperparametreler:** `epochs = 64`, `batch = 8`; veri seti kısa mesafe/yükseklik senaryolarına odaklıdır.
  - **Çıktılar:** Etiket/tahmin örnekleri ve saha video kareleriyle doğrulama.

  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-11.png" alt="Silahsız kişi bounding box">
    <br>
    <em>Uygulama – Silahsız kişi tespit edildiğinde sınırlayıcı kutu</em>
  </p>
  <p align="center">
    <img src="/assets/images/projects/project-turret/turet-12.png" alt="Silahlı kişi bounding box">
    <br>
    <em>Uygulama – SİLAHLI kişi tespit edildiğinde sınırlayıcı kutu</em>
  </p>

  ---

  ## Diğer Çözümlerden Farkları

  - **Tamamen Yerel İşleme:** Bulut bağımlılığı yok; gizlilik ve çevrimdışı çalışma avantajı.
  - **Taşınabilir Entegre Tasarım:** Farklı mobil platformlara (drone / KİHA) kolayca eklenebilir.
  - **Aktif Takip Kamerası:** Statik güvenlik kameralarından farklı olarak 2 eksenli servo takibi.
  - **Hedef:** Sabit altyapı güvenliği yerine **araç/robot durumsal farkındalığı**.

  Karşılaştırma örnekleri: **SafePointe** ve **Xtract One** gibi ticari sistemler.

  ---

  ## Karşılaşılan Zorluklar ve Çözümler

  - **Yetersiz servo akımı →** Ayrı **5V/1,5A adaptör** eklendi, veri hatları ayrıldı, gürültü azaltıldı.
  - **Dar görüş açısı →** Harici kamera + döndürülebilir türet ile genişletildi.
  - **Uyumsuz hareket algoritması →** Koordinat tabanlıdan **mesafe tabanlı** kontrole geçildi.
  - **Görüntü kalitesi / model kararlılığı →** Geçici kayıplar zaman toleranslarıyla (10 s) dengelendi.

  ---

  ## Sonuç

  **Algılama–Karar–Eylem** zinciri uçtan uca hayata geçirildi: YOLOv8 ile yerel tehdit tespiti, seri protokol aracılığıyla türete aktarım, servo tabanlı hedef takibi ve görsel durum göstergeleri tek bir modülde birleştirildi. Entegrasyon odaklı tasarım, gerçek dünya platformları (drone, KİHA) için **tak-çalıştır** esnekliği sağlamaktadır.
---
