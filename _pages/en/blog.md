---
layout: page
title: My Posts
permalink: /en/blog/
lang: en
---

<div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #e0e0e0; padding: 1rem 0;">

  {% assign posts_lang = site.posts | where: "lang", page.lang %}
  {% if posts_lang == empty %}
    <div style="background-color: #2a2a2a; border-left: 5px solid #4a9eff; padding: 1rem 1.5rem; border-radius: 6px; color: #e0e0e0;">
      <p style="margin: 0; font-size: 1.1rem;">
        No posts yet. <em>Promise, just for now :)</em>
      </p>
    </div>
  {% else %}

    <!-- Project Posts -->
    <div style="margin-bottom: 3rem;">
      <h2 style="color: #4a9eff; border-bottom: 2px solid #4a9eff; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
        &#128187; Project Posts
      </h2>
      <ul class="listing" style="list-style-type: none; padding-left: 0;">
        {% assign has_project = false %}
        {% for post in posts_lang %}
          {% if post.categories contains 'project' or post.categories contains 'proje' %}
            {% assign has_project = true %}
            <li class="listing-item" style="margin: 0.5rem 0; padding: 0.5rem; background-color: #2a2a2a; border-radius: 4px; transition: background-color 0.3s ease;">
              <time datetime="{{ post.date | date: '%Y-%m-%d' }}" style="color: #b0b0b0; margin-right: 0.5rem; font-size: 0.9rem;">
                {{ post.date | date: "%B %-d, %Y" }}
              </time>
              <a href="{{ post.url | relative_url }}" title="{{ post.title }}" style="color: #4a9eff; text-decoration: none; font-weight: 500;">
                {{ post.title }}
              </a>
              {% if post.description %}
                <p style="margin: 0.5rem 0 0 0; color: #b0b0b0; font-size: 0.9rem;">{{ post.description }}</p>
              {% endif %}
            </li>
          {% endif %}
        {% endfor %}
        {% unless has_project %}
          <p style="color: #888888; font-style: italic;">No project posts yet.</p>
        {% endunless %}
      </ul>
    </div>

    <!-- General Posts -->
    <div style="margin-bottom: 3rem;">
      <h2 style="color: #4a9eff; border-bottom: 2px solid #4a9eff; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
        &#128196; General Posts
      </h2>
      <ul class="listing" style="list-style-type: none; padding-left: 0;">
        {% assign has_general = false %}
        {% for post in posts_lang %}
          {% if post.categories contains 'general' or post.categories contains 'genel' or post.categories contains 'discussion' or post.categories contains 'rnn' %}
            {% assign has_general = true %}
            <li class="listing-item" style="margin: 0.5rem 0; padding: 0.5rem; background-color: #2a2a2a; border-radius: 4px; transition: background-color 0.3s ease;">
              <time datetime="{{ post.date | date: '%Y-%m-%d' }}" style="color: #b0b0b0; margin-right: 0.5rem; font-size: 0.9rem;">
                {{ post.date | date: "%B %-d, %Y" }}
              </time>
              <a href="{{ post.url | relative_url }}" title="{{ post.title }}" style="color: #4a9eff; text-decoration: none; font-weight: 500;">
                {{ post.title }}
              </a>
              {% if post.description %}
                <p style="margin: 0.5rem 0 0 0; color: #b0b0b0; font-size: 0.9rem;">{{ post.description }}</p>
              {% endif %}
            </li>
          {% endif %}
        {% endfor %}
        {% unless has_general %}
          <p style="color: #888888; font-style: italic;">No general posts yet.</p>
        {% endunless %}
      </ul>
    </div>

  {% endif %}
</div>
