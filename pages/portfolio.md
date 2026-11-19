---
layout: page
title: Portfolyom
title_en: Portfolio
hide_title: true
description: "Çalışma deneyimim, yarışmalar, topluluk görevleri ve belgelerim."
description_en: "My work experience, competitions, community roles and documents."
permalink: /portfolio/
---
{%- assign groups = site.portfolio | sort: "order" %}
<p class="jump">
{%- for g in groups %}<a href="#{{ g.slug }}"><span lang="tr">{{ g.title }}</span><span lang="en">{{ g.title_en }}</span></a> · {% endfor -%}
<a href="#documents"><span lang="tr">Belgeler</span><span lang="en">Documents</span></a>
</p>

{% for g in groups %}
<details class="group" id="{{ g.slug }}" open>
<summary><h3 class="group"><span lang="tr">{{ g.title }}</span><span lang="en">{{ g.title_en }}</span></h3></summary>
<div class="groupbody">
{{ g.content }}
</div>
</details>
{% endfor %}
<details class="group" id="documents" open>
<summary><h3 class="group"><span lang="tr">Belgeler</span><span lang="en">Documents</span></h3></summary>
<div class="groupbody">
{% include documents.md %}
<p><a href="{{ '/documents/' | relative_url }}"><span lang="tr">Belgeler sayfasını aç</span><span lang="en">Open the documents page</span></a></p>
</div>
</details>
