# SITE OWNER DOCUMENTATION

This document explains how to update and maintain your portfolio website. No advanced coding knowledge is required.

---

## 1. PERSONAL INFO — Where to change your name, bio, links

To customize the site for yourself, update these files:

- `_config.yml`: 
  - Change `title: "[Your Name]"` to your actual name.
  - Change `url: "https://yourusername.github.io"` to your domain or GitHub Pages URL.
- `_data/social.yml`:
  - Update the `url` fields for email, github, and linkedin.
- `_data/translations.yml`:
  - No personal info here by default, but if you add custom strings, update them here.
- `pages/home.en.md` and `pages/home.tr.md`:
  - Change `[Your Name]` in the `hero-name` section.
  - Update the `hero-desc` (short subtitle) and the paragraphs in the `home-about` section.
- `pages/resume.en.md` and `pages/resume.tr.md`:
  - Update the `<p class="resume-bio">` paragraph near the top of the file to reflect your actual summary.

---

## 2. HOW TO ADD A BLOG POST

Every blog post is contained in a **single Markdown file** that holds both English and Turkish content via its front matter.

**Step-by-step:**

1. Choose a short, lowercase slug with dashes (e.g., `my-new-post`).
2. Create the file at `_posts/blog/YYYY-MM-DD-my-new-post.md`.
3. Use this exact front matter:
```yaml
---
layout: blog
title_en: "Your Post Title in English"
title_tr: "Türkçe Başlığınız"
date: 2024-05-12
category: blog
slug: my-new-post
tags_en: [tag1, tag2]
tags_tr: [etiket1, etiket2]
keywords: [keyword1, keyword2]
text_en: |
  Your English content here.
  You can write multi-line Markdown freely.
text_tr: |
  Buraya Türkçe içeriğinizi yazın.
  Çok satırlı Markdown desteklenir.
---
```
4. Everything below the `---` (the main body) will be ignored, so keep all your content inside `text_en:` and `text_tr:`.

---

## 3. HOW TO ADD A DEVLOG

Devlogs are for technical writing. The process is exactly the same as adding a blog post, but with two differences:

- Files go in `_posts/devlogs/YYYY-MM-DD-slug.md`
- Use `category: devlog` in the front matter instead of `blog`.

---

## 4. HOW TO ADD A PROJECT

**Step-by-step:**

1. Create a new file in `_projects/` named `project-name.md`.
2. Copy this exact front matter template:
```yaml
---
layout: project
title_en: "Project Name"
title_tr: "Proje Adı"
date: 2024-03-01
year: 2024
type: [hardware, firmware]   # pick any of: hardware, firmware, software
status: completed             # or: ongoing, archived
thumbnail: /assets/images/projects/your-project-thumb.jpg
images:
  - /assets/images/projects/your-project-1.jpg
  - /assets/images/projects/your-project-2.jpg
description_en: "One line shown on project cards in English."
description_tr: "Türkçe tek satır açıklama."
tags: [STM32, PCB, FreeRTOS]
github: https://github.com/you/repo   # delete this line if no repo
---

Full project write-up goes here in English.
```
3. Add your images to `assets/images/projects/` and reference them in the front matter.
4. The project body is written entirely in English, as technical writeups are usually single-language.

---

## 5. HOW TO ADD PROJECT IMAGES

- Put all images in `assets/images/projects/`
- Recommended format: JPG or WebP
- Recommended size: 1200×800px maximum for gallery images, 600×400px for thumbnails
- Name files clearly: `projectname-thumb.jpg`, `projectname-1.jpg`
- Reference them in front matter with the full path starting from `/` (e.g. `/assets/images/projects/...`)

---

## 6. HOW TO UPDATE YOUR RESUME

- The resume has two files: `pages/resume.en.md` (English) and `pages/resume.tr.md` (Turkish).
- Update **both files** when you change your experience, education, or skills. They do not sync automatically.
- Skills tags and timeline entries (jobs, education) are written directly in the page body as HTML structure. Just copy/paste an existing entry block and edit the text.
- To update your downloadable CV: replace the files at `assets/cv-tr.pdf` and `assets/cv-en.pdf` with your new PDFs. Keep these filenames exactly as they are.

---

## 7. HOW TO CHANGE UI TEXT (Navigation, Buttons, Labels)

- All interface text (for both English and Turkish) lives in `_data/translations.yml`.
- Find the key you want to change (e.g., `nav_blog`).
- Edit both the `en:` and `tr:` values.
- Do **NOT** rename keys — only change the text inside the quotes.

---

## 8. HOW TO ADD A NEW LANGUAGE

Adding a third language is an advanced task:
1. Add a new block in `_data/translations.yml` (e.g., `de:`).
2. Add the language option to the toggle button in `_includes/nav.html` and/or `_includes/theme-toggle.html`.
3. Update `assets/js/lang.js` to recognize the new language code.
4. Update `_config.yml`'s `paired_pages` defaults.
5. Create `.de.md` page files.

  5. Create `.de.md` page files.

---

## 9. CUSTOM MARKDOWN CALLOUTS (Alert Boxes)

You can enrich your blog posts and devlogs by adding styled callout boxes. To do this, simply write your paragraph and append the required Kramdown class format `{: .alert .alert-type }` on the next line.

**Available Callouts:**

**Info Box (General notes, uses primary accent color):**
```markdown
This is an informational note.
{: .alert .alert-info }
```

**Warning Box (Important or critical notes, uses warm accent color):**
```markdown
Warning: Please read this before proceeding.
{: .alert .alert-warning }
```

**Tip / Fun Fact Box (Helpful advice or fun facts, uses green accent color):**
```markdown
Fun Fact: You can do this much faster.
{: .alert .alert-tip }
```

---

## 10. FOLDER REFERENCE — What goes where

| What you want to add | Where the file goes | File naming format |
|---|---|---|
| Blog post (Bilingual) | `_posts/blog/` | `YYYY-MM-DD-slug.md` |
| Devlog entry (Bilingual) | `_posts/devlogs/` | `YYYY-MM-DD-slug.md` |
| Project | `_projects/` | `project-name.md` |
| Home page content | `pages/` | `home.en.md` + `home.tr.md` |
| Resume content | `pages/` | `resume.en.md` + `resume.tr.md` |
| Projects page content | `pages/` | `projects.en.md` + `projects.tr.md` |
| Project images | `assets/images/projects/` | `projectname-1.jpg` |
| CV / Resume PDFs | `assets/` | `cv-tr.pdf`, `cv-en.pdf` |
| Personal info & links | `_data/social.yml` | — |
| UI text (EN + TR) | `_data/translations.yml` | — |
| Site title, URL | `_config.yml` | — |

---

## 11. LOCAL PREVIEW — How to run the site on your computer

```bash
# Install dependencies (only needed once)
bundle install

# Start local server
bundle exec jekyll serve

# Open in browser
http://localhost:4000
```
If `bundle install` fails, make sure Ruby is installed (`ruby -v`) and run `gem install bundler` first.

---

## 12. DEPLOYING TO GITHUB PAGES

1. Create a GitHub repository named `yourusername.github.io`.
2. Push this entire project folder to the `main` branch.
3. Go to repository Settings → Pages → set source to `GitHub Actions` or `Deploy from a branch` (select `main` branch, `/ (root)` folder).
4. GitHub will build and publish automatically.
5. Your site will be live at `https://yourusername.github.io`.

---

## 13. TROUBLESHOOTING

- **Site not building**: Check `_config.yml` or front matter for syntax errors (YAML is space-sensitive).
- **Post not appearing**: Verify the filename date format is exactly `YYYY-MM-DD-title.md` and the `date:` in front matter is not in the future.
- **Images not showing**: Check the path starts with `/` and the file is in `assets/images/projects/`.
- **Theme not switching**: Clear your browser cache and localStorage (`DevTools → Application → Local Storage → Clear`).
- **Search not finding posts**: Make sure `keywords:` and `tags:` are filled in the post front matter.
