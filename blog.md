---
layout: page
title: Yazılarım
permalink: /blog/
---

<div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #333; padding: 1rem 0;">

    {% if site.posts == empty %}
        <div style="background-color: #f9f9f9; border-left: 5px solid #007acc; padding: 1rem 1.5rem; border-radius: 6px;">
            <p style="margin: 0; font-size: 1.1rem;">
                Henüz hiçbir yazım yok. <em>Söz, sadece şimdilik :)</em>
            </p>
        </div>
    {% else %}
        <ul class="listing" style="list-style-type: none; padding-left: 0;">
            {% assign year = "" %}
            {% for post in site.posts %}
                {% capture y %}{{ post.date | date:"%Y" }}{% endcapture %}
                {% if year != y %}
                    {% assign year = y %}
                    <li class="listing-seperator" style="margin-top: 2rem; font-weight: bold; font-size: 1.2rem; border-bottom: 2px solid #007acc;">{{ y }}</li>
                {% endif %}
                <li class="listing-item" style="margin: 0.5rem 0;">
                    <time datetime="{{ post.date | date:"%Y-%m-%d" }}" style="color: #777; margin-right: 0.5rem;">
                        {{ post.date | date:"%d-%m-%Y" }}
                    </time>
                    <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}" style="color: #007acc; text-decoration: none;">
                        {{ post.title }}
                    </a>
                </li>
            {% endfor %}
        </ul>
    {% endif %}

</div>
