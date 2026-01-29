---
layout: default
title: Gallery
permalink: /gallery/
---

<div class="gallery-grid">
    {% for category in site.drawings %}
    <div class="gallery-item">
        <a href="{{ category.url | relative_url }}">
            <span class="gallery-icon"><img src="{{ '/assets/gifs/icons/eye.gif' | relative_url }}" style="vertical-align: middle;"></span>
            <div>{{ category.title }}</div>
        </a>
    </div>
    {% endfor %}
</div>
