---
layout: default
lang: en
page_id: certificates
permalink: /certificates
permalink_tr: /tr/certificates
---

<div class="certificates-wrap page-content">
  <header class="certificates-header reveal">
    <h1 class="certificates-page-title" data-lang-en="Certificates & Documents" data-lang-tr="Sertifikalar ve Belgeler">Certificates & Documents</h1>
  </header>

  {% assign certificates = site.static_files | where_exp: "file", "file.path contains 'assets/documents/certificates'" | where_exp: "file", "file.extname == '.pdf'" %}

  {% if certificates.size > 0 %}
    <div class="certificates-grid reveal-group">
      {% for cert in certificates %}
        {% assign filename = cert.path | split: '/' | last | replace: '.pdf', '' | replace: '_', ' ' | replace: '-', ' ' | capitalize %}
        <div class="certificate-card reveal">
          <div class="certificate-preview-container">
            <canvas class="certificate-pdf-preview" data-pdf="{{ cert.path | relative_url }}"></canvas>
          </div>
          <div class="certificate-meta">
            <h3 class="certificate-title">{{ filename }}</h3>
            <a href="{{ cert.path | relative_url }}" target="_blank" class="certificate-download-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>View / Download</span>
            </a>
          </div>
        </div>
      {% endfor %}
    </div>
  {% else %}
    <div class="no-certificates reveal">
      <div class="no-certificates-icon">📜</div>
      <p data-lang-en="No certificates have been uploaded yet. Please check back later!" data-lang-tr="Henüz herhangi bir sertifika yüklenmedi. Lütfen daha sonra tekrar kontrol edin!">No certificates have been uploaded yet. Please check back later!</p>
    </div>
  {% endif %}
</div>
