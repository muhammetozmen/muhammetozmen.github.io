---
layout: home
lang: en
page_id: home
permalink: /
permalink_tr: /tr/
---

<!-- Giriş metni -->
<div class="hero reveal">
  <h1 class="hero-name">muhammet özmen</h1>
  <div class="hero-title"><span class="loop-text" id="hero-loop" data-lang="en">Embedded Systems and Computer Engineer</span></div>
  <p class="hero-desc">Hi, I'm Muhammet. I am a computer engineer working on embedded systems. This is my personal website where you can learn a lot about me.
  <br> On this site, you can explore my technical blogs <a href="{{ '/devlogs' | relative_url }}">devlogs</a>, my daily writings <a href="{{ '/blog' | relative_url }}">blogs</a>, or my portfolio-style <a href="{{ '/projects' | relative_url }}">projects</a>.
  <br> If you want to learn more about me, you can access my CV, skills, and chronologically ordered timeline in the <a href="{{ '/resume' | relative_url }}">resume</a> section.
  </p>
</div>

<div class="home-section reveal anim-delay-3">
  <div class="home-section-label">recent activity</div>
  
  <div class="recent-section-divider">
    <span>recent posts</span>
  </div>
  <div class="recent-grid">
    {% assign all_posts = site.posts | sort: 'date' | reverse %}
    {% for post in all_posts limit:4 %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
  <br>

  <div class="recent-section-divider">
    <span>recent projects</span>
  </div>
  <div class="home-projects-gallery-wrap pt-gallery-wrap">
    <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <div class="projects-grid pt-gallery">
      {% assign projects = site.projects | sort: 'date' | reverse %}
      {% for project in projects limit:4 %}
        {% include project-card.html post=project %}
      {% endfor %}
    </div>
    <button class="pt-gallery-btn pt-gallery-btn-next" data-target-url="{{ '/projects' | relative_url }}" aria-label="Next">
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
  </div>
  <br>
</div>
