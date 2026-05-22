---
layout: project
title_en: "Vishand – Vision-Based Robot Hand Control"
title_tr: "Vishand – Görüntü Tabanlı Robot El Kontrolü"
date: 2025-08-21
year: 2025
type: [hardware, firmware, software]
status: completed
ai_translated: true
thumbnail: https://img.youtube.com/vi/JaMeOAFJH1Y/0.jpg
image: https://img.youtube.com/vi/JaMeOAFJH1Y/0.jpg
description_en: "A robot hand controlled in real time via webcam — MediaPipe tracks finger curl ratios and sends them to Arduino servos over serial."
description_tr: "Web kamerası aracılığıyla gerçek zamanlı kontrol edilen bir robot el — MediaPipe parmak bükülme oranlarını takip eder ve bunları seri port üzerinden Arduino servolara iletir."
tags: [Python, OpenCV, MediaPipe, PyQt6, Arduino, PySerial, Servo]
github: "https://github.com/muhammetozmen/vishand"
text_en: |
  ## Robot Hand Project: Arduino Control with Vision-Based Gesture Recognition

  A vision-based robot hand control project developed using a **PyQt6 interface, OpenCV, and MediaPipe**. The goal is to process hand movements captured by a camera, calculate finger curl ratios, and send this data to an Arduino via serial port. The Arduino maps these values to the servo motors of the robot hand.

  [![Vishand – Demo Video](https://img.youtube.com/vi/JaMeOAFJH1Y/0.jpg)](https://youtu.be/JaMeOAFJH1Y)

  ---

  ## General Principle

  The project is built on three core principles:

  1. **Hand tracking and landmark extraction (MediaPipe + OpenCV)**
     Captured frames are processed and finger joint positions are detected.

  2. **Mathematical calculations (Python functions)**
     Finger curl ratios (0.0–1.0) are calculated from the detected coordinates. A special angle-based calculation is applied for the thumb.

  3. **Hardware integration (PySerial + Arduino)**
     Calculated data is transmitted as strings to the Arduino and mapped to servo motors.

  ---

  ## Software Architecture

  The project is split into focused modules:

  - **`main.py`** — Manages the interface, camera, and MediaPipe processing loop.
  - **`dist_calculations.py`** — Mathematical functions for finger curl calculations.
  - **`app_serial.py`** — Handles serial communication with the Arduino.
  - **`ui_main.py`** — Auto-generated Qt Designer interface code.

  ---

  ## Interface

  Built with **PyQt6**. Two main buttons: **Reset Hand** and **Control Hand**. A central `QGraphicsView` displays the live camera feed with the MediaPipe hand skeleton overlaid.

  ---

  ## Hand Motion Processing

  OpenCV continuously captures frames. MediaPipe Hands extracts 21 key landmarks per hand (e.g. index finger: landmarks 5–8, middle: 9–12). Curl ratios are computed per finger:

  ```python
  self.curl_ratio["index"] = calc.calculate_finger_curl(
      self.landmarks["index"][0].y,
      self.landmarks["index"][2].y,
      self.landmarks["index"][3].y,
      self.handsize
  )
  ```

  The thumb uses a dedicated angle-based function (`calculate_thumb_curl`). Palm size is measured via `calculate_palm_ratio` to correct perspective distortions.

  ---

  ## Hand Orientation Check

  To prevent sending incorrect values when the hand is mis-oriented, the code validates hand rotation before processing. If the hand is facing the wrong way, a warning is shown:

  ```python
  cv2.putText(frame, "Your hand is in the wrong orientation, show your palm!", (0, 50), ...)
  ```

  ---

  ## Serial Communication

  `app_serial.py` includes **automatic Arduino port detection** — no need to manually select COM or ttyUSB ports. Data is sent as:

  ```python
  def send_data(data):
      if ser and ser.is_open:
          ser.write((data + '\n').encode('utf-8'))
  ```

  Transmitted format:

  ```
  0.0-0.5-1.0-0.7-0.3-0.9
  ```

  Values represent (in order): wrist, thumb, index, middle, ring, and pinky curl ratios.

  ---

  ## Conclusion

  This project unites **computer vision** and **robotic hardware control**. Key strengths:

  - Accurate finger tracking via MediaPipe.
  - Mathematical normalization ensures reliable results across different hand sizes.
  - Automatic serial port detection.
  - Clean PyQt6 interface.

  A solid foundation for extensions such as prosthetic control or VR/AR applications.

text_tr: |
  ## Robot El Projesi: Görüntü Tabanlı Hareket Tanıma ile Arduino Kontrolü

  **PyQt6 arayüzü, OpenCV ve MediaPipe** kullanılarak geliştirilen görüntü tabanlı bir robot el kontrol projesi. Kamera tarafından yakalanan el hareketlerini işlemek, parmak bükülme oranlarını hesaplamak ve bu veriyi seri port aracılığıyla Arduino'ya göndermek temel amaçtır. Arduino bu değerleri robot elin servo motorlarını kontrol etmek için kullanır.

  [![Vishand – Demo Video](https://img.youtube.com/vi/JaMeOAFJH1Y/0.jpg)](https://youtu.be/JaMeOAFJH1Y)

  ---

  ## Genel Çalışma Prensibi

  Proje üç temel ilke üzerine inşa edilmiştir:

  1. **El takibi ve landmark çıkarımı (MediaPipe + OpenCV)**
     Yakalanan kareler işlenir ve parmak eklem konumları tespit edilir.

  2. **Matematiksel hesaplamalar (Python fonksiyonları)**
     Tespit edilen koordinatlardan parmak bükülme oranları (0,0–1,0) hesaplanır. Başparmak için özel açı tabanlı bir hesaplama uygulanır.

  3. **Donanım entegrasyonu (PySerial + Arduino)**
     Hesaplanan veriler Arduino'ya string olarak iletilir ve servo motorlara eşlenir.

  ---

  ## Yazılım Mimarisi

  Proje odaklanmış modüllere ayrılmıştır:

  - **`main.py`** — Arayüz, kamera ve MediaPipe işleme döngüsünü yönetir.
  - **`dist_calculations.py`** — Parmak bükülme hesaplamaları için matematiksel fonksiyonlar.
  - **`app_serial.py`** — Arduino ile seri haberleşmeyi yönetir.
  - **`ui_main.py`** — Qt Designer ile oluşturulan arayüz kodu.

  ---

  ## Arayüz

  **PyQt6** ile geliştirilmiştir. İki ana buton: **Reset Hand** ve **Control Hand**. Merkezdeki `QGraphicsView` bileşeni, üzerine MediaPipe el iskeleti çizilmiş canlı kamera görüntüsünü gösterir.

  ---

  ## El Hareketi İşleme

  OpenCV sürekli olarak kare yakalar. MediaPipe Hands, her el için 21 anahtar landmark çıkarır (örn. işaret parmağı: 5–8, orta parmak: 9–12). Her parmak için bükülme oranı hesaplanır:

  ```python
  self.curl_ratio["index"] = calc.calculate_finger_curl(
      self.landmarks["index"][0].y,
      self.landmarks["index"][2].y,
      self.landmarks["index"][3].y,
      self.handsize
  )
  ```

  Başparmak, özel bir açı tabanlı fonksiyon (`calculate_thumb_curl`) ile işlenir. Perspektif bozulmalarını düzeltmek için `calculate_palm_ratio` ile avuç içi boyutu ölçülür.

  ---

  ## El Yönü Kontrolü

  Elin yanlış yönde tutulması durumunda hatalı değer gönderilmesini önlemek için kod, işleme başlamadan önce el dönüşünü doğrular. Yanlış yöndeyse ekranda uyarı gösterilir:

  ```python
  cv2.putText(frame, "Your hand is in the wrong orientation, show your palm!", (0, 50), ...)
  ```

  ---

  ## Seri Haberleşme

  `app_serial.py`, **otomatik Arduino port tespiti** içerir — COM veya ttyUSB portunu manuel olarak seçmeye gerek yoktur. Veriler şu şekilde gönderilir:

  ```python
  def send_data(data):
      if ser and ser.is_open:
          ser.write((data + '\n').encode('utf-8'))
  ```

  İletilen format:

  ```
  0.0-0.5-1.0-0.7-0.3-0.9
  ```

  Değerler sırasıyla şunu temsil eder: bilek, başparmak, işaret, orta, yüzük ve serçe parmak bükülme oranları.

  ---

  ## Sonuç

  Bu proje **bilgisayarlı görü** ve **robotik donanım kontrolünü** bir araya getirmektedir. Temel güçlü yönleri:

  - MediaPipe sayesinde hassas parmak takibi.
  - Matematiksel normalizasyon ile farklı el boyutlarında güvenilir sonuçlar.
  - Otomatik seri port tespiti.
  - Temiz PyQt6 arayüzü.

  Protez kontrolü veya VR/AR uygulamaları gibi alanlara genişletilmek için sağlam bir temel sunmaktadır.
---
