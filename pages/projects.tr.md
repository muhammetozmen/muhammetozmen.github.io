---
layout: default
lang: tr
page_id: projects
permalink: /tr/projects
permalink_tr: /tr/projects
---
<div class="projects-wrap page-content">
  <header class="projects-header reveal">
    <h1 class="projects-page-title" data-lang-en="{{ site.data.translations.en.projects_title }}" data-lang-tr="{{ site.data.translations.tr.projects_title }}">{{ site.data.translations.tr.projects_title }}</h1>
  </header>

  <div class="projects-grid reveal-group">
    {% assign projects = site.projects | sort: 'date' | reverse %}
    {% for project in projects %}
      {% include project-card.html post=project %}
    {% endfor %}
  </div>
</div>
