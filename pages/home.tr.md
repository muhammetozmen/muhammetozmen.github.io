---
layout: home
lang: tr
page_id: home
permalink: /
permalink_tr: /
---

<!-- Giriş metni -->
<div class="hero reveal">
  <h1 class="hero-name">muhammet özmen</h1>
  <div class="hero-title"><span class="loop-text" id="hero-loop" data-lang="tr">Gömülü Sistemler ve Bilgisayar Mühendisi</span></div>
  <p class="hero-desc">Selam, ben <strong>Muhammet</strong>. Gömülü sistemler üzerine çalışan bir bilgisayar mühendisiyim. Burası benim hakkımda çok fazla şey öğrenebileceğiniz kişisel web sitem.
  <br> Bu sitede teknik bloglar olan <a href="{{ '/devlogs' | relative_url }}">devloglarım</a>, gündelik yazılar olan <a href="{{ '/blog' | relative_url }}">bloglarımı</a> veya portfolyo niteliğindeki <a href="{{ '/projects' | relative_url }}">projelerimi</a> inceleyebilirsiniz.
  <br> Benim hakkımda daha fazla şey öğrenmek istiyorsanız <a href="{{ '/resume' | relative_url }}">özgeçmiş</a> kısmında CV'me, becerilerime ve kronolojik sıralanmış zaman tünelime ulaşabilirsiniz.
  </p>
</div>



<!-- =============================================
  SON AKTİVİTELER BÖLÜMÜ
  Son blog yazıları ve projeleri listeler.
  limit:4 → en fazla 4 öğe göster
  post-card.html ve project-card.html şablonlarını kullanır
============================================= -->
<div class="home-section reveal anim-delay-3">
  <div class="home-section-label">son aktiviteler</div>
  
  <div class="recent-section-divider">
    <span>son yazılar</span>
  </div>
  <!-- Son yazılar: _posts klasöründeki tüm yazılardan en yeni 4 tanesi -->
  <div class="recent-grid">
    {% assign all_posts = site.posts | sort: 'date' | reverse %}
    {% for post in all_posts limit:4 %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
  <br>

  <div class="recent-section-divider">
    <span>son projeler</span>
  </div>
  <div class="home-projects-gallery-wrap pt-gallery-wrap">
    <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Önceki">
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <div class="projects-grid pt-gallery">
      {% assign projects = site.projects | sort: 'date' | reverse %}
      {% for project in projects limit:4 %}
        {% include project-card.html post=project %}
      {% endfor %}
    </div>
    <button class="pt-gallery-btn pt-gallery-btn-next" data-target-url="{{ '/projects' | relative_url }}" aria-label="Sonraki">
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
  </div>
  <br>
</div>
