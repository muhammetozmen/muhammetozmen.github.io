---
layout: default
title: "Digital Art"
date: 2026-01-29
---

This is a collection of my digital artworks and illustrations.

<div class="gallery-grid">
{% assign digital_art = site.static_files | where_exp: "file", "file.path contains '/assets/images/drawings/DigitalSketch_'" | sort: "name" %}
{% for artwork in digital_art %}
  <div class="gallery-item">
    <a href="{{ artwork.path }}" target="_blank">
      <img src="{{ artwork.path }}" alt="{{ artwork.name | replace: artwork.extname, '' }}" style="max-width: 100%; height: auto; border: 1px solid #333;">
    </a>
    <div style="font-size: 0.8em; color: #888; margin-top: 5px;">{{ artwork.name | replace: artwork.extname, '' | replace: 'DigitalSketch_', 'Digital #' }}</div>
  </div>
{% endfor %}
</div>
