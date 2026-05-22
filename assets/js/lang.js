// lang.js — Language toggle with localStorage + paired page navigation

(function () {
  'use strict';

  const LANG_KEY = 'lang';

  // --- On every page load: enforce language consistency ---
  const savedLang = localStorage.getItem(LANG_KEY) || 'tr';
  const currentLang = window.CURRENT_PAGE_LANG;
  const pageId = window.CURRENT_PAGE_ID;

  if (
    currentLang &&
    pageId &&
    window.PAGE_MAP &&
    window.PAGE_MAP[pageId] &&
    savedLang !== currentLang
  ) {
    const targetUrl = window.PAGE_MAP[pageId][savedLang];
    if (targetUrl) {
      window.location.replace(targetUrl);
    }
  }

  document.documentElement.setAttribute('data-lang-pref', savedLang);




  // --- Apply UI language strings ---
  function applyLang(lang) {
    document.querySelectorAll('[data-lang-en]').forEach(el => {
      const enText = el.getAttribute('data-lang-en');
      const trText = el.getAttribute('data-lang-tr');
      if (lang === 'tr' && trText) {
        el.textContent = trText;
      } else if (enText) {
        el.textContent = enText;
      }
    });

    // Update global lang attribute for CSS knob position
    document.documentElement.setAttribute('data-lang-pref', lang);

    // Update lang filter on blog listings
    filterPostsByLang(lang);

    // Swap nav CV link based on selected language
    document.querySelectorAll('.nav-dropdown a[href*="/assets/documents/cv-"], .nav-mobile a[href*="/assets/documents/cv-"]').forEach(link => {
      const href = link.getAttribute('href');
      if (lang === 'tr') {
        link.setAttribute('href', href.replace('cv-en.pdf', 'cv-tr.pdf'));
      } else {
        link.setAttribute('href', href.replace('cv-tr.pdf', 'cv-en.pdf'));
      }
      link.setAttribute('target', '_blank');
    });
  }

  function filterPostsByLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
      const postLang = el.getAttribute('data-lang');
      if (postLang && postLang !== lang) {
        el.classList.add('lang-hidden');
      } else {
        el.classList.remove('lang-hidden');
      }
    });
  }

  function toggleLang() {
    const current = localStorage.getItem(LANG_KEY) || 'tr';
    const next = current === 'en' ? 'tr' : 'en';
    localStorage.setItem(LANG_KEY, next);

    // Navigate to paired page URL
    const pId = window.CURRENT_PAGE_ID;
    const map = window.PAGE_MAP;
    if (pId && map && map[pId] && map[pId][next]) {
      window.location.href = map[pId][next];
    } else {
      // No paired page: just update UI strings in-place
      applyLang(next);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lang = localStorage.getItem(LANG_KEY) || 'tr';
    applyLang(lang);

    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.addEventListener('click', toggleLang);
    });
  });

  // Expose for SPA re-init
  window.LangInit = function () {
    const lang = localStorage.getItem(LANG_KEY) || 'tr';
    applyLang(lang);

    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.addEventListener('click', toggleLang);
    });
  };
})();
