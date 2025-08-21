---
layout: page
title: Hakkımda
permalink: /about/
lang: tr
---

<div class="about-container">

  <div class="profile-section">
    <div class="profile-image">
      {% include image.html url="profile.jpeg" width=250 align="center" %}
    </div>
    <div class="profile-info">
      <h1>Muhammet Özmen</h1>
      <p class="profile-title">Junior Gömülü Yazılım Mühendisi</p>
      <p class="profile-description">
        STM32/ARM Cortex-M üzerinde bare-metal ve Linux kullanıcı alanında C/C++ geliştiriyorum. 
        UART/I2C/SPI, ADC/PWM, DMA ve kesmelere dayalı sürücüler yazıyor; Qt ile masaüstü arayüz, 
        OpenCV ve TFLite Micro ile cihaz üzerinde AI modelleri geliştiriyorum. IoT ve LLM tabanlı projelerim var.
      </p>
    </div>
  </div>

  <div class="content-grid">

    <div class="info-card">
      <h3>🎓 Eğitim</h3>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">2021 - 2025</div>
          <div class="timeline-content">
            <h4>Lisans - Bilgisayar Mühendisliği</h4>
            <p>İskenderun Teknik Üniversitesi, İskenderun/Hatay</p>
            <span class="badge">GNO: 3.30</span>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2015 - 2019</div>
          <div class="timeline-content">
            <h4>Hadi Kahraman Fen Lisesi</h4>
            <p>Kızıltepe/Mardin</p>
            <span class="badge">GNO: 78,5</span>
          </div>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h3>💼 Deneyim</h3>
      <div class="experience-list">
        <div class="experience-item">
          <h4>Kısa Dönem Staj - Winton Yazılım</h4>
          <p class="experience-period">Tem 2025 – Ağu 2025</p>
          <p>LLM tabanlı akıllı ev prototipi geliştirdim, ESP + Raspberry Pi entegrasyonu, UART/I2C ve GPIO testleri yaptım, PC ve sesli komutla kontrol sağladım.</p>
        </div>
        <div class="experience-item">
          <h4>Uzun Dönem Staj - Winton Yazılım</h4>
          <p class="experience-period">Oca 2025 – Haz 2025</p>
          <p>LLM tabanlı akademik performans analitiği ve notlandırma otomasyonu geliştirdim. Qt ile çapraz platform arayüz ve Jetson Nano üzerinde görüntü işleme projeleri yaptım.</p>
        </div>
        <div class="experience-item">
          <h4>Co-founder - GÖK-TECH</h4>
          <p class="experience-period">Eki 2024 – Haz 2025</p>
          <p>Üniversite öğrencileri için proje geliştirme topluluğu kurucu ortağı. TÜBİTAK ve Teknofest için 10’dan fazla proje koordinasyonu yaptım.</p>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h3>🤝 Gönüllülük ve Topluluklar</h3>
      <div class="experience-list">
        <div class="experience-item">
          <h4>Eğitmen Mentorluk - T3 Vakfı</h4>
          <p class="experience-period">Mar 2023 – Günümüz</p>
          <p>Robotik kodlama ve temel elektrik mühendisliği eğitimleri verdim, atölye etkinliklerini yönettim.</p>
        </div>
        <div class="experience-item">
          <h4>UNIDES Eğitmenliği</h4>
          <p class="experience-period">Şub 2025 – Mar 2025</p>
          <p>Jetson Nano üzerinde Embedded Linux eğitimi verdim; temel terminal, GPIO kontrolü ve Python entegrasyonu öğrettim.</p>
        </div>
        <div class="experience-item">
          <h4>Başkan Yardımcısı - İSTE İHA Topluluğu</h4>
          <p class="experience-period">Eki 2024 – Haz 2025</p>
          <p>Proje yönetimi ve yeni üye mentorluk süreçlerini yürüttüm.</p>
        </div>
        <div class="experience-item">
          <h4>Computer Science Başkanı - IEEE İSTE</h4>
          <p class="experience-period">Haz 2022 – Eki 2023</p>
          <p>Python eğitimleri organize ettim, uygulamalı atölyeler düzenledim.</p>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h3>🚀 Projeler</h3>
      <ul class="skills-list">
        <li><strong>Doğal Dil İşleme Tabanlı Turistik Yer Değerlendirme Sistemi</strong> – Teknofest Finalisti</li>
        <li><strong>Esenlik</strong> – Teknofest 2025 Uluslararası İHA Yarışması, Yarı Finalist</li>
        <li><strong>Alahçın</strong> – Teknofest 2025 Helikopter Tasarımı, Yarı Finalist</li>
        <li><strong>Turret (Bitirme Projesi):</strong> YOLOv ile hedef tespiti, step motor ile otomatik yönlendirme</li>
        <li><strong>LLM Akademik Analitik:</strong> Öğrenci not değerlendirme sistemi</li>
        <li><strong>LLM Sesli Akıllı Ev:</strong> ESP8266 + Qt ile ev otomasyonu</li>
        <li><strong>Mediapipe Robot El:</strong> El hareketi tanıma ve Arduino tabanlı servo kontrol</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>🛠️ Yetenekler</h3>
      <ul class="skills-list">
        <li>Rust, C/C++ ve gömülü C ile bare-metal programlama</li>
        <li>STM32 ve Raspberry Pi üzerinde UART, GPIO, I2C protokolleri</li>
        <li>Linux headless mode, bash terminal</li>
        <li>Python (NumPy, OpenCV, TensorFlow vb.)</li>
        <li>YOLO, Haar Cascades ile görüntü işleme</li>
        <li>SQLite ve MySQL ile veri tabanı</li>
        <li>Qt ile arayüz geliştirme, MVC uyumu</li>
        <li>IoT sistemleri ve AI entegrasyonu</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>🌐 Dil Yetenekleri</h3>
      <div class="skills-grid">
        <div class="skill-item">
          <span class="skill-name">Türkçe</span>
          <span class="skill-level">Anadil</span>
        </div>
        <div class="skill-item">
          <span class="skill-name">İngilizce</span>
          <span class="skill-level">(Berlitz Level 5, CEFR B1.1),(YÖKDİL 64)</span>
        </div>
      </div>
    </div>

    <div class="info-card">
      <h3>🎯 Sosyal Beceriler</h3>
      <ul class="skills-list">
        <li>Öz öğrenim, adaptiflik ve hızlı problem çözme</li>
        <li>Etkili sunum ve ikna edicilik</li>
        <li>Proje yönetimi ve detaycılık</li>
        <li>Kaynak yönetimi, verimlilik ve sorumluluk</li>
        <li>Stres yönetimi ve sabırlılık</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>🎨 Hobiler</h3>
      <ul class="skills-list">
        <li>Linux kişiselleştirme (ricing) ve optimizasyon</li>
        <li>Teknoloji blogları okuma/yazma</li>
        <li>Retro teknoloji tamiri ve koleksiyonu</li>
      </ul>
    </div>

  </div>

  <div class="contact-section">
    <h3>🔗 Bağlantılarım</h3> 
    <div class="contact-grid">
      <div class="contact-item">
        <span class="contact-icon">➤</span>
        <div><strong>E-mail:</strong> <a href="mailto:ozmen.muhammet@outlook.com">ozmen.muhammet@outlook.com</a></div>
      </div>
      <div class="contact-item">
        <span class="contact-icon">➤</span>
        <div><strong>Youtube:</strong> <a href="https://youtube.com/@ozmen-muhammet?si=_MP0_bzutwiZXDhU">@ozmen-muhammet</a></div>
      </div>
      <div class="contact-item">
        <span class="contact-icon">➤</span>
        <div><strong>GitHub:</strong> <a href="https://github.com/muhammetozmen" target="_blank">github.com/muhammetozmen</a></div>
      </div>
      <div class="contact-item">
        <span class="contact-icon">➤</span>
        <div><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/muhammetozmen" target="_blank">linkedin.com/in/muhammetozmen</a></div>
      </div>
    </div>
  </div>

  <div class="cta-section">
    <p>Alt kategorilerden <a href="/cv/">CV'me ve Portfolyo'ma</a> ulaşabilirsiniz.</p>
  </div>

</div>


<style>
.about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.profile-section {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, lighten(#1a1a1a, 5%), lighten(#1a1a1a, 3%));
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.profile-image {
    flex-shrink: 0;
}

.profile-info h1 {
    color: #4a9eff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.profile-title {
    color: #64b5f6;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 500;
}

.profile-description {
    color: #e0e0e0;
    line-height: 1.7;
    font-size: 1.1rem;
}

.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.info-card {
    background: lighten(#1a1a1a, 3%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #404040;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.info-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: #4a9eff;
}

.info-card h3 {
    color: #4a9eff;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    border-bottom: 2px solid #4a9eff;
    padding-bottom: 0.5rem;
}

.timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.timeline-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.timeline-date {
    background: #4a9eff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
}

.timeline-content h4 {
    color: #e0e0e0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.timeline-content p {
    color: #b0b0b0;
    margin-bottom: 0.5rem;
}

.badge {
    background: #64b5f6;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}

.experience-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.experience-item {
    padding: 1rem;
    background: lighten(#1a1a1a, 2%);
    border-radius: 8px;
    border-left: 3px solid #4a9eff;
}

.experience-item h4 {
    color: #e0e0e0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.experience-period {
    color: #64b5f6;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.experience-item p {
    color: #b0b0b0;
    line-height: 1.6;
}

.skills-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.skill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: lighten(#1a1a1a, 2%);
    border-radius: 8px;
    border: 1px solid #404040;
}

.skill-name {
    color: #e0e0e0;
    font-weight: 600;
}

.skill-level {
    color: #64b5f6;
    font-size: 0.9rem;
}

.skills-list {
    list-style: none;
    padding: 0;
}

.skills-list li {
    color: #b0b0b0;
    margin-bottom: 1rem;
    padding: 1rem;
    background: lighten(#1a1a1a, 2%);
    border-radius: 8px;
    border-left: 3px solid #4a9eff;
    line-height: 1.6;
}

.contact-section {
    background: lighten(#1a1a1a, 3%);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #404040;
    margin-bottom: 2rem;
}

.contact-section h3 {
    color: #4a9eff;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: lighten(#1a1a1a, 2%);
    border-radius: 8px;
    border: 1px solid #404040;
}

.contact-icon {
    font-size: 1.5rem;
}

.contact-item div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.contact-item strong {
    color: #e0e0e0;
    font-size: 0.9rem;
}

.contact-item a {
    color: #64b5f6;
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-item a:hover {
    color: #4a9eff;
}

.cta-section {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #4a9eff, #64b5f6);
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.cta-section a {
    color: white;
    text-decoration: underline;
    font-weight: 600;
}

.cta-section a:hover {
    text-decoration: none;
}

@media (max-width: 768px) {
    .profile-section {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
    }
    
    .content-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline-item {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .skill-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .contact-grid {
        grid-template-columns: 1fr;
    }
}
</style>
