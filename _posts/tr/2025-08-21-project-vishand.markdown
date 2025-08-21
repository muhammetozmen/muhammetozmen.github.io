---
layout: post
title: "Vishand Projesi Çalışma Prensibi Hakkında "
lang: tr
date: 21-08-2025
description: "Görsel tabanlı bir jest tanıma sistemi ile robot el hareketini nasıl yaptığıma dair bir yazı"
categories: [proje]
connection: https://github.com/muhammetozmen/vishand
---

## Robot El Projesi: Görsel Tabanlı Jest Tanıma ile Arduino Kontrolü

Bu yazıda, PyQt6 tabanlı bir arayüz, OpenCV ve MediaPipe kullanılarak geliştirilen görsel tabanlı bir robot el kontrol projemi inceleyeceğiz. Projemin temel amacı, kameradan alınan el hareketlerini işleyip parmak bükülme oranlarını hesaplayarak bu bilgileri Arduino’ya seri port üzerinden göndermek. Arduino tarafında ise bu veriler kullanılarak robot elin servo motorları kontrol ediliyor. Aşağıdaki projeyi denerken çekilen bir videoyu izleyebilirsiniz.

[![Robot El Projesi - Video](https://img.youtube.com/vi/JaMeOAFJH1Y/0.jpg)](https://youtu.be/JaMeOAFJH1Y)

---

### Genel Prensip

Proje üç temel prensip üzerine inşa edilmiştir:

1. **El takibi ve işaret çıkarımı (MediaPipe + OpenCV)**
   Kamera aracılığıyla elde edilen görüntüler işlenerek parmak eklem noktaları tespit edilir.

2. **Matematiksel hesaplama (Python fonksiyonları)**
   Elde edilen koordinatlar üzerinden parmakların bükülme oranı (0.0–1.0 arası) hesaplanır. Başparmak için özel bir açı tabanlı hesaplama yapılır.

3. **Donanım entegrasyonu (PySerial + Arduino)**
   Hesaplanan veriler string formatında Arduino’ya iletilir ve servo motorlara aktarılır.

---

### Projenin Yazılım Mimarisi

Proje farklı dosyalara bölünerek modüler hale getirilmiştir:

* **`main.py`**: Arayüz, kamera ve MediaPipe işleme döngüsünü yönetir.
* **`dist_calculations.py`**: Parmak bükülme oranlarını hesaplayan matematiksel fonksiyonlar içerir.
* **`app_serial.py`**: Arduino ile seri haberleşmeyi sağlar.
* **`ui_main.py`**: Qt Designer ile oluşturulan görsel arayüzün otomatik üretilmiş kodudur.

---

### Arayüz ve Görsel Bileşenler

Arayüz **PyQt6** ile tasarlanmış olup, `ui_main.py` dosyasında iki temel buton bulunur:

* **Eli Resetle**
* **Eli Kontrol Et**

Merkezde ise bir `QGraphicsView` bileşeni vardır. Burada kamera görüntüsü ve MediaPipe’in çizdiği el iskeleti kullanıcıya gösterilir.

---

### El Hareketi İşleme

`main.py` içinde **OpenCV** aracılığıyla sürekli olarak kamera kareleri alınır. MediaPipe Hands modeli sayesinde elin 21 anahtar noktası çıkarılır.

Örneğin:

* İşaret parmağı: 5–8 numaralı landmarklar
* Orta parmak: 9–12 numaralı landmarklar

Ardından `dist_calculations.py` içindeki fonksiyonlarla parmak bükülme oranı hesaplanır:

```python
self.curl_ratio["index"] = calc.calculate_finger_curl(
    self.landmarks["index"][0].y,
    self.landmarks["index"][2].y,
    self.landmarks["index"][3].y,
    self.handsize
)
```

Başparmak için özel bir açı hesaplaması yapılır (`calculate_thumb_curl`). Elin avuç içi boyutu da `calculate_palm_ratio` fonksiyonuyla ölçülerek perspektif hataları düzeltilir.

---

### El Pozisyonu Kontrolü

Kod, hatalı yönlenmiş ellerde yanlış veri göndermemek için bir **rotasyon kontrolü** içerir. Eğer el kamera karşısında uygun açıyla durmuyorsa, kullanıcıya ekranda uyarı mesajı gösterilir:

```python
cv2.putText(frame, "Eliniz yanlis yonde, avuc icinizi gosterin!", (0, 50), ...)
```

Bu sayede sadece doğru şekilde tutulmuş eller işlenir.

---

### Arduino ile Haberleşme

`app_serial.py` dosyasında **Arduino portunu otomatik bulma** fonksiyonu yer alır. Bu sayede cihazın bağlı olduğu COM veya ttyUSB portu elle seçmek zorunda kalınmaz.

Veriler şu şekilde seri porta gönderilir:

```python
def send_data(data):
    if ser and ser.is_open:
        ser.write((data + '\n').encode('utf-8'))
```

Gönderilen format örneği:

```
0.0-0.5-1.0-0.7-0.3-0.9
```

Bu ifade sırasıyla bilek, başparmak, işaret, orta, yüzük ve serçe parmak bükülme oranlarını temsil eder.

---

### Sonuç ve Değerlendirme

Bu proje, **görsel işleme** ile **robotik donanım kontrolünü** bir araya getiriyor. Başlıca güçlü yönleri:

* MediaPipe sayesinde yüksek doğrulukla parmak tespiti.
* Matematiksel normalizasyon ile farklı el boyutlarında da doğru ölçüm.
* Seri haberleşmenin otomatik port bulma özelliği.
* PyQt6 ile kullanıcı dostu arayüz.

Proje, bilgisayarla görme tabanlı insan-makine etkileşimi konularında güzel bir örnek oluşturuyor. Geliştirilerek farklı robotik sistemlerde (ör. protez kontrolü, VR/AR uygulamaları) kullanılabilecek bir temel sunuyor.