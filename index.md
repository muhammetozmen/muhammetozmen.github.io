---
layout: page
title: "Gömülü Sistemler ve Yapay Zekâ Mühendisi"
title_en: "Embedded Systems & AI Engineer"
hide_title: true
---
<div lang="tr" markdown="1">

Merhaba, ben **Muhammet**. Gömülü sistemler ve yapay zekâ odaklı çalışan bir bilgisayar mühendisiyim. Burası, hakkımda birçok şeyi öğrenebileceğiniz kişisel sitem.

Teknik yazılarımı [Yazılarım]({{ '/writing/' | relative_url }}), yaptığım işleri [Projelerim]({{ '/projects/' | relative_url }}) ve [Portfolyom]({{ '/portfolio/' | relative_url }}) bölümlerinde bulabilirsiniz. Özgeçmişim, yeteneklerim ve CV dosyalarım [Hakkımda]({{ '/about/' | relative_url }}) sayfasında.

</div>
<div lang="en" markdown="1">

Hi, I'm **Muhammet**. I'm a computer engineer focused on embedded systems and AI. This is my personal website, where you can learn a lot about me.

You can find my technical writing under [Writing]({{ '/writing/' | relative_url }}), and my work under [Projects]({{ '/projects/' | relative_url }}) and [Portfolio]({{ '/portfolio/' | relative_url }}). My resume, skills and CV files are on the [About]({{ '/about/' | relative_url }}) page.

</div>

{% if site.data.profile.open_to_work %}{% assign mail = site.data.links | where_exp: "l", "l.url contains 'mailto:'" | first %}
<div class="opennow">
<strong>{% include t.html key="open_title" %}</strong>
<a href="{{ mail.url }}">{% include t.html key="open_cta" %}</a>
</div>
{% endif %}
<p class="actions">
<a href="{{ '/assets/documents/cv-tr.pdf' | relative_url }}"><span lang="tr">CV (Türkçe)</span><span lang="en">CV (Turkish)</span></a>
<a href="{{ '/assets/documents/cv-en.pdf' | relative_url }}"><span lang="tr">CV (İngilizce)</span><span lang="en">CV (English)</span></a>
{%- for l in site.data.links %}{% if l.home %}
<a href="{{ l.url }}" rel="noopener">{{ l.name }}</a>{% endif %}{% endfor %}
</p>

{% assign featured = site.projects | where: "featured", true | sort: "date" | reverse %}
{% if featured.size > 0 %}<h3>{% include t.html key="featured" %}</h3>
{% include entry-list.html items=featured %}{% endif %}

<h3>{% include t.html key="recent_posts" %}</h3>
{% assign latest = site.posts | slice: 0, 5 %}
{% include entry-list.html items=latest date=true %}
