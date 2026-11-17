---
layout: page
title: Ana Sayfa
title_en: Home
hide_title: true
---
<div lang="tr" markdown="1">

Merhaba, ben **Muhammet**. Gömülü sistemler üzerine çalışan bir bilgisayar mühendisiyim. Burası, hakkımda birçok şeyi öğrenebileceğiniz kişisel sitem.

Teknik yazılarımı [Yazılarım]({{ '/yazilarim/' | relative_url }}), yaptığım işleri [Projelerim]({{ '/projelerim/' | relative_url }}) ve [Portfolyom]({{ '/portfolyom/' | relative_url }}) bölümlerinde bulabilirsiniz. Özgeçmişim, yeteneklerim ve CV dosyalarım [Hakkımda]({{ '/hakkimda/' | relative_url }}) sayfasında.

</div>
<div lang="en" markdown="1">

Hi, I'm **Muhammet**. I'm a computer engineer working on embedded systems. This is my personal website, where you can learn a lot about me.

You can find my technical writing under [Writing]({{ '/yazilarim/' | relative_url }}), and my work under [Projects]({{ '/projelerim/' | relative_url }}) and [Portfolio]({{ '/portfolyom/' | relative_url }}). My resume, skills and CV files are on the [About]({{ '/hakkimda/' | relative_url }}) page.

</div>

<h3>{% include t.html key="recent_posts" %}</h3>
{% assign latest = site.posts | slice: 0, 5 %}
{% include entry-list.html items=latest date=true %}
