---
layout: page
title: Yazılarım
permalink: /blog/
lang: tr
---

<div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #e0e0e0; padding: 1rem 0;">

  {% assign posts_lang = site.posts | where: "lang", page.lang %}
  {% if posts_lang == empty %}
    <div style="background-color: #2a2a2a; border-left: 5px solid #4a9eff; padding: 1rem 1.5rem; border-radius: 6px; color: #e0e0e0;">
      <p style="margin: 0; font-size: 1.1rem;">
        Henüz hiçbir yazım yok. <em>Söz, sadece şimdilik :)</em>
      </p>
    </div>
  {% else %}

    <!-- Proje Yazıları Kategorisi -->
    <div style="margin-bottom: 3rem;">
      <h2 style="color: #4a9eff; border-bottom: 2px solid #4a9eff; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
        &#128187; Proje Yazılarım
      </h2>
      <ul class="listing" style="list-style-type: none; padding-left: 0;">
        {% assign project_posts = posts_lang | where_exp: "post", "post.categories contains 'proje' or post.categories contains 'project'" %}
        {% if project_posts.size > 0 %}
          {% for post in project_posts %}
            <li class="listing-item" style="margin: 0.5rem 0; padding: 0.5rem; background-color: #2a2a2a; border-radius: 4px; transition: background-color 0.3s ease;">
              <time datetime="{{ post.date | date: '%Y-%m-%d' }}" style="color: #b0b0b0; margin-right: 0.5rem; font-size: 0.9rem;">
                {{ post.date | date: "%d-%m-%Y" }}
              </time>
              <a href="{{ post.url | relative_url }}" title="{{ post.title }}" style="color: #4a9eff; text-decoration: none; font-weight: 500;">
                {{ post.title }}
              </a>
              {% if post.description %}
                <p style="margin: 0.5rem 0 0 0; color: #b0b0b0; font-size: 0.9rem;">{{ post.description }}</p>
              {% endif %}
            </li>
          {% endfor %}
        {% else %}
          <p style="color: #888888; font-style: italic;">Henüz proje yazısı bulunmuyor.</p>
        {% endif %}
      </ul>
    </div>

    <!-- Genel Yazılar Kategorisi -->
    <div style="margin-bottom: 3rem;">
      <h2 style="color: #4a9eff; border-bottom: 2px solid #4a9eff; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
        &#128196; Genel Yazılarım
      </h2>
      <ul class="listing" style="list-style-type: none; padding-left: 0;">
        {% assign general_posts = posts_lang | where_exp: "post", "post.categories contains 'genel' or post.categories contains 'general' or post.categories contains 'discussion' or post.categories contains 'rnn'" %}
        {% if general_posts.size > 0 %}
          {% for post in general_posts %}
            <li class="listing-item" style="margin: 0.5rem 0; padding: 0.5rem; background-color: #2a2a2a; border-radius: 4px; transition: background-color 0.3s ease;">
              <time datetime="{{ post.date | date: '%Y-%m-%d' }}" style="color: #b0b0b0; margin-right: 0.5rem; font-size: 0.9rem;">
                {{ post.date | date: "%d-%m-%Y" }}
              </time>
              <a href="{{ post.url | relative_url }}" title="{{ post.title }}" style="color: #4a9eff; text-decoration: none; font-weight: 500;">
                {{ post.title }}
              </a>
              {% if post.description %}
                <p style="margin: 0.5rem 0 0 0; color: #b0b0b0; font-size: 0.9rem;">{{ post.description }}</p>
              {% endif %}
            </li>
          {% endfor %}
        {% else %}
          <p style="color: #888888; font-style: italic;">Henüz genel yazı bulunmuyor.</p>
        {% endif %}
      </ul>
    </div>

  {% endif %}
</div>
