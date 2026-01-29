---
layout: default
title: "Traditional Art"
date: 2026-01-29
---

This is a collection of my traditional charcoal and pencil sketches.

<div class="gallery-grid">
{% assign traditional_sketches = site.static_files | where_exp: "file", "file.path contains '/assets/images/drawings/TraditionalSketch_'" | sort: "name" %}
{% for sketch in traditional_sketches %}
  <div class="gallery-item">
    <a href="{{ sketch.path }}" target="_blank">
      <img src="{{ sketch.path }}" alt="{{ sketch.name | replace: sketch.extname, '' }}" style="max-width: 100%; height: auto; border: 1px solid #333;">
    </a>
    <div style="font-size: 0.8em; color: #888; margin-top: 5px;">{{ sketch.name | replace: sketch.extname, '' | replace: 'TraditionalSketch_', 'Sketch #' }}</div>
  </div>
{% endfor %}
</div>
