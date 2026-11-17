---
layout: page
title: Yazılarım
title_en: Writing
hide_title: true
description: "Yazılarım: teknik ve genel yazılar."
description_en: "My writing: technical and general posts."
permalink: /yazilarim/
---
<form class="search" role="search" onsubmit="return false">
<label for="post-search"><span lang="tr">Ara:</span><span lang="en">Search:</span></label>
<input type="search" id="post-search" autocomplete="off">
</form>

{%- comment %}
  Arama dizini: kelimeler, başlık ve düz metin (TR ve EN ayrı; kramdown çıktısında TR bloğu önce gelir). Sıralama site.js'te.
{% endcomment %}
<script type="application/json" id="post-index">
[{% for p in site.posts %}{% assign parts = p.content | split: '<div lang="en"' %}{"url":{{ p.url | jsonify }},"title":{{ p.title | jsonify }},"title_en":{{ p.title_en | jsonify }},"tr_keyword":{{ p.tr_keyword | jsonify }},"en_keyword":{{ p.en_keyword | jsonify }},"tr":{{ parts[0] | strip_html | jsonify }},"en":{{ parts[1] | strip_html | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}]
</script>

{% for cat in site.data.post_categories %}
{% assign cat_posts = site.posts | where: "category", cat.key %}
<section class="postcat">
<h3>{% include bi.html tr=cat.tr en=cat.en %}</h3>
{% if cat_posts.size > 0 %}{% include entry-list.html items=cat_posts date=true %}{% else %}<p class="note empty"><span lang="tr">Henüz yazı yok.</span><span lang="en">No posts yet.</span></p>{% endif %}
</section>
{% endfor %}

<p id="no-results" class="note" hidden><span lang="tr">Eşleşen yazı bulunamadı.</span><span lang="en">No matching posts.</span></p>
