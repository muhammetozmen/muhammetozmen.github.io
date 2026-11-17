---
layout: page
title: Projelerim
title_en: Projects
hide_title: true
description: "Yaptığım yazılım ve donanım projeleri."
description_en: "Software and hardware projects I have built."
permalink: /projelerim/
---
<div lang="tr" markdown="1">

Yaptığım yazılım ve donanım projeleri.

</div>
<div lang="en" markdown="1">

Software and hardware projects I have built.

</div>

{% assign projects_sorted = site.projects | sort: "date" | reverse %}
{% include entry-list.html items=projects_sorted %}
