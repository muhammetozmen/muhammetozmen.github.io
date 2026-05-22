// search.js — Client-side search with debounce and real-time filtering

(function () {
  'use strict';

  let searchData = null;
  let debounceTimer = null;

  function getActiveLang() {
    return localStorage.getItem('lang') || 'tr';
  }

  function getActiveTab() {
    const activeTab = document.querySelector('.blog-tab.active');
    return activeTab ? activeTab.getAttribute('data-tab') : 'blog';
  }

  async function loadSearchData() {
    if (searchData) return searchData;
    try {
      const baseUrl = document.querySelector('meta[name="baseurl"]')?.content || '';
      const res = await fetch(baseUrl + '/search.json');
      if (!res.ok) throw new Error('search.json not found');
      searchData = await res.json();
      return searchData;
    } catch (e) {
      console.warn('Search data could not be loaded:', e);
      searchData = [];
      return searchData;
    }
  }

  function matchPost(post, query) {
    const q = query.toLowerCase();
    
    const haystack = [
      post.title_en || '',
      post.title_tr || '',
      post.excerpt_en || '',
      post.excerpt_tr || '',
      (post.tags_en || []).join(' '),
      (post.tags_tr || []).join(' '),
      (post.keywords || []).join(' ')
    ].join(' ').toLowerCase();
    return haystack.includes(q);
  }

  // Strip common markdown syntax from text for clean display
  function stripMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/!\[.*?\]\(.*?\)/g, '')          // remove images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // unwrap links
      .replace(/\*\*([^*]+)\*\*/g, '$1')        // bold
      .replace(/\*([^*]+)\*/g, '$1')            // italic
      .replace(/`{1,3}[^`]+`{1,3}/g, '')        // inline code/fenced code
      .replace(/#{1,6}\s+/g, '')                // headings
      .replace(/\{:[^}]+\}/g, '')               // kramdown IAL attributes
      .replace(/^>\s*/gm, '')                   // blockquote at line start
      .replace(/\s>\s/g, ' ')                   // blockquote inline (after strip_html flattening)
      .replace(/\s{2,}/g, ' ')                  // collapse multiple spaces
      .replace(/\n+/g, ' ')                     // newlines to spaces
      .trim();
  }

  function renderResults(results, container, query) {
    const lang = getActiveLang();

    // No tab filter, search across both tabs
    const filtered = results;

    const countEl = document.getElementById('search-count');
    const noResultEl = document.getElementById('search-no-results');
    const listEl = container;

    if (filtered.length === 0) {
      if (countEl) { countEl.textContent = ''; countEl.classList.remove('visible'); }
      if (noResultEl) noResultEl.classList.add('visible');
      listEl.innerHTML = '';
      return;
    }

    if (noResultEl) noResultEl.classList.remove('visible');
    if (countEl) {
      const langMap = { en: `${filtered.length} results for "${query}"`, tr: `"${query}" için ${filtered.length} sonuç` };
      countEl.textContent = langMap[lang] || `${filtered.length} results`;
      countEl.classList.add('visible');
    }

    listEl.innerHTML = filtered.map(post => {
      const tagsList = post[`tags_${lang}`] || [];
      const tags = tagsList.map(t => `<span class="tag">${t}</span>`).join('');
      const date = post.date || '';
      const cat = post.category || 'blog';
      const title = post[`title_${lang}`] || post.title || '';
      const rawExcerpt = post[`excerpt_${lang}`] || post.excerpt || '';
      const excerpt = stripMarkdown(rawExcerpt);
      const readMore = lang === 'en' ? 'read more' : 'devamını oku';
      
      return `
        <a href="${post.url}" class="post-card">
          <div class="post-card-content">
            <div class="post-card-header">
              <span class="post-card-title">${title}</span>
              <span class="post-card-date">${date}</span>
            </div>
            <div class="post-card-excerpt">
              <p class="post-card-excerpt-text">${excerpt}</p>
            </div>
            <div class="post-card-footer">
              <div class="post-card-tags">${tags}</div>
              <span class="post-card-readmore">${readMore}</span>
            </div>
          </div>
        </a>`;}).join('');
  }

  async function doSearch(query, container) {
    const data = await loadSearchData();
    const results = query
      ? data.filter(p => matchPost(p, query))
      : data;
    renderResults(results, container, query);
  }

  function initSearch() {
    const inputEl = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    const resultsContainer = document.getElementById('search-results');

    if (!inputEl || !resultsContainer) return;

    inputEl.addEventListener('input', function () {
      const q = this.value.trim();
      if (clearBtn) clearBtn.classList.toggle('visible', q.length > 0);

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (q.length === 0) {
          // Reset to default post list
          document.querySelectorAll('.post-list').forEach(el => el.style.display = '');
          const tabs = document.querySelector('.blog-tabs');
          if (tabs) tabs.style.display = '';
          resultsContainer.style.display = 'none';
          resultsContainer.classList.remove('fade-in');
          const countEl = document.getElementById('search-count');
          const noResultEl = document.getElementById('search-no-results');
          if (countEl) { countEl.textContent = ''; countEl.classList.remove('visible'); }
          if (noResultEl) noResultEl.classList.remove('visible');
        } else {
          document.querySelectorAll('.post-list').forEach(el => el.style.display = 'none');
          const tabs = document.querySelector('.blog-tabs');
          if (tabs) tabs.style.display = 'none';
          resultsContainer.style.display = 'block';
          resultsContainer.classList.add('fade-in');
          doSearch(q, resultsContainer);
        }
      }, 200);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        inputEl.value = '';
        inputEl.dispatchEvent(new Event('input'));
        clearBtn.classList.remove('visible');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initSearch);
  window.SearchInit = initSearch;
})();
