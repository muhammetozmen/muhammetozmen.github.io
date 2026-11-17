---
layout: page
title: Portfolyom
title_en: Portfolio
hide_title: true
description: "Çalışma deneyimim, yarışmalar, topluluk görevleri ve belgelerim."
description_en: "My work experience, competitions, community roles and documents."
permalink: /portfolyom/
---
{%- assign groups = site.portfolio | sort: "order" %}
<p class="jump">
{%- for g in groups %}<a href="#{{ g.slug }}"><span lang="tr">{{ g.title }}</span><span lang="en">{{ g.title_en }}</span></a>{% unless forloop.last %} · {% endunless %}{% endfor -%}
</p>

{% for g in groups %}
<h3 class="group" id="{{ g.slug }}"><span lang="tr">{{ g.title }}</span><span lang="en">{{ g.title_en }}</span></h3>
<div class="groupbody">
{{ g.content }}
</div>
{% endfor %}
