---
layout: resume
lang: tr
page_id: resume
permalink: /resume
permalink_tr: /resume
---

<!-- =============================================
  SAYFA BAŞLIĞI
  Fotoğraf, biyografi yazısı ve CV indirme butonlarını içerir.
  Görsel: assets/images/resume/ klasöründen alınır
  CV linkleri: assets/ altındaki PDF dosyalarına yönlendirir
============================================= -->
<header class="resume-header">
  <h1 class="resume-page-title">özgeçmiş</h1>
  <div class="resume-bio-container">
    <img src="{{ '/assets/images/resume/myImageDark.png' | relative_url }}" alt="Hüseyin Karitha" class="resume-bio-image dark-only">
    <img src="{{ '/assets/images/resume/myImageLight.png' | relative_url }}" alt="Hüseyin Karitha" class="resume-bio-image light-only">
    <div class="resume-bio-text">
      <p class="resume-bio">Ben Muhammet Özmen, Mardin doğumluyum ve 24 yaşındayım. İskenderun Teknik Üniversitesinde başladığım bilgisayar mühendisliği mesleğime, <b>Gömülü Sistemler & Yazılım Mühendisi</b> olarak devam etmekteyim. 
      <br><br> Teknolojilere hızlı adapte olabilen, öğrenmeye açık ve problem çözme odaklı biriyim. Sürekli olarak bir şeyler üretmekten, aktif olmaktan oldukça keyif alırım, bu sebepten dolayı çeşitli yarışmalarda ve etkinliklerde yer alıyor, gönüllü programlarda aktif bir şekilde yer alıyorum. Şu an aktif olarak ekibimle beraber <b> BİGGVADİ girişim </b> projesinde <b> Yazılım Mimarı olarak </b> çalışmaktayım.
      <br><br> Kişisel hayatımda ise <a href="{{ 'https://backloggd.com/u/thekaritha/' | relative_url }}"> video oyunu oynamayı</a>, <a href="{{ 'https://letterboxd.com/thekaritha/' | relative_url }}">film izlemeyi</a>, <a href="{{ 'https://www.instagram.com/the.karitha/' | relative_url }}">çizim yapmayı</a> severim, boş vakit buldukça uğraşırım.

      <br><br>Teknik olarak; Bare-metal ve Linux (GUI ve headless) kullanıcı alanında STM32/ARM Cortex-M üzerinde C/C++ geliştiriyorum. UART/I2C/SPI, ADC/PWM, DMA ve kesmelere dayalı sürücüler yazıyor; Qt ile masaüstü arayüzleri ve Scada sistemleri geliştiriyor, OpenCV ve TFLite Micro kullanarak cihaz üzerinde çalışabilen yapay zeka modelleri oluşturuyorum. Yapay zeka teknolojilerini yakından takip ediyor, projelerim için fine tuning yaparak lokal yapay zeka modelleri eğitiyorum. Modern yapay zeka teknolojilerini aktif olarak takip ediyor, verimlilik için kendi denetimim doğrultusunda kullanıyorum.
      </p>
    </div>

  </div>
  <div class="resume-cv-links">
    <a href="{{ '/assets/documents/cv-tr.pdf' | relative_url }}" target="_blank" class="resume-cv-link cv-tr">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      {{ site.data.translations.tr.download_cv_tr }}
    </a>
    <a href="{{ '/assets/documents/cv-en.pdf' | relative_url }}" target="_blank" class="resume-cv-link cv-en">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      {{ site.data.translations.tr.download_cv_en }}
    </a>
    <a href="{{ '/certificates' | relative_url }}" class="resume-cv-link cv-certs">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      Sertifikalarım ve Belgelerim
    </a>
  </div>
</header>

<!-- Hızlı gezinti çubukları: Sayfa içi anchor linkleri (Yetenekler, Deneyim, Eğitim, Zaman Tüneli) -->
<nav class="resume-quick-nav reveal">
  <a href="#skills">Yetenekler</a>
  <a href="#experience">Deneyim</a>
  <a href="#education">Eğitim</a>
  <a href="#timeline">Zaman Tüneli</a>
</nav>

<!-- =============================================
  YETENEKLER BÖLÜMÜ
  Her skills-group bir yetenek kategorisini temsil eder.
  Etiket renkleri: kırmızı=donanım, yeşil=firmware,
  mavi=yazılım, sarı=sosyal, turuncu=yapay zeka
============================================= -->
<div id="skills" class="resume-section reveal">
  <h2 class="resume-section-title">Yetenekler</h2>
  <div class="skills-grid">
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_hardware }}" data-lang-tr="{{ site.data.translations.tr.skills_hardware }}">{{ site.data.translations.tr.skills_hardware }}</div>
      <div class="skills-tags">
        <span class="tag tag-hardware">STM32 / ARM Cortex-M</span>
        <span class="tag tag-hardware">Raspberry Pi / NVIDIA Jetson</span>
        <span class="tag tag-hardware">UART / I2C / SPI / GPIO</span>
        <span class="tag tag-hardware">Temel Elektronik</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_firmware }}" data-lang-tr="{{ site.data.translations.tr.skills_firmware }}">{{ site.data.translations.tr.skills_firmware }}</div>
      <div class="skills-tags">
        <span class="tag tag-firmware">Bare-metal C / C++</span>
        <span class="tag tag-firmware">ADC / PWM</span>
        <span class="tag tag-firmware">DMA & Interrupt</span>
        <span class="tag tag-firmware">FreeRTOS</span>
        <span class="tag tag-firmware">HAL / LL Sürücü Geliştirme</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_software }}" data-lang-tr="{{ site.data.translations.tr.skills_software }}">{{ site.data.translations.tr.skills_software }}</div>
      <div class="skills-tags">
        <span class="tag tag-software">C / C++ / Python</span>
        <span class="tag tag-software">Qt (Widgets / QML)</span>
        <span class="tag tag-software">OpenCV</span>
        <span class="tag tag-software">TFLite Micro</span>
        <span class="tag tag-software">Linux Userspace</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_soft }}" data-lang-tr="{{ site.data.translations.tr.skills_soft }}">{{ site.data.translations.tr.skills_soft }}</div>
      <div class="skills-tags">
        <span class="tag tag-soft">Problem Çözme</span>
        <span class="tag tag-soft">Takım Çalışması</span>
        <span class="tag tag-soft">Proje Yönetimi</span>
        <span class="tag tag-soft">Teknik Dokümantasyon</span>
        <span class="tag tag-soft">Öz Öğrenme</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="AI" data-lang-tr="Yapay Zeka">Yapay Zeka</div>
      <div class="skills-tags">
        <span class="tag tag-ai">Lokal AI</span>
        <span class="tag tag-ai">LLM Entegrasyonu</span>
        <span class="tag tag-ai">Agent Control</span>
        <span class="tag tag-ai">Fine Tuning</span>
      </div>
    </div>
  </div>
</div>

<!-- =============================================
  DENİYİM BÖLÜMÜ
  timeline-entry: her bir iş deneyimi
  Yeni deneyim eklemek için aşağıdaki bloklardan birini çoğalt
============================================= -->
<div id="experience" class="resume-section reveal anim-delay-1">
  <h2 class="resume-section-title" data-lang-en="{{ site.data.translations.en.experience }}" data-lang-tr="{{ site.data.translations.tr.experience }}">{{ site.data.translations.tr.experience }}</h2>
  <div class="timeline">

<div class="timeline-entry reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-body">
    <div class="timeline-role">Aday Yazılım Mühendisi</div>
    <div class="timeline-company">Winston Software</div>
    <div class="timeline-date">Şub 2025 — Tem 2025</div>
    <ul class="timeline-bullets">
      <li><strong>Rolüm: LLM Tabanlı Akademik Performans Analizi ve Notlandırma Otomasyonunun yazılımı yazmak</strong>
        <ul>
          <li><strong>OpenAI API</strong> ile öğrenci verilerini analiz eden ve otomatik notlandırma yapan backend sistemi geliştirildi.</li>
          <li><strong>Qt Widgets / QML</strong> ile cross-platform masaüstü arayüzü inşa edildi.</li>
          <li><strong>Speech-to-text pipeline</strong> entegre edilerek LLM sistemine sesli komut desteği eklendi.</li>
          <li><strong>NVIDIA Jetson Nano</strong> headless Linux modunda yapılandırılarak <strong>OpenCV</strong> tabanlı görüntü işleme devreye alındı.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

<div class="timeline-entry reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-body">
    <div class="timeline-role">Gömülü Sistemler & Yazılım Stajyeri</div>
    <div class="timeline-company">Winston Software</div>
    <div class="timeline-date">Tem 2025 — Ağu 2025</div>
    <ul class="timeline-bullets">
      <li><strong>Rolüm: LLM Destekli Sesli Komutlu Akıllı Ev Elektrik Sistemi tasarlamak</strong>
        <ul>
          <li><strong>ESP8266</strong> ve <strong>Raspberry Pi</strong> arasında <strong>UART / I2C / GPIO</strong> haberleşme ve protokol testleri gerçekleştirildi.</li>
          <li><strong>Relay modülleri</strong> ile güç anahtarlama yönetildi; çevresel testler yapılarak donanım kararlılığı doğrulandı.</li>
          <li><strong>Qt tabanlı Python</strong> uygulamasıyla PC ve sesli komut üzerinden sistem kontrolü implemente edildi.</li>
          <li>Linux üzerinde <strong>seri haberleşme</strong> ve <strong>structured logging</strong> altyapısı geliştirilerek hata ayıklama süreci sistematik hale getirildi.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

  </div>
</div>

<!-- =============================================
  EĞİTİM BÖLÜMÜ
  timeline-entry: her bir eğitim girişi
  Okul, bölüm ve tarih bilgilerini içerir
============================================= -->
<div id="education" class="resume-section reveal anim-delay-2">
  <h2 class="resume-section-title" data-lang-en="{{ site.data.translations.en.education }}" data-lang-tr="{{ site.data.translations.tr.education }}">{{ site.data.translations.tr.education }}</h2>
  <div class="timeline">

<div class="timeline-entry reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-body">
    <div class="timeline-role">Bilgisayar Mühendisliği Lisans</div>
    <div class="timeline-company">İskenderun Teknik Üniversitesi</div>
    <div class="timeline-date">Eki 2021 — Ağu 2025</div>
    <ul class="timeline-bullets">
      <li>GPA: 3.3 / 4.0</li>
      <li><strong>Bitirme Projesi:</strong> <strong>YOLO</strong> tabanlı nesne tespiti ve takibi ile <strong>servo/step motor</strong> kontrolünü birleştiren otonom türet sistemi tasarlandı ve implemente edildi.</li>
      <li><strong>Topluluk ve Liderlik Çalışmaları:</strong>
        <ul>
          <li><strong>IEEE Computer Society Başkanlığı:</strong> Topluluk yönetimi üstlenildi; teknik sunumlar ve eğitimler düzenlendi, üye projeleri koordine edildi.</li>
          <li><strong>İskenderun Teknik İHA Topluluğu Başkan Yardımcısı:</strong> TÜBİTAK ve Teknofest'te derece alan projelerin teknik yönetimi ve organizasyonu yürütüldü.</li>
          <li><strong>Hatay T3 Vakfı Eğitmen Mentörü:</strong> Eğitim süreci boyunca öğrencilere teknik mentorluk sağlandı.</li>
          <li>İskenderun Teknopark bünyesinde aktif olarak yer alındı; sektör paydaşlarıyla iş birliği yapıldı.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

  </div>
</div>

<!-- =============================================
  ZAMAN TÜNELİ BÖLÜMÜ
  pt-item: her bir zaman tüneli öğesi
  Tarih, başlık, açıklama ve isteğe bağlı görsel içerir.
  Görsel yoksa img satırını silmek yeterli
============================================= -->
<div id="timeline" class="resume-section reveal anim-delay-2">
  <h2 class="resume-section-title">Zaman Tüneli</h2>
  <div class="photo-timeline">

  <!-- SON -->

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">Mart 2026 - Haziran 2026</span>
      <h3 class="pt-title"> TÜBİTAK 1812 BİGG - Girişim Projesi</h3>
    </div>
    <p class="pt-desc"> Ekibimle TÜBİTAK 1812 BİGG girişimcilik programı kapsamında yatırım tabanlı girişim programının 1. aşamasını başarıyla geçerek BİGGVADİ programına dahil olduk. Ekip arkadaşlarım Umutcan Gökdemir ve Busenur Aygün ile beraber yaratacağımız inovatif çözümlerin ilk adımını başarıyla attık.</p>
    <!-- Çoklu resim: yatay kaydırmalı galeri -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_solaclean.jpg' | relative_url }}" alt="Solo Clean Prototipi" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Sonraki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">Mart 2023 - Ağustos 2025</span>
      <h3 class="pt-title"> T3 Eğitmen Mentörlük</h3>
    </div>
    <p class="pt-desc">T3 Vakfı bünyesindeki Eğitmen Mentörlük programı kapsamında, 2 sene boyunca genç öğrencilere robotik kodlama ve temel elektrik mühendisliği konularında teorik ve uygulamalı eğitimler verdim. Yenilikçi eğitim materyalleri tasarlayarak atölye etkinliklerini koordine ettim ve öğrencilerin teknolojik okuryazarlık ile problem çözme becerilerinin gelişimine mentörlük yaparak katkıda bulundum.</p>
    <!-- Çoklu resim: yatay kaydırmalı galeri -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_t3_1.jpg' | relative_url }}" alt="T3 Hatay Sorumlusu Müslüm Ateş ile" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_t3_2.jpg' | relative_url }}" alt="Öğrencilerle beraber eğitim" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Sonraki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">Haziran 2022 - Ekim 2023</span>
      <h3 class="pt-title"> IEEE İHA Topluluğu</h3>
    </div>
    <p class="pt-desc">IEEE İHA Topluluğu başkan yardımcısı görevim süresince, topluluğun temsil edilmesini sağlamak amacıyla yoğun bir faaliyet programı yürüttüm. Büyük ölçekli etkinliklerin planlanmasından hayata geçirilmesine kadar tüm organizasyon süreçlerini titizlikle yönettim. Bu süreç boyunca GÖKTECH takımının Co-founderliğini yaptım ve bu takım altında onlarca yarışma ve takım projelerine katıldık.</p>
    <!-- Çoklu resim: yatay kaydırmalı galeri -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_iha_1.jpg' | relative_url }}" alt="İskenderun Teknik Üniversitesi Rektörü Prof.Dr. Mehmet DURUEL ile " class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_iha_2.jpg' | relative_url }}" alt="İHA Topluluğu ile Gençlik Merkezi Proje Tanıtımı" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_iha_3.jpg' | relative_url }}" alt="ÜNİDES Jetson Nano Eğitimi" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Sonraki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">Haziran 2022 - Ekim 2023</span>
      <h3 class="pt-title"> IEEE Computer Science Başkanlığı</h3>
    </div>
    <p class="pt-desc"> İskenderun Teknik Üniversitesi IEEE Computer Society Başkanlığı görevim süresince, ulusal ve uluslararası standartlarda etkinlikler ve eğitimler düzenleyerek hem üye gelişimini destekledim hem de topluluğun görünürlüğünü artırdım. Bu dönemde, büyük ölçekli organizasyonların planlanmasından yürütülmesine kadar tüm süreçleri bizzat yönettim. Ayrıca, TÜBİTAK ve Teknofest gibi platformlarda finale kalan projelerin mentorluğunu üstlenerek genç mucitlere rehberlik ettim. Bu roller, hem teknik liderlik hem de takım yönetimi becerilerimi en üst düzeyde kullanmamı sağladı.</p>
    <!-- Çoklu resim: yatay kaydırmalı galeri -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_ieee_1.jpg' | relative_url }}" alt="IEEE Topluluk Sunumu" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_ieee_2.jpg' | relative_url }}" alt="Baykar Fabrika Gezisi" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_ieee_3.jpg' | relative_url }}" alt="IEEE Okulda Topluluk Tanıtımı" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_ieee_4.jpg' | relative_url }}" alt="IEEE Yazılım Eğitimi" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Sonraki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">Temmuz 2022 - Ağustos 2022</span>
      <h3 class="pt-title">Teknofest 2023 Turizm Finalisti</h3>
    </div>
    <p class="pt-desc">Türkiye'nin en büyük havacılık, uzay ve teknoloji festivali olan Teknofest'te İskenderun Teknik Üniversitesi'ni temsilen Turizm Teknolojileri kategorisinde finale kaldık. Projemizde makine öğrenmesi kullanarak turistik yer yorumlarını analiz eden, puanlama ve öneri sistemi geliştirdim. Projenin yazılım ve sunumunu üstlenerek ekibimizi başarıyla temsil ettim.</p>
    <!-- Çoklu resim: yatay kaydırmalı galeri -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_teknofest_1.jpg' | relative_url }}" alt="TÜBİTAK Başkanı Hasan Mandalı ile fotoğrafımız " class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_teknofest_2.jpg' | relative_url }}" alt="Teknofest 2022'nin ilk günü hatırası " class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_teknofest_3.jpg' | relative_url }}" alt="Prof. Dr. Hasan Mandal'a projemizi sunarken " class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Sonraki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">Ekim 2021 - Ağustos 2025</span>
      <h3 class="pt-title">İskenderun Teknik Üniversitesi Bilgisayar Mühendisliği Eğitimi</h3>
    </div>
    <p class="pt-desc">4 yıl boyunca mühendislik ve doğa bilimleri fakültesinde bilgisayar mühendisliği bölümünde eğitim aldım. Bu süre zarfında birçok proje yaptım ve birçok şey öğrendim, harika dostluklar kurdum.</p>
    <!-- Çoklu resim: yatay kaydırmalı galeri -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_iste_1.jpeg' | relative_url }}" alt="İskenderun Teknik Üniversitesi" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_iste_2.jpeg' | relative_url }}" alt="Mezuniyet günü" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Sonraki">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    <br>
  </div>
  </div>
  
</div>
<style>html { scroll-behavior: smooth; }</style>
