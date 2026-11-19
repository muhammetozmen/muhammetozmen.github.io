---
layout: page
title: Çizimlerim
title_en: Drawings
hide_title: true
description: "Eskizler ve dijital çizimlerim."
description_en: "My sketches and digital drawings."
permalink: /drawings/
sitemap: false
---
<div lang="tr" markdown="1">

Çizimlerim kategorilere göre aşağıda.

</div>
<div lang="en" markdown="1">

My drawings are listed below by category.

</div>

{%- comment %}
  Galeri: assets/drawings/<kategori>/ klasörleri otomatik kategori olur, .md gerekmez.
  shortcut: yalnızca küçük harfli uzantılar (.jpg, .svg…) ve bir alt klasör derinliği taranır;
  doğrudan assets/drawings/ altına konan dosya kategori sayılır. Gerekirse klasör zorunlu kılınır.
{% endcomment %}
{% assign exts = ".png .jpg .jpeg .gif .webp .svg" | split: " " %}
{% assign imgs = site.static_files | where_exp: "f", "f.path contains '/assets/drawings/'" | where_exp: "f", "exts contains f.extname" %}
{% assign groups = imgs | group_by_exp: "f", "f.path | remove_first: '/assets/drawings/' | split: '/' | first" %}
{% for g in groups %}
<h3 class="cat">{{ g.name | replace: "-", " " }}</h3>
<div class="gallery">
{%- for f in g.items %}
  <a href="{{ f.path | relative_url }}"><img loading="lazy" src="{{ f.path | relative_url }}" alt="{{ f.basename | replace: '-', ' ' }}"></a>
{%- endfor %}
</div>
{% endfor %}
