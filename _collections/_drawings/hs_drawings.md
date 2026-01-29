---
layout: default
title: "High School Drawings"
date: 2026-01-29
---

This is a collection of my old sketches from high school.

<div class="gallery-grid">
{% assign hs_drawings = site.static_files | where_exp: "file", "file.path contains '/assets/images/drawings/HighSchoolSketch_'" | sort: "name" %}
{% for drawing in hs_drawings %}
  <div class="gallery-item">
    <a href="{{ drawing.path }}" target="_blank">
      <img src="{{ drawing.path }}" alt="{{ drawing.name | replace: drawing.extname, '' }}" style="max-width: 100%; height: auto; border: 1px solid #333;">
    </a>
    <div style="font-size: 0.8em; color: #888; margin-top: 5px;">{{ drawing.name | replace: drawing.extname, '' | replace: 'HighSchoolSketch_', '#' }}</div>
  </div>
{% endfor %}
</div>
